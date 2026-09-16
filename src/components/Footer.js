'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrentLocale } from './i18n/LocaleProvider';
import { getHomePath, getLocalizedPagePath, getLocalizedToolPath } from '../i18n/paths';

export default function Footer() {
  const { locale, t } = useCurrentLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 md:px-8 text-slate-500 dark:text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-full min-w-0">
        
        <div className="space-y-4">
          <span className="font-bold text-slate-900 dark:text-white text-lg">{t('brand')}</span>
          <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{t('footer.workspace')}</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href={getLocalizedToolPath(locale, 'youtube', 'niche-finder')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.youtube')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedToolPath(locale, 'daraz', 'product-hunting')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.daraz')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedToolPath(locale, 'local-commerce', 'whatsapp-broadcast')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.whatsapp')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'seo')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.seo')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'calculators')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.calculators')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'pdf-utilities')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.pdf')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'writing')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.writing')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'study')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.study')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'freelancer')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.freelancer')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'shopee')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.shopee')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'lazada')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.lazada')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{t('footer.platform')}</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href={getLocalizedPagePath(locale, 'blog')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.blog')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.contact')}
              </Link>
            </li>
            <li>
              <Link href={getHomePath(locale)} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.home')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{t('footer.legal')}</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href={getLocalizedPagePath(locale, 'privacy-policy')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'terms')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
            </li>
            <li>
              <Link href={getLocalizedPagePath(locale, 'cookies')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {t('footer.cookies')}
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500 w-full max-w-full min-w-0">
        <p className="text-center sm:text-left">{t('footer.copyright', { year })}</p>
        <p className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-center">
          <span>{t('footer.authority')}</span>
          <span>&middot;</span>
          <span>{t('footer.growth')}</span>
        </p>
      </div>
    </footer>
  );
}
