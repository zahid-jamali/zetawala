/**
 * Lightweight HTML/XML parsers (no extra dependency).
 */

function decodeEntities(str = '') {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

export function stripTags(html = '') {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function metaContent(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${key}["'][^>]+content=["']([^"']*)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${key}["'][^>]*>`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return decodeEntities(m[1].trim());
  }
  return null;
}

export function parseHtmlPage(html = '', pageUrl = '') {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1].replace(/\s+/g, ' ').trim()) : null;

  const description = metaContent(html, 'description');
  const robots = metaContent(html, 'robots');
  const googlebot = metaContent(html, 'googlebot');
  const viewport = metaContent(html, 'viewport');
  const charset =
    (html.match(/<meta[^>]+charset=["']?([^"'>\s]+)/i) || [])[1] ||
    metaContent(html, 'charset');
  const language =
    (html.match(/<html[^>]+lang=["']([^"']+)["']/i) || [])[1] || null;

  const canonicalMatch = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
  ) || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;

  const headings = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] };
  for (let i = 1; i <= 6; i++) {
    const re = new RegExp(`<h${i}[^>]*>([\\s\\S]*?)<\\/h${i}>`, 'gi');
    let m;
    while ((m = re.exec(html)) && headings[`h${i}`].length < 50) {
      headings[`h${i}`].push(stripTags(m[1]).slice(0, 200));
    }
  }

  const links = [];
  const linkRe = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let lm;
  while ((lm = linkRe.exec(html)) && links.length < 500) {
    links.push({
      href: lm[1],
      anchor: stripTags(lm[2]).slice(0, 120),
    });
  }

  const images = [];
  const imgRe = /<img\b[^>]*>/gi;
  let im;
  while ((im = imgRe.exec(html)) && images.length < 200) {
    const tag = im[0];
    const src = (tag.match(/\bsrc=["']([^"']+)["']/i) || [])[1] || null;
    const altMatch = tag.match(/\balt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : null;
    const hasAlt = altMatch !== null;
    images.push({ src, alt, hasAlt, missingAlt: !hasAlt || alt === '' });
  }

  const og = {};
  const tw = {};
  ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name'].forEach((k) => {
    og[k] = metaContent(html, k);
  });
  ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'].forEach((k) => {
    tw[k] = metaContent(html, k);
  });

  const text = stripTags(html);
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  return {
    pageUrl,
    title,
    titleLength: title ? title.length : 0,
    description,
    descriptionLength: description ? description.length : 0,
    robots,
    googlebot,
    viewport,
    charset,
    language,
    canonical,
    headings,
    h1Count: headings.h1.length,
    links,
    images,
    openGraph: og,
    twitter: tw,
    wordCount,
    textPreview: text.slice(0, 500),
  };
}

export function parseSitemapXml(xml = '') {
  const urls = [];
  const locRe = /<loc>\s*([^<]+)\s*<\/loc>/gi;
  let m;
  while ((m = locRe.exec(xml)) && urls.length < 500) {
    urls.push(m[1].trim());
  }
  return [...new Set(urls)];
}

export function parseRobotsTxt(text = '') {
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const groups = [];
  let current = { userAgent: '*', allow: [], disallow: [], sitemaps: [] };

  const flush = () => {
    if (current.allow.length || current.disallow.length || current.userAgent) {
      groups.push(current);
    }
  };

  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    const [rawKey, ...rest] = line.split(':');
    const key = (rawKey || '').toLowerCase().trim();
    const value = rest.join(':').trim();
    if (key === 'user-agent') {
      if (current.allow.length || current.disallow.length) flush();
      current = { userAgent: value || '*', allow: [], disallow: [], sitemaps: [] };
    } else if (key === 'disallow') current.disallow.push(value);
    else if (key === 'allow') current.allow.push(value);
    else if (key === 'sitemap') {
      current.sitemaps.push(value);
    }
  }
  flush();

  const sitemaps = [...new Set(groups.flatMap((g) => g.sitemaps || []))];
  return { groups, sitemaps, raw: text };
}

/** Test if path is allowed for a user-agent (simplified robots semantics). */
export function isPathAllowed(robotsParsed, path, userAgent = 'Googlebot') {
  const ua = userAgent.toLowerCase();
  const groups = robotsParsed.groups || [];
  const matched =
    groups.find((g) => g.userAgent.toLowerCase() === ua) ||
    groups.find((g) => g.userAgent === '*') ||
    { allow: [], disallow: [] };

  const rules = [
    ...matched.disallow.map((p) => ({ type: 'disallow', pattern: p })),
    ...matched.allow.map((p) => ({ type: 'allow', pattern: p })),
  ].filter((r) => r.pattern !== undefined);

  // Longest match wins (common practical approach)
  let decision = 'allowed';
  let bestLen = -1;
  for (const rule of rules) {
    if (!rule.pattern && rule.type === 'disallow') {
      // empty disallow = allow all
      continue;
    }
    if (path.startsWith(rule.pattern) || rule.pattern === '/') {
      if (rule.pattern.length >= bestLen) {
        bestLen = rule.pattern.length;
        decision = rule.type === 'allow' ? 'allowed' : 'blocked';
      }
    }
  }
  return decision;
}

export function keywordDensity(text = '', { topN = 25 } = {}) {
  const cleaned = stripTags(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const tokens = cleaned.split(' ').filter((t) => t.length > 2);
  const total = tokens.length || 1;

  const countNgrams = (n) => {
    const map = {};
    for (let i = 0; i <= tokens.length - n; i++) {
      const key = tokens.slice(i, i + n).join(' ');
      map[key] = (map[key] || 0) + 1;
    }
    return Object.entries(map)
      .map(([term, count]) => ({
        term,
        count,
        density: Math.round((count / total) * 10000) / 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topN);
  };

  return {
    wordCount: tokens.length,
    oneWord: countNgrams(1),
    twoWord: countNgrams(2),
    threeWord: countNgrams(3),
  };
}
