/**
 * Deterministic SEO scoring helpers.
 */

function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function scoreOnPage(page) {
  if (!page) return { score: 0, issues: [], warnings: [], passed: [] };
  const issues = [];
  const warnings = [];
  const passed = [];
  let score = 100;

  if (!page.title) {
    issues.push('Missing title tag');
    score -= 15;
  } else {
    passed.push('Title tag present');
    if (page.titleLength < 30 || page.titleLength > 60) {
      warnings.push(`Title length ${page.titleLength} chars (ideal ~30–60)`);
      score -= 5;
    } else passed.push('Title length looks reasonable');
  }

  if (!page.description) {
    issues.push('Missing meta description');
    score -= 12;
  } else {
    passed.push('Meta description present');
    if (page.descriptionLength < 70 || page.descriptionLength > 160) {
      warnings.push(`Meta description length ${page.descriptionLength} (ideal ~70–160)`);
      score -= 4;
    }
  }

  if (page.h1Count === 0) {
    issues.push('No H1 heading found');
    score -= 10;
  } else if (page.h1Count > 1) {
    warnings.push(`Multiple H1 tags (${page.h1Count})`);
    score -= 5;
  } else passed.push('Single H1 present');

  if (page.wordCount < 200) {
    warnings.push(`Thin content (~${page.wordCount} words)`);
    score -= 8;
  } else passed.push(`Content word count: ${page.wordCount}`);

  const missingAlt = (page.images || []).filter((i) => i.missingAlt).length;
  if (missingAlt > 0) {
    warnings.push(`${missingAlt} image(s) missing alt text`);
    score -= Math.min(10, missingAlt * 2);
  } else if ((page.images || []).length) passed.push('Images include alt attributes');

  if (!page.canonical) {
    warnings.push('Canonical URL not declared');
    score -= 4;
  } else passed.push('Canonical tag present');

  if (!page.viewport) {
    warnings.push('Viewport meta missing (mobile usability risk)');
    score -= 5;
  } else passed.push('Viewport meta present');

  return { score: clamp(score), issues, warnings, passed };
}

export function scoreIndexability({ page, fetchMeta }) {
  const issues = [];
  const warnings = [];
  const passed = [];
  let score = 100;

  if (!fetchMeta?.ok) {
    issues.push(`HTTP status ${fetchMeta?.status || 'unknown'} — page may not be indexable`);
    score -= 40;
  } else passed.push(`HTTP ${fetchMeta.status}`);

  const robots = `${page?.robots || ''} ${fetchMeta?.robotsHeader || ''}`.toLowerCase();
  if (robots.includes('noindex')) {
    issues.push('noindex directive detected');
    score -= 35;
  } else passed.push('No noindex detected in meta/header sample');

  if (robots.includes('nofollow')) {
    warnings.push('nofollow directive detected');
    score -= 5;
  }

  if (page?.canonical && fetchMeta?.finalUrl) {
    try {
      const c = new URL(page.canonical, fetchMeta.finalUrl).toString();
      const f = new URL(fetchMeta.finalUrl).toString();
      if (c.split('?')[0] !== f.split('?')[0]) {
        warnings.push('Canonical points to a different URL than the final response URL');
        score -= 8;
      } else passed.push('Canonical aligns with final URL');
    } catch {
      warnings.push('Canonical URL could not be parsed');
      score -= 5;
    }
  }

  return { score: clamp(score), issues, warnings, passed, indexable: !issues.some((i) => /noindex|HTTP status/i.test(i)) };
}

export function buildWebsiteAuditScore(pages) {
  const critical = [];
  const warnings = [];
  const passed = [];
  let tech = 0;
  let onpage = 0;
  let content = 0;
  let indexability = 0;
  let linking = 0;
  let n = 0;

  const titles = {};
  const descriptions = {};

  for (const p of pages) {
    if (!p.parsed) {
      if (p.status >= 400 || p.status === 0) critical.push(`${p.url} → status ${p.status || 'error'}`);
      continue;
    }
    n += 1;
    const op = scoreOnPage(p.parsed);
    const ix = scoreIndexability({
      page: p.parsed,
      fetchMeta: { ok: p.ok, status: p.status, finalUrl: p.finalUrl, robotsHeader: p.robotsHeader },
    });
    onpage += op.score;
    indexability += ix.score;
    content += clamp(p.parsed.wordCount >= 600 ? 85 : p.parsed.wordCount >= 300 ? 70 : 45);
    tech += p.ok ? 80 : 30;

    const internal = (p.parsed.links || []).length;
    linking += clamp(internal >= 3 && internal <= 150 ? 80 : 55);

    op.issues.forEach((i) => critical.push(`${p.url}: ${i}`));
    op.warnings.forEach((w) => warnings.push(`${p.url}: ${w}`));
    ix.issues.forEach((i) => critical.push(`${p.url}: ${i}`));
    ix.warnings.forEach((w) => warnings.push(`${p.url}: ${w}`));
    op.passed.slice(0, 2).forEach((x) => passed.push(`${p.url}: ${x}`));

    if (p.parsed.title) titles[p.parsed.title] = (titles[p.parsed.title] || []).concat(p.url);
    if (p.parsed.description) {
      descriptions[p.parsed.description] = (descriptions[p.parsed.description] || []).concat(p.url);
    }
  }

  Object.entries(titles).forEach(([t, urls]) => {
    if (urls.length > 1) warnings.push(`Duplicate title "${t.slice(0, 60)}" on ${urls.length} pages`);
  });
  Object.entries(descriptions).forEach(([d, urls]) => {
    if (urls.length > 1) warnings.push(`Duplicate meta description on ${urls.length} pages`);
  });

  const denom = Math.max(n, 1);
  const categories = {
    technical: clamp(tech / denom),
    onPage: clamp(onpage / denom),
    content: clamp(content / denom),
    indexability: clamp(indexability / denom),
    internalLinking: clamp(linking / denom),
    performance: null, // filled when PSI available
  };

  const overall = clamp(
    categories.technical * 0.2 +
      categories.onPage * 0.25 +
      categories.content * 0.2 +
      categories.indexability * 0.2 +
      categories.internalLinking * 0.15
  );

  return {
    overall,
    categories,
    critical: [...new Set(critical)].slice(0, 40),
    warnings: [...new Set(warnings)].slice(0, 40),
    passed: [...new Set(passed)].slice(0, 30),
    pagesScored: n,
  };
}
