/**
 * SSRF-safe HTTP fetch for public website analysis.
 */

const BLOCKED_HOSTS = new Set(['localhost', 'metadata.google.internal', 'metadata']);
const PRIVATE_IP_RE =
  /^(127\.|10\.|192\.168\.|169\.254\.|0\.|::1|fc|fd|fe80)/i;

export function normalizeUrlInput(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Please provide a valid URL.');
  }
  let raw = input.trim();
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('Invalid URL format.');
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only http and https URLs are allowed.');
  }
  const host = url.hostname.toLowerCase();
  if (BLOCKED_HOSTS.has(host) || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new Error('This host cannot be scanned for security reasons.');
  }
  if (PRIVATE_IP_RE.test(host) || host === '::1') {
    throw new Error('Private or local network addresses are not allowed.');
  }
  return url;
}

export async function safeFetch(urlInput, { method = 'GET', maxBytes = 1_500_000, timeoutMs = 12000, followRedirects = true } = {}) {
  const url = typeof urlInput === 'string' ? normalizeUrlInput(urlInput) : urlInput;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url.toString(), {
      method,
      redirect: followRedirects ? 'follow' : 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'ZetawalaSEOBot/1.0 (+https://www.zetawala.com; SEO audit)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const finalUrl = res.url || url.toString();
    const contentType = res.headers.get('content-type') || '';
    const robotsTag = res.headers.get('x-robots-tag') || null;

    let body = '';
    if (method !== 'HEAD') {
      const buf = await res.arrayBuffer();
      const slice = buf.byteLength > maxBytes ? buf.slice(0, maxBytes) : buf;
      body = new TextDecoder('utf-8', { fatal: false }).decode(slice);
    }

    return {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      finalUrl,
      contentType,
      robotsTag,
      headers: Object.fromEntries(res.headers.entries()),
      body,
      redirected: res.redirected,
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out while fetching the URL.');
    }
    throw new Error(err.message || 'Failed to fetch URL.');
  } finally {
    clearTimeout(timer);
  }
}

export function sameOrigin(a, b) {
  try {
    return new URL(a).origin === new URL(b).origin;
  } catch {
    return false;
  }
}

export function resolveHref(base, href) {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return null;
  }
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}
