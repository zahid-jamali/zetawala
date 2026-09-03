import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, ArrowRight, Calculator, Video, ShoppingBag, Search } from 'lucide-react';
import ToolSearch from '../layout/ToolSearch';
import { DEFAULT_LOCALE } from '../../i18n/config';
import { createTranslator } from '../../i18n/t';
import { getHomePath, getLocalizedPagePath, getLocalizedToolPath } from '../../i18n/paths';

function suiteHref(locale, item) {
  if (item.hrefKey) return getLocalizedPagePath(locale, item.hrefKey);
  if (item.pageId) return getLocalizedPagePath(locale, item.pageId);
  if (item.toolSlug) return getLocalizedToolPath(locale, item.category || item.id, item.toolSlug);
  if (item.href) {
    if (locale === DEFAULT_LOCALE) return item.href;
    return `/${locale}${item.href}`;
  }
  return getHomePath(locale);
}

const FEATURED_TOOLS = [
  'profit-margin',
  'break-even',
  'freelance-hourly-rate',
  'salary-to-hourly',
  'customer-ltv',
  'adsense-revenue',
];

const suiteIcons = {
  youtube: Video,
  daraz: ShoppingBag,
  seo: Search,
  calculators: Calculator,
};

export default function LocalizedHome({ locale, dict, toolNames = {} }) {
  const t = createTranslator(dict);
  const faqs = dict.faqs?.items || [];
  const suites = dict.suites?.items || [];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="relative px-6 py-28 text-center max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>{t('hero.badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] max-w-4xl mx-auto">
          {t('hero.titleBefore')}{' '}
          <span className="text-sky-600 dark:text-sky-400">{t('hero.titleAccent')}</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          {t('hero.subtitle')}
        </p>

        <div className="w-full pt-2 pb-2">
          <ToolSearch variant="hero" />
          <p className="mt-2.5 text-[11px] text-slate-400 font-medium">{t('hero.searchHint')}</p>
        </div>

        <div className="pt-2 pb-12">
          <a
            href="#workspace-portfolio"
            className="px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all shadow-lg shadow-sky-500/10 hover:scale-[1.01] inline-flex items-center gap-2 cursor-pointer border border-transparent"
          >
            {t('hero.cta')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-2 shadow-xl backdrop-blur-md">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
            <Image
              src="/images/dashboard_mockup.png"
              alt={t('hero.mockupAlt')}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-w-4xl) 100vw"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('localizedTools.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            {t('localizedTools.subtitle')}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_TOOLS.map((slug) => {
            const name = toolNames[slug]?.name || slug;
            const desc = toolNames[slug]?.desc || '';
            return (
              <Link
                key={slug}
                href={getLocalizedToolPath(locale, 'calculators', slug)}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-violet-500/30 transition-all group"
              >
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                  {name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
              </Link>
            );
          })}
        </div>
        <div className="text-center">
          <Link
            href={getLocalizedPagePath(locale, 'calculators')}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline"
          >
            {t('localizedTools.viewAll')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <section id="workspace-portfolio" className="max-w-6xl mx-auto px-6 py-20 space-y-12 scroll-mt-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('suites.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            {t('suites.subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {suites.map((item) => {
            const Icon = suiteIcons[item.id] || Calculator;
            const href = suiteHref(locale, item);
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.body}</p>
                  </div>
                </div>
                <div className="pt-8">
                  <Link
                    href={href}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    {item.cta}
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white text-center">
          {t('faqs.title')}
        </h2>
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {faqs.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800/45 [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{faq.q}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
