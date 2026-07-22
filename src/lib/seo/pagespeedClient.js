import { seoCacheGet, seoCacheSet, seoCacheKey } from './seoCache';

/**
 * Google PageSpeed Insights API v5
 * Env: PAGESPEED_API_KEY (or GOOGLE_API_KEY)
 */
export async function runPageSpeed(url, strategy = 'mobile') {
  const key = process.env.PAGESPEED_API_KEY || process.env.GOOGLE_API_KEY || process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error('PAGESPEED_API_KEY is not configured on the server.');
  }

  const ck = seoCacheKey(['psi', url, strategy]);
  const cached = seoCacheGet(ck);
  if (cached) return { ...cached, fromCache: true };

  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', url);
  endpoint.searchParams.set('strategy', strategy);
  endpoint.searchParams.set('category', 'performance');
  endpoint.searchParams.append('category', 'accessibility');
  endpoint.searchParams.append('category', 'best-practices');
  endpoint.searchParams.append('category', 'seo');
  endpoint.searchParams.set('key', key);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);

  let res;
  try {
    res = await fetch(endpoint.toString(), { signal: controller.signal });
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') throw new Error('PageSpeed Insights request timed out.');
    throw new Error('Failed to reach PageSpeed Insights API.');
  } finally {
    clearTimeout(timer);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || `PageSpeed API error (${res.status})`);
  }

  const cats = data.lighthouseResult?.categories || {};
  const audits = data.lighthouseResult?.audits || {};
  const metrics = data.loadingExperience?.metrics || data.originLoadingExperience?.metrics || {};

  const pick = (id) => {
    const a = audits[id];
    if (!a) return null;
    return {
      id,
      title: a.title,
      description: a.description,
      score: a.score,
      displayValue: a.displayValue || null,
      numericValue: a.numericValue ?? null,
    };
  };

  const opportunities = Object.values(audits)
    .filter((a) => a.details?.type === 'opportunity' && a.score != null && a.score < 1)
    .slice(0, 10)
    .map((a) => ({
      id: a.id,
      title: a.title,
      displayValue: a.displayValue || null,
      score: a.score,
    }));

  const diagnostics = Object.values(audits)
    .filter((a) => a.details?.type === 'table' || a.details?.type === 'list')
    .filter((a) => ['diagnostics', 'mainthread-work-breakdown', 'bootup-time', 'dom-size'].some((x) => a.id?.includes(x) || a.id === x))
    .slice(0, 8)
    .map((a) => ({ id: a.id, title: a.title, displayValue: a.displayValue || null }));

  const result = {
    url,
    strategy,
    scores: {
      performance: Math.round((cats.performance?.score || 0) * 100),
      accessibility: Math.round((cats.accessibility?.score || 0) * 100),
      bestPractices: Math.round((cats['best-practices']?.score || 0) * 100),
      seo: Math.round((cats.seo?.score || 0) * 100),
    },
    vitals: {
      lcp: pick('largest-contentful-paint'),
      cls: pick('cumulative-layout-shift'),
      inp: pick('interaction-to-next-paint') || pick('experimental-interaction-to-next-paint'),
      fcp: pick('first-contentful-paint'),
      ttfb: pick('server-response-time') || pick('time-to-first-byte'),
    },
    fieldMetricsAvailable: Object.keys(metrics).length > 0,
    fieldMetricsNote: Object.keys(metrics).length
      ? 'Field data available from Chrome UX Report (where provided by PSI).'
      : 'Field CWV data unavailable for this URL; lab metrics shown instead.',
    opportunities,
    diagnostics,
    labels: {
      source: 'Google PageSpeed Insights API',
    },
  };

  seoCacheSet(ck, result, 'pagespeed');
  return { ...result, fromCache: false };
}
