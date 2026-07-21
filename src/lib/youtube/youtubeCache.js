/**
 * In-memory TTL cache for YouTube Data API responses.
 * Designed so a Redis adapter can replace get/set later without changing callers.
 */

const store = new Map();

const DEFAULT_TTLS = {
  channel: 6 * 60 * 60 * 1000, // 6h
  video: 60 * 60 * 1000, // 1h
  search: 30 * 60 * 1000, // 30m
  analysis: 20 * 60 * 1000, // 20m
};

export function getCacheTtl(kind) {
  return DEFAULT_TTLS[kind] || DEFAULT_TTLS.search;
}

export function cacheGet(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

export function cacheSet(key, value, ttlMs) {
  store.set(key, {
    value,
    expiresAt: Date.now() + (ttlMs || DEFAULT_TTLS.search),
  });
  // Soft bound: prune oldest if map grows large
  if (store.size > 500) {
    const firstKey = store.keys().next().value;
    store.delete(firstKey);
  }
}

export function cacheKey(parts) {
  return parts.filter(Boolean).join(':');
}

export { DEFAULT_TTLS };
