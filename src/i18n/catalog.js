/**
 * What is actually published per locale.
 *
 * Every active public tool is available in en/es/fr/de.
 * English seoSlug is the default public slug. Natural localized slugs
 * are applied only where they already exist (see SLUG_OVERRIDES).
 */

import { DEFAULT_LOCALE, ENABLED_LOCALES, isEnabledLocale } from './config.js';
import { listPublicTools } from './registry.js';

export const LOCALIZED_PAGES = {
  home: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: '', es: '', fr: '', de: '' },
  },
  calculators: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'calculators', es: 'calculadoras', fr: 'calculateurs', de: 'rechner' },
    englishPath: '/calculators',
  },
  seo: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'seo', es: 'seo', fr: 'seo', de: 'seo' },
    englishPath: '/seo',
  },
  writing: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'writing', es: 'escritura', fr: 'redaction', de: 'schreiben' },
    englishPath: '/writing',
  },
  study: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'study', es: 'estudio', fr: 'etudes', de: 'lernen' },
    englishPath: '/study',
  },
  freelancer: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'freelancer', es: 'freelance', fr: 'freelance', de: 'freelancing' },
    englishPath: '/freelancer',
  },
  'freelancer-upwork': {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: {
      en: 'freelancer/upwork',
      es: 'freelance/upwork',
      fr: 'freelance/upwork',
      de: 'freelancing/upwork',
    },
    englishPath: '/freelancer/upwork',
  },
  'freelancer-fiverr': {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: {
      en: 'freelancer/fiverr',
      es: 'freelance/fiverr',
      fr: 'freelance/fiverr',
      de: 'freelancing/fiverr',
    },
    englishPath: '/freelancer/fiverr',
  },
  shopee: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'shopee', es: 'shopee', fr: 'shopee', de: 'shopee' },
    englishPath: '/shopee',
  },
  lazada: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'lazada', es: 'lazada', fr: 'lazada', de: 'lazada' },
    englishPath: '/lazada',
  },
  'pdf-utilities': {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: {
      en: 'pdf-utilities',
      es: 'utilidades-pdf',
      fr: 'utilitaires-pdf',
      de: 'pdf-werkzeuge',
    },
    englishPath: '/pdf-utilities',
  },
  contact: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'contact', es: 'contacto', fr: 'contact', de: 'kontakt' },
    englishPath: '/contact',
  },
  'privacy-policy': {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: {
      en: 'privacy-policy',
      es: 'politica-de-privacidad',
      fr: 'politique-de-confidentialite',
      de: 'datenschutz',
    },
    englishPath: '/privacy-policy',
  },
  terms: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'terms', es: 'terminos', fr: 'conditions', de: 'agb' },
    englishPath: '/terms',
  },
  cookies: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'cookies', es: 'cookies', fr: 'cookies', de: 'cookies' },
    englishPath: '/cookies',
  },
  blog: {
    locales: ['en', 'es', 'fr', 'de'],
    slugs: { en: 'blog', es: 'blog', fr: 'blog', de: 'blog' },
    englishPath: '/blog',
  },
};

/** Natural localized slugs. English seoSlug is always the fallback. */
export const SLUG_OVERRIDES = {
  'profit-margin': {
    es: 'calculadora-de-margen-de-beneficio',
    fr: 'calculateur-de-marge-beneficiaire',
    de: 'gewinnmargen-rechner',
  },
  'break-even': {
    es: 'calculadora-de-punto-de-equilibrio',
    fr: 'calculateur-de-seuil-de-rentabilite',
    de: 'break-even-rechner',
  },
  'freelance-hourly-rate': {
    es: 'calculadora-de-tarifa-por-hora-freelance',
    fr: 'calculateur-de-taux-horaire-freelance',
    de: 'freiberufler-stundensatz-rechner',
  },
  'salary-to-hourly': {
    es: 'calculadora-salario-a-tarifa-horaria',
    fr: 'calculateur-salaire-vers-taux-horaire',
    de: 'gehalt-stundensatz-rechner',
  },
  'customer-ltv': {
    es: 'calculadora-de-valor-de-vida-del-cliente',
    fr: 'calculateur-de-valeur-vie-client',
    de: 'kundenlebenswert-rechner',
  },
  'adsense-revenue': {
    es: 'calculadora-de-ingresos-adsense',
    fr: 'calculateur-de-revenus-adsense',
    de: 'adsense-umsatz-rechner',
  },
};

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
