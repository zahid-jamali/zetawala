/**
 * Resolve a locale-prefixed pathname into a published resource.
 * Returns null when the URL must 404 (unpublished / unknown).
 */

import { PREFIX_LOCALES, isPrefixLocale } from './config.js';
import {
  LOCALIZED_PAGES,
  isPageLocalized,
  isToolLocalized,
  resolveLocalizedPage,
  resolveLocalizedTool,
} from './catalog.js';

/**
 * Nested blog URLs (admin, category listings, posts) stay on unprefixed
 * English paths. Prefix locales only publish the blog index (`/es/blog`).
 */
export function getEnglishBlogFallbackPath(locale, slugSegments) {
  if (!isPrefixLocale(locale)) return null;
  const parts = Array.isArray(slugSegments)
    ? slugSegments.filter(Boolean)
    : slugSegments
      ? [slugSegments]
      : [];
  if (parts[0] !== 'blog' || parts.length < 2) return null;
  return `/blog/${parts.slice(1).join('/')}`;
}

export function resolveLocalePath(locale, slugSegments) {
  if (!isPrefixLocale(locale)) return null;

  const parts = Array.isArray(slugSegments)
    ? slugSegments.filter(Boolean)
    : slugSegments
      ? [slugSegments]
      : [];

  if (parts.length === 0) {
    if (!isPageLocalized('home', locale)) return null;
    return { type: 'home', locale };
  }

  if (parts[0] === 'tools' && parts.length === 3) {
    const tool = resolveLocalizedTool(locale, parts[1], parts[2]);
    if (!tool) return null;
    return {
      type: 'tool',
      locale,
      internalSlug: tool.internalSlug,
      category: tool.category,
      folder: tool.folder,
      categorySlug: tool.categorySlug,
      navId: tool.navId,
      publicSlug: tool.publicSlug,
    };
  }

  const joined = parts.join('/');
  const page = resolveLocalizedPage(locale, joined);
  if (page) return { type: 'page', locale, pageId: page.pageId };
  return null;
}

export function listLocaleStaticParams() {
  const params = [];

  for (const locale of PREFIX_LOCALES) {
    if (isPageLocalized('home', locale)) {
      params.push({ locale, slug: [] });
    }

    for (const [pageId, entry] of Object.entries(LOCALIZED_PAGES)) {
      if (pageId === 'home') continue;
      if (!isPageLocalized(pageId, locale)) continue;
      const slug = entry.slugs[locale];
      if (!slug) continue;
      params.push({ locale, slug: slug.split('/') });
    }
  }

  return params;
}
