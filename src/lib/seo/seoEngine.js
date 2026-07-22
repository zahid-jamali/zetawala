import { crawlSite, fetchPageAnalysis } from './seoCrawl';
import { runPageSpeed } from './pagespeedClient';
import { buildWebsiteAuditScore, scoreOnPage, scoreIndexability } from './seoScoring';
import { interpretSeoInsights } from './seoAiInterpret';
import {
  calcSeoRoi,
  calcKeywordRoi,
  calcContentRoi,
  estimateTrafficAdRevenue,
} from './seoCalculators';
import { safeFetch, normalizeUrlInput, resolveHref, sameOrigin } from './seoFetch';
import {
  parseSitemapXml,
  parseRobotsTxt,
  isPathAllowed,
  keywordDensity,
  parseHtmlPage,
} from './seoParse';
import { seoCacheGet, seoCacheSet, seoCacheKey } from './seoCache';

const MAX_SITEMAP_SAMPLE = 25;
const MAX_LINK_CHECKS = 40;

export async function runSeoTool(action, payload = {}) {
  switch (action) {
    case 'website-checker':
      return websiteChecker(payload);
    case 'content-audit':
      return contentAudit(payload);
    case 'title-meta-analyzer':
      return titleMetaAnalyzer(payload);
    case 'pagespeed-analyzer':
      return pagespeedAnalyzer(payload);
    case 'internal-link-analyzer':
      return internalLinkAnalyzer(payload);
    case 'broken-link-checker':
      return brokenLinkChecker(payload);
    case 'sitemap-tool':
      return sitemapTool(payload);
    case 'canonical-indexability':
      return canonicalIndexability(payload);
    case 'action-plan':
      return actionPlan(payload);
    case 'robots-txt-tool':
      return robotsTxtTool(payload);
    case 'header-meta-inspector':
      return headerMetaInspector(payload);
    case 'traffic-revenue':
      return trafficRevenue(payload);
    case 'health-score':
      return healthScore(payload);
    case 'keyword-density':
      return keywordDensityTool(payload);
    case 'seo-roi':
      return { success: true, data: calcSeoRoi(payload) };
    case 'keyword-roi':
      return { success: true, data: calcKeywordRoi(payload) };
    case 'content-roi':
      return { success: true, data: calcContentRoi(payload) };
    default:
      throw new Error(`Unknown SEO action: ${action}`);
  }
}

async function websiteChecker({ url }) {
  const crawl = await crawlSite(url, { maxPages: 12, maxDepth: 2 });
  const audit = buildWebsiteAuditScore(crawl.pages);
  const ai = await interpretSeoInsights({
    task: 'website-checker',
    metricsPayload: { audit, pagesAnalyzed: crawl.pagesAnalyzed, origin: crawl.origin },
    instruction:
      'Return JSON { "summary": "...", "recommendations": ["..."], "priorityFixes": ["..."] }. Use only provided issues/warnings.',
  });
  return {
    success: true,
    data: {
      crawl: { startUrl: crawl.startUrl, pagesAnalyzed: crawl.pagesAnalyzed, fromCache: crawl.fromCache },
      audit,
      samplePages: crawl.pages.slice(0, 8).map(slimPage),
      ai: ai.ok ? ai.data : null,
      aiError: ai.ok ? null : ai.error,
    },
  };
}

async function contentAudit({ url }) {
  const analysis = await fetchPageAnalysis(url);
  const onPage = scoreOnPage(analysis.page);
  const internal = [];
  const external = [];
  for (const l of analysis.page.links || []) {
    const abs = resolveHref(analysis.fetch.finalUrl, l.href);
    if (!abs) continue;
    (sameOrigin(analysis.fetch.finalUrl, abs) ? internal : external).push({ ...l, url: abs });
  }
  const ai = await interpretSeoInsights({
    task: 'content-audit',
    metricsPayload: {
      onPage,
      wordCount: analysis.page.wordCount,
      h1: analysis.page.headings.h1,
      h2Count: analysis.page.headings.h2.length,
      imagesMissingAlt: analysis.page.images.filter((i) => i.missingAlt).length,
      internalLinks: internal.length,
      externalLinks: external.length,
    },
    instruction: 'Return JSON { "contentQuality": "...", "seoNotes": ["..."], "improvements": ["..."] }',
  });
  return {
    success: true,
    data: {
      fetch: analysis.fetch,
      page: {
        title: analysis.page.title,
        description: analysis.page.description,
        wordCount: analysis.page.wordCount,
        headings: analysis.page.headings,
        imageCount: analysis.page.images.length,
        missingAlt: analysis.page.images.filter((i) => i.missingAlt).length,
      },
      onPage,
      links: { internal: internal.length, external: external.length },
      ai: ai.ok ? ai.data : null,
      aiError: ai.ok ? null : ai.error,
    },
  };
}

