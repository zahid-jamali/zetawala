/**
 * Catalog-only URL builders (no Next route-map dependency).
 * Used by hreflang, sitemap, switcher, and tests.
 */

import { DEFAULT_LOCALE, SITE_URL, isDefaultLocale, isPrefixLocale } from './config.js';
import {
  LOCALIZED_PAGES,
  getPageSlug,
  getToolLocalization,
  getToolSlug,
  isPageLocalized,
  isToolLocalized,
} from './catalog.js';

export function stripTrailingSlash(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

export function absoluteUrl(pathname) {
  const path = stripTrailingSlash(pathname);
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export function getLocaleFromPathname(pathname) {
  const clean = String(pathname || '')
    .split('?')[0]
    .split('#')[0];
  const first = clean.split('/').filter(Boolean)[0] || '';
  const locale = first.toLowerCase();
  if (isPrefixLocale(locale)) return locale;
  return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname) {
  const path = stripTrailingSlash(pathname || '/');
  const parts = path.split('/').filter(Boolean);
  if (parts.length && isPrefixLocale(parts[0])) {
    const rest = parts.slice(1);
    return rest.length ? `/${rest.join('/')}` : '/';
  }
  return path;
}

export function getHomePath(locale = DEFAULT_LOCALE) {
  if (!isPageLocalized('home', locale) || isDefaultLocale(locale)) return '/';
  return `/${locale}`;
}

export function getLocalizedPagePath(locale, pageId) {
  if (pageId === 'home') return getHomePath(locale);

  const entry = LOCALIZED_PAGES[pageId];
  if (!entry) return '/';

  if (!isPageLocalized(pageId, locale) || isDefaultLocale(locale)) {
    return entry.englishPath || `/${entry.slugs[DEFAULT_LOCALE] || pageId}`;
  }

  const slug = getPageSlug(pageId, locale);
  if (!slug) return getHomePath(locale);
  return `/${locale}/${slug}`;
}

/**
 * Public URL for a catalog tool. Returns null when the tool is not in
 * LOCALIZED_TOOLS (callers should use getSeoPath for those).
 */
export function getCatalogToolPath(locale, internalSlug) {
  const entry = getToolLocalization(internalSlug);
  if (!entry) return null;

  if (!isToolLocalized(internalSlug, locale) || isDefaultLocale(locale)) {
    return `/tools/${entry.folder}/${entry.slugs[DEFAULT_LOCALE]}`;
  }

  const slug = getToolSlug(internalSlug, locale);
  if (!slug) return `/tools/${entry.folder}/${entry.slugs[DEFAULT_LOCALE]}`;
  return `/${locale}/tools/${entry.folder}/${slug}`;
}

export function getLocalizedPageUrl(locale, pageId) {
  return absoluteUrl(getLocalizedPagePath(locale, pageId));
}

export function getCatalogToolUrl(locale, internalSlug) {
  const path = getCatalogToolPath(locale, internalSlug);
  return path ? absoluteUrl(path) : null;
}
