import { safeFetch, normalizeUrlInput, resolveHref, sameOrigin } from './seoFetch';
import { parseHtmlPage } from './seoParse';
import { seoCacheGet, seoCacheSet, seoCacheKey } from './seoCache';

/**
 * Limited same-origin crawl for cost control.
 */
export async function crawlSite(startUrl, { maxPages = 12, maxDepth = 2 } = {}) {
  const start = normalizeUrlInput(startUrl);
  const ck = seoCacheKey(['crawl', start.origin, start.pathname, maxPages, maxDepth]);
  const cached = seoCacheGet(ck);
  if (cached) return { ...cached, fromCache: true };

  const queue = [{ url: start.toString(), depth: 0 }];
  const seen = new Set();
  const pages = [];

  while (queue.length && pages.length < maxPages) {
    const { url, depth } = queue.shift();
    const normalized = url.split('#')[0];
    if (seen.has(normalized)) continue;
    seen.add(normalized);

    let fetched;
    try {
      fetched = await safeFetch(normalized);
    } catch (err) {
      pages.push({
        url: normalized,
        error: err.message,
        status: 0,
        depth,
      });
      continue;
    }

    const isHtml = /html|xml|text\/plain/i.test(fetched.contentType) || fetched.body.includes('<html');
    const parsed = isHtml ? parseHtmlPage(fetched.body, fetched.finalUrl) : null;

    const page = {
      url: normalized,
      finalUrl: fetched.finalUrl,
      status: fetched.status,
      ok: fetched.ok,
      redirected: fetched.redirected,
      robotsHeader: fetched.robotsTag,
      depth,
      parsed,
    };
    pages.push(page);

    if (depth < maxDepth && parsed) {
      for (const link of parsed.links) {
        const abs = resolveHref(fetched.finalUrl || normalized, link.href);
        if (!abs) continue;
        if (!sameOrigin(start.toString(), abs)) continue;
        const clean = abs.split('#')[0];
        if (!seen.has(clean) && queue.length + pages.length < maxPages * 3) {
          queue.push({ url: clean, depth: depth + 1 });
        }
      }
    }
  }

  const result = {
    startUrl: start.toString(),
    origin: start.origin,
    pagesAnalyzed: pages.length,
    pages,
  };
  seoCacheSet(ck, result, 'crawl');
  return { ...result, fromCache: false };
}

export async function fetchPageAnalysis(urlInput) {
  const url = normalizeUrlInput(urlInput);
  const ck = seoCacheKey(['page', url.toString()]);
  const cached = seoCacheGet(ck);
  if (cached) return { ...cached, fromCache: true };

  const fetched = await safeFetch(url);
  const parsed = parseHtmlPage(fetched.body, fetched.finalUrl);
  const result = {
    fetch: {
      status: fetched.status,
      ok: fetched.ok,
      finalUrl: fetched.finalUrl,
      redirected: fetched.redirected,
      contentType: fetched.contentType,
      robotsHeader: fetched.robotsTag,
    },
    page: parsed,
  };
  seoCacheSet(ck, result, 'page');
  return { ...result, fromCache: false };
}
