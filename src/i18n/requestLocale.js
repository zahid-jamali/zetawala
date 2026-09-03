/**
 * Request-time locale from the middleware `x-locale` header.
 * Used only in the root layout for `html lang` / `data-locale`.
 */

import { headers } from 'next/headers';
import { DEFAULT_LOCALE, isEnabledLocale } from './config.js';

export async function getRequestLocale() {
  try {
    const headerStore = await headers();
    const value = headerStore.get('x-locale');
    if (value && isEnabledLocale(value)) return value;
  } catch {
    // Static rendering / tests without a request.
  }
  return DEFAULT_LOCALE;
}
