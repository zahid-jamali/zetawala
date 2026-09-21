/**
 * Chrome dictionaries (nav, footer, switcher, search).
 * Loaded together because the root layout does not re-render on client
 * navigation — the language switcher must be able to swap chrome copy
 * from the current URL without waiting for a new server layout payload.
 */

import en from '../locales/en/common.json';
import es from '../locales/es/common.json';
import fr from '../locales/fr/common.json';
import de from '../locales/de/common.json';
import id from '../locales/id/common.json';
import vi from '../locales/vi/common.json';
import cs from '../locales/cs/common.json';
import hu from '../locales/hu/common.json';
import ro from '../locales/ro/common.json';
import pt from '../locales/pt/common.json';
import { DEFAULT_LOCALE, isEnabledLocale } from './config.js';

export const COMMON_DICTIONARIES = {
  en,
  es,
  fr,
  de,
  id,
  vi,
  cs,
  hu,
  ro,
  pt,
};

export function getCommonDictionary(locale) {
  const code = isEnabledLocale(locale) ? locale : DEFAULT_LOCALE;
  return COMMON_DICTIONARIES[code] || COMMON_DICTIONARIES[DEFAULT_LOCALE] || {};
}
