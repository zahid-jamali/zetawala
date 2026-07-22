/**
 * In-memory TTL cache for SEO crawls / PageSpeed (quota + cost control).
 */

const store = new Map();

const TTL = {
  page: 30 * 60 * 1000,
  crawl: 20 * 60 * 1000,
  pagespeed: 60 * 60 * 1000,
  sitemap: 30 * 60 * 1000,
};

export function seoCacheGet(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

export function seoCacheSet(key, value, kind = 'page') {
  store.set(key, { value, expiresAt: Date.now() + (TTL[kind] || TTL.page) });
  if (store.size > 400) {
    store.delete(store.keys().next().value);
  }
}

export function seoCacheKey(parts) {
  return parts.filter((p) => p != null && p !== '').join(':');
}

export { TTL };