async function titleMetaAnalyzer({ url }) {
  const start = normalizeUrlInput(url);
  let urls = [];
  try {
    const sm = await safeFetch(new URL('/sitemap.xml', start.origin).toString());
    if (sm.ok) urls = parseSitemapXml(sm.body).slice(0, MAX_SITEMAP_SAMPLE);
  } catch {
    // fallback crawl
  }
  if (!urls.length) {
    const crawl = await crawlSite(url, { maxPages: 15, maxDepth: 2 });
    urls = crawl.pages.map((p) => p.finalUrl || p.url).filter(Boolean);
  }

  const rows = [];
  for (const u of urls.slice(0, MAX_SITEMAP_SAMPLE)) {
    try {
      const a = await fetchPageAnalysis(u);
      rows.push({
        url: u,
        status: a.fetch.status,
        title: a.page.title,
        titleLength: a.page.titleLength,
        description: a.page.description,
        descriptionLength: a.page.descriptionLength,
        issues: [
          !a.page.title ? 'Missing title' : null,
          a.page.titleLength > 60 ? 'Title too long' : null,
          a.page.titleLength && a.page.titleLength < 30 ? 'Title too short' : null,
          !a.page.description ? 'Missing description' : null,
          a.page.descriptionLength > 160 ? 'Description too long' : null,
          a.page.descriptionLength && a.page.descriptionLength < 70 ? 'Description too short' : null,
        ].filter(Boolean),
      });
    } catch (err) {
      rows.push({ url: u, status: 0, error: err.message, issues: ['Fetch failed'] });
    }
  }

  const titleMap = {};
  const descMap = {};
  rows.forEach((r) => {
    if (r.title) titleMap[r.title] = (titleMap[r.title] || 0) + 1;
    if (r.description) descMap[r.description] = (descMap[r.description] || 0) + 1;
  });
  const duplicates = {
    titles: Object.entries(titleMap).filter(([, c]) => c > 1).map(([t, c]) => ({ value: t, count: c })),
    descriptions: Object.entries(descMap).filter(([, c]) => c > 1).map(([t, c]) => ({ value: t, count: c })),
  };

  return { success: true, data: { pagesChecked: rows.length, rows, duplicates } };
}

async function pagespeedAnalyzer({ url, strategy = 'mobile' }) {
  const data = await runPageSpeed(normalizeUrlInput(url).toString(), strategy);
  const ai = await interpretSeoInsights({
    task: 'pagespeed',
    metricsPayload: { scores: data.scores, vitals: data.vitals, opportunities: data.opportunities },
    instruction: 'Return JSON { "summary": "...", "fixFirst": ["..."], "beginnerTips": ["..."] }',
  });
  return {
    success: true,
    data: { ...data, ai: ai.ok ? ai.data : null, aiError: ai.ok ? null : ai.error },
  };
}

