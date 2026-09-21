/**
 * What is actually published per locale.
 *
 * Every active public tool is available in en/es/fr/de.
 * English seoSlug is the default public slug. Natural localized slugs
 * are applied only where they already exist (see SLUG_OVERRIDES).
 */

import { DEFAULT_LOCALE, ENABLED_LOCALES, isEnabledLocale } from './config.js';
import { listPublicTools } from './registry.js';

export { LOCALIZED_PAGES, SLUG_OVERRIDES } from './catalogData.js';
import { LOCALIZED_PAGES, SLUG_OVERRIDES } from './catalogData.js';

function buildLocalizedTools() {
  const map = {};
  for (const tool of listPublicTools()) {
    const override = SLUG_OVERRIDES[tool.internalSlug] || {};
    const slugs = { [DEFAULT_LOCALE]: tool.seoSlug };
    for (const locale of ENABLED_LOCALES) {
      if (locale === DEFAULT_LOCALE) continue;
      slugs[locale] = override[locale] || tool.seoSlug;
    }
    map[tool.internalSlug] = {
      category: tool.routeKey,
      folder: tool.folder,
      categorySlug: tool.categorySlug,
      navId: tool.navId,
      locales: ENABLED_LOCALES.slice(),
      slugs,
    };
  }
  return map;
}

export const LOCALIZED_TOOLS = buildLocalizedTools();

export function getToolLocalization(internalSlug) {
  return LOCALIZED_TOOLS[internalSlug] || null;
}

export function isToolLocalized(internalSlug, locale) {
  if (!isEnabledLocale(locale)) return false;
  const entry = LOCALIZED_TOOLS[internalSlug];
  return Boolean(entry?.locales?.includes(locale));
}

export function isPageLocalized(pageId, locale) {
  if (!isEnabledLocale(locale)) return false;
  const entry = LOCALIZED_PAGES[pageId];
  return Boolean(entry?.locales?.includes(locale));
}

export function getToolSlug(internalSlug, locale = DEFAULT_LOCALE) {
  const entry = LOCALIZED_TOOLS[internalSlug];
  if (!entry) return null;
  if (entry.locales.includes(locale) && entry.slugs[locale]) {
    return entry.slugs[locale];
  }
  return entry.slugs[DEFAULT_LOCALE] || null;
}

export function getPageSlug(pageId, locale = DEFAULT_LOCALE) {
  const entry = LOCALIZED_PAGES[pageId];
  if (!entry) return null;
  if (entry.locales.includes(locale) && entry.slugs[locale] !== undefined) {
    return entry.slugs[locale];
  }
  return entry.slugs[DEFAULT_LOCALE] ?? null;
}

export function getLocalesForTool(internalSlug) {
  return LOCALIZED_TOOLS[internalSlug]?.locales?.filter((locale) => isEnabledLocale(locale)) || [
    DEFAULT_LOCALE,
  ];
}

export function getLocalesForPage(pageId) {
  return LOCALIZED_PAGES[pageId]?.locales?.filter((locale) => isEnabledLocale(locale)) || [
    DEFAULT_LOCALE,
  ];
}

export function listLocalizedToolIds(locale = null) {
  return Object.keys(LOCALIZED_TOOLS).filter((id) => {
    if (locale) return isToolLocalized(id, locale);
    return LOCALIZED_TOOLS[id].locales.some((code) => isEnabledLocale(code));
  });
}

export function resolveLocalizedTool(locale, folder, publicSlug) {
  if (!isEnabledLocale(locale) || locale === DEFAULT_LOCALE) return null;
  const slug = String(publicSlug || '').trim();
  if (!slug || !folder) return null;

  for (const [internalSlug, entry] of Object.entries(LOCALIZED_TOOLS)) {
    if (entry.folder !== folder) continue;
    if (!entry.locales.includes(locale)) continue;
    if (entry.slugs[locale] === slug) {
      return {
        internalSlug,
        category: entry.category,
        folder: entry.folder,
        categorySlug: entry.categorySlug,
        publicSlug: slug,
        locale,
      };
    }
  }
  return null;
}

export function resolveLocalizedPage(locale, segment) {
  if (!isEnabledLocale(locale) || locale === DEFAULT_LOCALE) return null;
  const value = String(segment || '');

  for (const [pageId, entry] of Object.entries(LOCALIZED_PAGES)) {
    if (pageId === 'home') continue;
    if (!entry.locales.includes(locale)) continue;
    if (entry.slugs[locale] === value) {
      return { pageId, locale, slug: value };
    }
  }
  return null;
}

export function listEnabledLocales() {
  return ENABLED_LOCALES.slice();
}
