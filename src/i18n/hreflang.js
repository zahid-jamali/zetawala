import { DEFAULT_LOCALE, SITE_URL } from './config.js';
import {
  getLocalesForPage,
  getLocalesForTool,
  isPageLocalized,
  isToolLocalized,
} from './catalog.js';
import {
  absoluteUrl,
  getCatalogToolPath,
  getLocalizedPagePath,
} from './urls.js';

function withXDefault(languages, defaultHref) {
  if (!languages || !Object.keys(languages).length) return undefined;
  return {
    'x-default': defaultHref,
    ...languages,
  };
}

export function getToolHreflangLanguages(internalSlug) {
  const locales = getLocalesForTool(internalSlug);
  const published = locales.filter((locale) => isToolLocalized(internalSlug, locale));
  if (published.length < 2) return undefined;

  const languages = {};
  for (const locale of published) {
    const path = getCatalogToolPath(locale, internalSlug);
    if (path) languages[locale] = absoluteUrl(path);
  }
  const defaultHref = languages[DEFAULT_LOCALE] || `${SITE_URL}/`;
  return withXDefault(languages, defaultHref);
}

export function getPageHreflangLanguages(pageId) {
  const locales = getLocalesForPage(pageId);
  const published = locales.filter((locale) => isPageLocalized(pageId, locale));
  if (published.length < 2) return undefined;

  const languages = {};
  for (const locale of published) {
    languages[locale] = absoluteUrl(getLocalizedPagePath(locale, pageId));
  }
  const defaultHref = languages[DEFAULT_LOCALE] || `${SITE_URL}/`;
  return withXDefault(languages, defaultHref);
}

export function getHreflangLinkTags(languages) {
  if (!languages) return [];
  return Object.entries(languages).map(([hreflang, href]) => ({ hreflang, href }));
}