async function internalLinkAnalyzer({ url }) {
  const crawl = await crawlSite(url, { maxPages: 15, maxDepth: 2 });
  const inbound = {};
  const outbound = {};
  const weakAnchors = [];

  crawl.pages.forEach((p) => {
    outbound[p.url] = 0;
    inbound[p.url] = inbound[p.url] || 0;
  });

  for (const p of crawl.pages) {
    if (!p.parsed) continue;
    for (const l of p.parsed.links) {
      const abs = resolveHref(p.finalUrl || p.url, l.href);
      if (!abs || !sameOrigin(crawl.origin, abs)) continue;
      const clean = abs.split('#')[0];
      outbound[p.url] = (outbound[p.url] || 0) + 1;
      if (inbound[clean] != null) inbound[clean] += 1;
      else inbound[clean] = 1;
      if (!l.anchor || l.anchor.length < 2 || /click here|here|read more|learn more/i.test(l.anchor)) {
        weakAnchors.push({ from: p.url, to: clean, anchor: l.anchor || '(empty)' });
      }
    }
  }

  const orphanCandidates = Object.entries(inbound)
    .filter(([u, c]) => c === 0 && u !== crawl.startUrl)
    .map(([u]) => u)
    .slice(0, 20);
  const weaklyLinked = Object.entries(inbound)
    .filter(([, c]) => c > 0 && c <= 1)
    .map(([u, c]) => ({ url: u, inbound: c }))
    .slice(0, 20);
  const hubPages = Object.entries(outbound)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([u, c]) => ({ url: u, outbound: c }));

  const ai = await interpretSeoInsights({
    task: 'internal-links',
    metricsPayload: {
      pagesAnalyzed: crawl.pagesAnalyzed,
      orphanCandidates: orphanCandidates.slice(0, 10),
      weaklyLinked: weaklyLinked.slice(0, 10),
      weakAnchors: weakAnchors.slice(0, 10),
    },
    instruction: 'Return JSON { "summary": "...", "suggestions": ["..."] }',
  });

  return {
    success: true,
    data: {
      pagesAnalyzed: crawl.pagesAnalyzed,
      orphanCandidates,
      weaklyLinked,
      hubPages,
      weakAnchors: weakAnchors.slice(0, 25),
      ai: ai.ok ? ai.data : null,
      aiError: ai.ok ? null : ai.error,
      note: 'Orphan detection is limited to the crawled sample — not a full-site guarantee.',
    },
  };
}

async function brokenLinkChecker({ url }) {
  const crawl = await crawlSite(url, { maxPages: 10, maxDepth: 1 });
  const candidates = [];
  for (const p of crawl.pages) {
    if (!p.parsed) continue;
    for (const l of p.parsed.links) {
      const abs = resolveHref(p.finalUrl || p.url, l.href);
      if (!abs) continue;
      candidates.push({ source: p.url, url: abs, anchor: l.anchor, internal: sameOrigin(crawl.origin, abs) });
      if (candidates.length >= MAX_LINK_CHECKS) break;
    }
    if (candidates.length >= MAX_LINK_CHECKS) break;
  }

  const unique = [];
  const seen = new Set();
  for (const c of candidates) {
    if (seen.has(c.url)) continue;
    seen.add(c.url);
    unique.push(c);
  }

  const broken = [];
  for (const c of unique.slice(0, MAX_LINK_CHECKS)) {
    try {
      const res = await safeFetch(c.url, { method: 'GET', maxBytes: 8000, timeoutMs: 8000 });
      if (res.status >= 400 || res.status === 0) {
        broken.push({ ...c, status: res.status, recommendation: res.status === 404 ? 'Update or remove link' : 'Investigate server error / access' });
      }
    } catch (err) {
      broken.push({ ...c, status: 0, error: err.message, recommendation: 'URL unreachable — verify destination' });
    }
  }

  return {
    success: true,
    data: {
      linksChecked: Math.min(unique.length, MAX_LINK_CHECKS),
      brokenCount: broken.length,
      broken,
      limitNote: `Checked up to ${MAX_LINK_CHECKS} unique links from a limited crawl for cost control.`,
    },
  };
}

