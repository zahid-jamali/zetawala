/**
 * Locale-aware path builders, including English tools that are not yet
 * in the localization catalog (those still use getSeoPath).
 */

import { getSeoPath } from '../config/routes';
import { absoluteUrl, getCatalogToolPath } from './urls.js';

export {
  absoluteUrl,
  getCatalogToolPath,
  getHomePath,
  getLocaleFromPathname,
  getLocalizedPagePath,
  getLocalizedPageUrl,
  stripLocalePrefix,
  stripTrailingSlash,
} from './urls.js';

export function getLocalizedToolPath(locale, category, internalSlug) {
  const catalogPath = getCatalogToolPath(locale, internalSlug);
  if (catalogPath) return catalogPath;
  return getSeoPath(category, internalSlug);
}

export function getLocalizedToolUrl(locale, category, internalSlug) {
  return absoluteUrl(getLocalizedToolPath(locale, category, internalSlug));
}
