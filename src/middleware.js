import { NextResponse } from 'next/server';
import { DEFAULT_LOCALE, PREFIX_LOCALES } from './i18n/config';

/**
 * Locale middleware.
 *
 * - Does NOT redirect based on Accept-Language (crawlers need stable URLs).
 * - Redirects `/en` and `/en/...` to unprefixed English URLs (duplicate-SEO guard).
 * - Sets `x-locale` for the root layout `html lang` attribute.
 */

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/').filter(Boolean)[0] || '';

  if (first === 'en') {
    const url = request.nextUrl.clone();
    const rest = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    url.pathname = rest === '' ? '/' : rest;
    return NextResponse.redirect(url, 308);
  }

  const locale = PREFIX_LOCALES.includes(first) ? first : DEFAULT_LOCALE;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