async function sitemapTool({ url, mode = 'validate' }) {
  const start = normalizeUrlInput(url);
  if (mode === 'generate') {
    const crawl = await crawlSite(url, { maxPages: 30, maxDepth: 2 });
    const locs = crawl.pages.filter((p) => p.ok).map((p) => p.finalUrl || p.url);
    const xml = buildSitemapXml(locs);
    return {
      success: true,
      data: {
        mode: 'generate',
        urlCount: locs.length,
        xml,
        note: 'Generated from a limited crawl sample — expand manually for large sites.',
      },
    };
  }

  // validate
  let sitemapUrl = url;
  if (!/sitemap/i.test(url)) {
    sitemapUrl = new URL('/sitemap.xml', start.origin).toString();
  }
  const fetched = await safeFetch(sitemapUrl);
  if (!fetched.ok) throw new Error(`Sitemap not accessible (HTTP ${fetched.status}).`);
  const locs = parseSitemapXml(fetched.body);
  if (!locs.length) throw new Error('No <loc> URLs found in sitemap.');

  const sample = locs.slice(0, MAX_SITEMAP_SAMPLE);
  const issues = [];
  const seen = new Set();
  for (const loc of sample) {
    if (seen.has(loc)) issues.push({ url: loc, issue: 'Duplicate URL in sitemap' });
    seen.add(loc);
    try {
      const res = await safeFetch(loc, { maxBytes: 50000 });
      if (res.status === 404) issues.push({ url: loc, issue: '404 Not Found' });
      else if (res.status >= 300 && res.status < 400) issues.push({ url: loc, issue: `Redirect status ${res.status}` });
      else if (res.redirected) issues.push({ url: loc, issue: `Redirects to ${res.finalUrl}` });
      else if (!res.ok) issues.push({ url: loc, issue: `HTTP ${res.status}` });
      else {
        const page = parseHtmlPage(res.body, res.finalUrl);
        const robots = `${page.robots || ''} ${res.robotsTag || ''}`.toLowerCase();
        if (robots.includes('noindex')) issues.push({ url: loc, issue: 'URL is noindex' });
      }
    } catch (err) {
      issues.push({ url: loc, issue: err.message });
    }
  }

  return {
    success: true,
    data: {
      mode: 'validate',
      sitemapUrl,
      totalUrlsInSitemap: locs.length,
      sampled: sample.length,
      issues,
    },
  };
}

async function canonicalIndexability({ url }) {
  const analysis = await fetchPageAnalysis(url);
  const score = scoreIndexability({
    page: analysis.page,
    fetchMeta: {
      ok: analysis.fetch.ok,
      status: analysis.fetch.status,
      finalUrl: analysis.fetch.finalUrl,
      robotsHeader: analysis.fetch.robotsHeader,
    },
  });

  let robotsTxtAccessible = null;
  try {
    const origin = new URL(analysis.fetch.finalUrl).origin;
    const robots = await safeFetch(`${origin}/robots.txt`, { maxBytes: 100000 });
    robotsTxtAccessible = robots.ok;
  } catch {
    robotsTxtAccessible = false;
  }

  return {
    success: true,
    data: {
      fetch: analysis.fetch,
      canonical: analysis.page.canonical,
      robotsMeta: analysis.page.robots,
      xRobotsTag: analysis.fetch.robotsHeader,
      robotsTxtAccessible,
      indexability: score,
    },
  };
}

async function actionPlan({ url }) {
  const crawl = await crawlSite(url, { maxPages: 10, maxDepth: 2 });
  const audit = buildWebsiteAuditScore(crawl.pages);
  const ai = await interpretSeoInsights({
    task: 'action-plan',
    metricsPayload: audit,
    instruction: `Return JSON {
      "roadmap": [
        { "priority": "P0|P1|P2", "impact": "High|Medium|Low", "urgency": "Now|This week|This month", "task": "...", "why": "..." }
      ],
      "beginnerSteps": ["..."]
    }
    Prioritize using critical/warnings arrays. Do not invent new issues.`,
  });
  return {
    success: true,
    data: {
      auditSummary: { overall: audit.overall, categories: audit.categories, critical: audit.critical.slice(0, 15), warnings: audit.warnings.slice(0, 15) },
      ai: ai.ok ? ai.data : null,
      aiError: ai.ok ? null : ai.error,
    },
  };
}

