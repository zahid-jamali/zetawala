/**
 * Central locale registry.
 *
 * English is the default and stays unprefixed (existing live URLs).
 * Prefix locales are added here — routing, sitemap, and the switcher
 * all read from this file so a new language does not require a refactor.
 */

export const SITE_URL = 'https://www.zetawala.com';

export const DEFAULT_LOCALE = 'en';

/** All locales the platform knows about (including those not yet enabled). */
export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'id', 'vi', 'cs', 'hu', 'ro', 'pt'];

/**
 * Locales that currently expose public, indexable URLs.
 * Keep this in sync with translated content — never enable a locale
 * that would serve English copy under a translated URL.
 */
export const ENABLED_LOCALES = ['en', 'es', 'fr', 'de', 'id', 'vi', 'cs', 'hu', 'ro', 'pt'];

/** Non-default locales that use a URL prefix (`/es`, `/fr`, `/de`, `/id`, `/vi`, `/cs`, `/hu`, `/ro`, `/pt`). */
export const PREFIX_LOCALES = ENABLED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

export const LOCALE_META = {
  en: {
    code: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
    dir: 'ltr',
    nativeName: 'English',
    englishName: 'English',
    hreflang: 'en',
  },
  es: {
    code: 'es',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    dir: 'ltr',
    nativeName: 'Español',
    englishName: 'Spanish',
    hreflang: 'es',
  },
  fr: {
    code: 'fr',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    dir: 'ltr',
    nativeName: 'Français',
    englishName: 'French',
    hreflang: 'fr',
  },
  de: {
    code: 'de',
    htmlLang: 'de',
    ogLocale: 'de_DE',
    dir: 'ltr',
    nativeName: 'Deutsch',
    englishName: 'German',
    hreflang: 'de',
  },
  id: {
    code: 'id',
    htmlLang: 'id',
    ogLocale: 'id_ID',
    dir: 'ltr',
    nativeName: 'Bahasa Indonesia',
    englishName: 'Indonesian',
    hreflang: 'id',
  },
  vi: {
    code: 'vi',
    htmlLang: 'vi',
    ogLocale: 'vi_VN',
    dir: 'ltr',
    nativeName: 'Tiếng Việt',
    englishName: 'Vietnamese',
    hreflang: 'vi',
  },
  cs: {
    code: 'cs',
    htmlLang: 'cs',
    ogLocale: 'cs_CZ',
    dir: 'ltr',
    nativeName: 'Čeština',
    englishName: 'Czech',
    hreflang: 'cs',
  },
  hu: {
    code: 'hu',
    htmlLang: 'hu',
    ogLocale: 'hu_HU',
    dir: 'ltr',
    nativeName: 'Magyar',
    englishName: 'Hungarian',
    hreflang: 'hu',
  },
  ro: {
    code: 'ro',
    htmlLang: 'ro',
    ogLocale: 'ro_RO',
    dir: 'ltr',
    nativeName: 'Română',
    englishName: 'Romanian',
    hreflang: 'ro',
  },
  pt: {
    code: 'pt',
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    dir: 'ltr',
    nativeName: 'Português (Brasil)',
    englishName: 'Portuguese (Brazil)',
    hreflang: 'pt-BR',
  },
};

export function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

export function isEnabledLocale(locale) {
  return ENABLED_LOCALES.includes(locale);
}

export function isPrefixLocale(locale) {
  return PREFIX_LOCALES.includes(locale);
}

export function isDefaultLocale(locale) {
  return locale === DEFAULT_LOCALE;
}

export function normalizeLocale(value) {
  const locale = String(value || '').toLowerCase().split('-')[0];
  return isEnabledLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getLocaleMeta(locale) {
  return LOCALE_META[locale] || LOCALE_META[DEFAULT_LOCALE];
}

export function getEnabledPrefixLocales() {
  return PREFIX_LOCALES.slice();
}
