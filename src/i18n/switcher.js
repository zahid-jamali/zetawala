import { DEFAULT_LOCALE, isEnabledLocale, isPrefixLocale } from './config.js';
import {
  LOCALIZED_PAGES,
  LOCALIZED_TOOLS,
  isPageLocalized,
  isToolLocalized,
} from './catalog.js';
import { getCatalogToolPath, getHomePath, getLocalizedPagePath, stripLocalePrefix } from './urls.js';

function matchEnglishPage(pathname) {
  const path = stripLocalePrefix(pathname);
  if (path === '/') return { type: 'home' };

  for (const [pageId, entry] of Object.entries(LOCALIZED_PAGES)) {
    if (pageId === 'home') continue;
    if (entry.englishPath === path || `/${entry.slugs[DEFAULT_LOCALE]}` === path) {
      return { type: 'page', pageId };
    }
  }
  return null;
}

function matchEnglishTool(pathname) {
  const path = stripLocalePrefix(pathname);
  const parts = path.split('/').filter(Boolean);
  if (parts[0] !== 'tools' || parts.length < 3) return null;
  const folder = parts[1];
  const publicSlug = parts[2];

  for (const [id, entry] of Object.entries(LOCALIZED_TOOLS)) {
    if (entry.folder !== folder) continue;
    if (entry.slugs[DEFAULT_LOCALE] === publicSlug) {
      return { type: 'tool', internalSlug: id, category: entry.category };
    }
  }
  return null;
}

function matchPrefixedResource(locale, pathname) {
  const stripped = stripLocalePrefix(pathname);
  const parts = stripped === '/' ? [] : stripped.split('/').filter(Boolean);

  if (parts.length === 0) return { type: 'home' };

  if (parts[0] === 'tools' && parts.length >= 3) {
    for (const [id, entry] of Object.entries(LOCALIZED_TOOLS)) {
      if (entry.folder !== parts[1]) continue;
      if (!entry.locales.includes(locale)) continue;
      if (entry.slugs[locale] === parts[2]) {
        return { type: 'tool', internalSlug: id, category: entry.category };
      }
    }
    return null;
  }

  const joined = parts.join('/');
  for (const [pageId, entry] of Object.entries(LOCALIZED_PAGES)) {
    if (pageId === 'home') continue;
    if (entry.locales.includes(locale) && entry.slugs[locale] === joined) {
      return { type: 'page', pageId };
    }
  }
  return null;
}

export function identifyCurrentResource(pathname) {
  const first = String(pathname || '')
    .split('/')
    .filter(Boolean)[0];
  const locale = isPrefixLocale(first) ? first : DEFAULT_LOCALE;

  if (isPrefixLocale(locale)) {
    return { locale, resource: matchPrefixedResource(locale, pathname) };
  }

  return {
    locale: DEFAULT_LOCALE,
    resource: matchEnglishPage(pathname) || matchEnglishTool(pathname),
  };
}

export function getSwitcherHref(pathname, targetLocale) {
  if (!isEnabledLocale(targetLocale)) {
    return getHomePath(DEFAULT_LOCALE);
  }

  const { resource } = identifyCurrentResource(pathname);
  if (!resource) return getHomePath(targetLocale);

  if (resource.type === 'home') {
    return isPageLocalized('home', targetLocale)
      ? getHomePath(targetLocale)
      : getHomePath(DEFAULT_LOCALE);
  }

  if (resource.type === 'page') {
    if (isPageLocalized(resource.pageId, targetLocale)) {
      return getLocalizedPagePath(targetLocale, resource.pageId);
    }
    return getHomePath(targetLocale);
  }

  if (resource.type === 'tool') {
    const path = getCatalogToolPath(targetLocale, resource.internalSlug);
    if (path && isToolLocalized(resource.internalSlug, targetLocale)) return path;
    if (targetLocale === DEFAULT_LOCALE && path) return path;
    return getHomePath(targetLocale);
  }

  return getHomePath(targetLocale);
}

export function getSwitcherItems(pathname) {
  return ['en', 'es', 'fr', 'de'].filter(isEnabledLocale).map((locale) => ({
    locale,
    href: getSwitcherHref(pathname, locale),
  }));
}
