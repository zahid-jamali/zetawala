/**
 * Server-side dictionary loader.
 */

import { DEFAULT_LOCALE, isEnabledLocale } from './config.js';
import { seoData } from '../config/seo/index.js';
import { getPublicTool } from './registry.js';

const loaders = {
  common: {
    en: () => import('../locales/en/common.json'),
    es: () => import('../locales/es/common.json'),
    fr: () => import('../locales/fr/common.json'),
    de: () => import('../locales/de/common.json'),
  },
  home: {
    en: () => import('../locales/en/home.json'),
    es: () => import('../locales/es/home.json'),
    fr: () => import('../locales/fr/home.json'),
    de: () => import('../locales/de/home.json'),
  },
  'calculators-hub': {
    en: () => import('../locales/en/calculators-hub.json'),
    es: () => import('../locales/es/calculators-hub.json'),
    fr: () => import('../locales/fr/calculators-hub.json'),
    de: () => import('../locales/de/calculators-hub.json'),
  },
  hubs: {
    en: () => import('../locales/en/hubs.json'),
    es: () => import('../locales/es/hubs.json'),
    fr: () => import('../locales/fr/hubs.json'),
    de: () => import('../locales/de/hubs.json'),
  },
  legal: {
    en: () => import('../locales/en/legal.json'),
    es: () => import('../locales/es/legal.json'),
    fr: () => import('../locales/fr/legal.json'),
    de: () => import('../locales/de/legal.json'),
  },
  contact: {
    en: () => import('../locales/en/contact.json'),
    es: () => import('../locales/es/contact.json'),
    fr: () => import('../locales/fr/contact.json'),
    de: () => import('../locales/de/contact.json'),
  },
  blog: {
    en: () => import('../locales/en/blog.json'),
    es: () => import('../locales/es/blog.json'),
    fr: () => import('../locales/fr/blog.json'),
    de: () => import('../locales/de/blog.json'),
  },
  'tool-copy': {
    en: () => import('../locales/en/tool-copy.json'),
    es: () => import('../locales/es/tool-copy.json'),
    fr: () => import('../locales/fr/tool-copy.json'),
    de: () => import('../locales/de/tool-copy.json'),
  },
  'tools/profit-margin': {
    en: () => import('../locales/en/tools/profit-margin.json'),
    es: () => import('../locales/es/tools/profit-margin.json'),
    fr: () => import('../locales/fr/tools/profit-margin.json'),
    de: () => import('../locales/de/tools/profit-margin.json'),
  },
  'tools/break-even': {
    en: () => import('../locales/en/tools/break-even.json'),
    es: () => import('../locales/es/tools/break-even.json'),
    fr: () => import('../locales/fr/tools/break-even.json'),
    de: () => import('../locales/de/tools/break-even.json'),
  },
  'tools/freelance-hourly-rate': {
    en: () => import('../locales/en/tools/freelance-hourly-rate.json'),
    es: () => import('../locales/es/tools/freelance-hourly-rate.json'),
    fr: () => import('../locales/fr/tools/freelance-hourly-rate.json'),
    de: () => import('../locales/de/tools/freelance-hourly-rate.json'),
  },
  'tools/salary-to-hourly': {
    en: () => import('../locales/en/tools/salary-to-hourly.json'),
    es: () => import('../locales/es/tools/salary-to-hourly.json'),
    fr: () => import('../locales/fr/tools/salary-to-hourly.json'),
    de: () => import('../locales/de/tools/salary-to-hourly.json'),
  },
  'tools/customer-ltv': {
    en: () => import('../locales/en/tools/customer-ltv.json'),
    es: () => import('../locales/es/tools/customer-ltv.json'),
    fr: () => import('../locales/fr/tools/customer-ltv.json'),
    de: () => import('../locales/de/tools/customer-ltv.json'),
  },
  'tools/adsense-revenue': {
    en: () => import('../locales/en/tools/adsense-revenue.json'),
    es: () => import('../locales/es/tools/adsense-revenue.json'),
    fr: () => import('../locales/fr/tools/adsense-revenue.json'),
    de: () => import('../locales/de/tools/adsense-revenue.json'),
  },
};

async function loadRaw(locale, namespace) {
  const group = loaders[namespace];
  if (!group) return {};
  const load = group[locale] || group[DEFAULT_LOCALE];
  if (!load) return {};
  const mod = await load();
  return mod.default || mod || {};
}

export function buildEnglishToolCopy(slug) {
  const tool = getPublicTool(slug);
  const seo = seoData[slug] || {};
  return {
    name: tool?.name || slug,
    desc: tool?.desc || '',
    metadata: {
      title: seo.title || `${tool?.name || slug} | Zetawala`,
      description: seo.description || tool?.desc || '',
      keywords: seo.keywords || [],
    },
    seo: {
      title: seo.title || tool?.name || slug,
      description: seo.description || tool?.desc || '',
      example: seo.example || null,
      faqs: seo.faqs || [],
    },
  };
}

export async function getDictionary(locale, namespace) {
  const code = isEnabledLocale(locale) ? locale : DEFAULT_LOCALE;
  if (namespace.startsWith('hub-')) {
    const hubs = await loadRaw(code, 'hubs');
    return hubs[namespace.slice(4)] || {};
  }
  if (namespace.startsWith('legal-')) {
    const legal = await loadRaw(code, 'legal');
    return legal[namespace.slice(6)] || {};
  }
  const dict = await loadRaw(code, namespace);
  if (code !== DEFAULT_LOCALE && (!dict || !Object.keys(dict).length)) {
    return loadRaw(DEFAULT_LOCALE, namespace);
  }
  return dict;
}

export async function getToolDictionary(locale, internalSlug) {
  const english = buildEnglishToolCopy(internalSlug);
  const perTool = await getDictionary(locale, `tools/${internalSlug}`);
  if (perTool && Object.keys(perTool).length) return { ...english, ...perTool };

  const pack = await getDictionary(locale, 'tool-copy');
  const overlay = pack?.[internalSlug];
  if (!overlay) return english;
  return {
    ...english,
    ...overlay,
    metadata: { ...english.metadata, ...(overlay.metadata || {}) },
    seo: { ...english.seo, ...(overlay.seo || {}) },
  };
}

export function hasDictionaryNamespace(namespace) {
  return Boolean(loaders[namespace]) || namespace.startsWith('hub-') || namespace.startsWith('legal-');
}