async function robotsTxtTool({ url, mode = 'generate', testPath = '/', userAgent = 'Googlebot', customRules }) {
  const start = normalizeUrlInput(url || 'https://example.com');
  if (mode === 'generate') {
    const sitemap = new URL('/sitemap.xml', start.origin).toString();
    const body =
      customRules?.trim() ||
      `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${sitemap}\n`;
    return {
      success: true,
      data: {
        mode: 'generate',
        robotsTxt: body,
        tips: ['Keep Disallow rules specific', 'Always include Sitemap', 'Test staging paths before deploy'],
      },
    };
  }

  const robotsUrl = new URL('/robots.txt', start.origin).toString();
  const fetched = await safeFetch(robotsUrl);
  const parsed = parseRobotsTxt(fetched.body || '');
  const path = testPath.startsWith('/') ? testPath : `/${testPath}`;
  const decision = isPathAllowed(parsed, path, userAgent);

  return {
    success: true,
    data: {
      mode: 'test',
      robotsUrl,
      status: fetched.status,
      accessible: fetched.ok,
      parsed: { groups: parsed.groups, sitemaps: parsed.sitemaps },
      test: { path, userAgent, decision },
    },
  };
}

async function headerMetaInspector({ url }) {
  const analysis = await fetchPageAnalysis(url);
  return {
    success: true,
    data: {
      fetch: analysis.fetch,
      meta: {
        title: analysis.page.title,
        description: analysis.page.description,
        robots: analysis.page.robots,
        canonical: analysis.page.canonical,
        language: analysis.page.language,
        charset: analysis.page.charset,
        viewport: analysis.page.viewport,
        openGraph: analysis.page.openGraph,
        twitter: analysis.page.twitter,
      },
    },
  };
}

async function trafficRevenue(payload) {
  return { success: true, data: estimateTrafficAdRevenue(payload) };
}

async function healthScore({ url }) {
  const crawl = await crawlSite(url, { maxPages: 12, maxDepth: 2 });
  const audit = buildWebsiteAuditScore(crawl.pages);
  let performance = null;
  try {
    const psi = await runPageSpeed(normalizeUrlInput(url).toString(), 'mobile');
    performance = psi.scores.performance;
    audit.categories.performance = performance;
  } catch {
    audit.categories.performance = null;
  }
  const overall = audit.categories.performance != null
    ? Math.round(
        audit.overall * 0.85 + audit.categories.performance * 0.15
      )
    : audit.overall;

  const ai = await interpretSeoInsights({
    task: 'health-score',
    metricsPayload: { overall, categories: audit.categories, critical: audit.critical.slice(0, 12) },
    instruction: 'Return JSON { "summary": "...", "improveFirst": ["..."] }',
  });

  return {
    success: true,
    data: {
      overall,
      categories: audit.categories,
      critical: audit.critical,
      warnings: audit.warnings,
      pagesScored: audit.pagesScored,
      ai: ai.ok ? ai.data : null,
      aiError: ai.ok ? null : ai.error,
      disclaimer: 'Zetawala SEO Health Score is an analytical estimate — not an official Google metric.',
    },
  };
}

async function keywordDensityTool({ url, text }) {
  let sourceText = text || '';
  let pageMeta = null;
  if (url) {
    const analysis = await fetchPageAnalysis(url);
    sourceText = analysis.page.textPreview + ' ' + (analysis.page.title || '') + ' ' + (analysis.page.description || '');
    // Prefer fuller body text
    sourceText = analysis.page.wordCount
      ? stripFuller(analysis)
      : sourceText;
    pageMeta = { title: analysis.page.title, wordCount: analysis.page.wordCount };
  }
  if (!sourceText.trim()) throw new Error('Provide a URL or paste text to analyze.');
  const density = keywordDensity(sourceText);
  const overused = density.oneWord.filter((t) => t.density >= 3).slice(0, 15);
  return {
    success: true,
    data: { pageMeta, density, overused, note: 'High density may indicate keyword stuffing — use judgment.' },
  };
}

function stripFuller(analysis) {
  // page.textPreview is limited; use title+desc+headings as supplement already in parse
  const h = analysis.page.headings;
  return [
    analysis.page.title,
    analysis.page.description,
    ...(h.h1 || []),
    ...(h.h2 || []),
    analysis.page.textPreview,
  ]
    .filter(Boolean)
    .join(' ');
}

function buildSitemapXml(urls) {
  const body = urls
    .map(
      (u) => `  <url>\n    <loc>${escapeXml(u)}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slimPage(p) {
  return {
    url: p.url,
    status: p.status,
    title: p.parsed?.title || null,
    wordCount: p.parsed?.wordCount ?? null,
  };
}
