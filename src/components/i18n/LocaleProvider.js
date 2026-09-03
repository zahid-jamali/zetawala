'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { DEFAULT_LOCALE, getLocaleMeta } from '../../i18n/config';
import { getCommonDictionary } from '../../i18n/commonDictionaries';
import { getLocaleFromPathname } from '../../i18n/urls';
import { createTranslator } from '../../i18n/t';

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  dict: {},
  t: (path) => path,
  pathname: '/',
});

/**
 * Read locale from the current URL. Do not trust a locale passed through
 * the root layout — that layout does not re-render on client navigations.
 */
export function useCurrentLocale() {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPathname(pathname);
  const dict = getCommonDictionary(locale);
  const t = useMemo(() => createTranslator(dict), [dict]);
  return { locale, dict, t, pathname };
}

export function LocaleProvider({ children }) {
  const { locale, dict, t, pathname } = useCurrentLocale();

  useEffect(() => {
    const meta = getLocaleMeta(locale);
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.setAttribute('data-locale', locale);
  }, [locale]);

  const value = useMemo(
    () => ({ locale, dict, t, pathname }),
    [locale, dict, t, pathname]
  );

  return (
    <LocaleContext.Provider value={value}>
      {/* Remount chrome when the URL locale changes so nav hrefs cannot stay English. */}
      <div key={locale} className="contents">
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT() {
  return useLocale().t;
}
