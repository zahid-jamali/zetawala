import { PREFIX_LOCALES } from './config.js';
import { LOCALIZED_PAGES, LOCALIZED_TOOLS, isPageLocalized, isToolLocalized } from './catalog.js';
import { getPageHreflangLanguages, getToolHreflangLanguages } from './hreflang.js';
import { absoluteUrl, getCatalogToolPath, getLocalizedPagePath } from './urls.js';

export function listLocalizedSitemapEntries(now = new Date().toISOString()) {
  const entries = [];
  const seen = new Set();

  function push(url, languages, priority, changeFrequency = 'weekly') {
    if (!url || seen.has(url)) return;
    seen.add(url);
    entries.push({
      url,
      lastModified: now,
      changeFrequency,
      priority,
      ...(languages ? { alternates: { languages } } : {}),
    });
  }

  for (const locale of PREFIX_LOCALES) {
    if (isPageLocalized('home', locale)) {
      push(
        absoluteUrl(getLocalizedPagePath(locale, 'home')),
        getPageHreflangLanguages('home'),
        0.9,
        'daily'
      );
    }

    for (const pageId of Object.keys(LOCALIZED_PAGES)) {
      if (pageId === 'home') continue;
      if (!isPageLocalized(pageId, locale)) continue;
      push(
        absoluteUrl(getLocalizedPagePath(locale, pageId)),
        getPageHreflangLanguages(pageId),
        0.85
      );
    }

    for (const [internalSlug] of Object.entries(LOCALIZED_TOOLS)) {
      if (!isToolLocalized(internalSlug, locale)) continue;
      const path = getCatalogToolPath(locale, internalSlug);
      if (!path) continue;
      push(absoluteUrl(path), getToolHreflangLanguages(internalSlug), 0.8);
    }
  }

  return entries;
}
