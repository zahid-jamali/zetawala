'use client';

import { useCurrentLocale } from '../components/i18n/LocaleProvider';
import { getLocalizedPagePath, getLocalizedToolPath } from './paths';

export function useLocalizedHref() {
  const { locale } = useCurrentLocale();
  return {
    locale,
    toolHref: (category, slug) => getLocalizedToolPath(locale, category, slug),
    page: (pageId) => getLocalizedPagePath(locale, pageId),
  };
}
