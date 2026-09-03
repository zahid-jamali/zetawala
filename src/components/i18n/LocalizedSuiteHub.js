import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronDown, HelpCircle } from 'lucide-react';
import { createTranslator } from '../../i18n/t';
import { getLocalizedToolPath } from '../../i18n/paths';
import { listPublicTools } from '../../i18n/registry';

const ACCENT = {
  seo: { wrap: 'bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900/30', icon: 'text-sky-600 dark:text-sky-400' },
  writing: { wrap: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30', icon: 'text-indigo-600 dark:text-indigo-400' },
  study: { wrap: 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-100 dark:border-cyan-900/30', icon: 'text-cyan-600 dark:text-cyan-400' },
  freelancer: { wrap: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30', icon: 'text-emerald-600 dark:text-emerald-400' },
  'freelancer-upwork': { wrap: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30', icon: 'text-emerald-600 dark:text-emerald-400' },
  'freelancer-fiverr': { wrap: 'bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30', icon: 'text-green-600 dark:text-green-400' },
  shopee: { wrap: 'bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30', icon: 'text-orange-600 dark:text-orange-400' },
  lazada: { wrap: 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30', icon: 'text-blue-600 dark:text-blue-400' },
  'pdf-utilities': { wrap: 'bg-teal-50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900/30', icon: 'text-teal-600 dark:text-teal-400' },
};

export default function LocalizedSuiteHub({ locale, pageId, dict, toolNames = {}, Icon }) {
  const t = createTranslator(dict);
  const faqs = dict.faqs?.items || [];
  const topics = dict.learning?.topics || [];
  const picker = dict.picker?.items || [];
  const accent = ACCENT[pageId] || ACCENT.seo;
  const filteredTools = listPublicTools().filter((tool) => {
    if (pageId === 'freelancer-upwork') return tool.internalSlug.startsWith('upwork-');
    if (pageId === 'freelancer-fiverr') return tool.internalSlug.startsWith('fiverr-');
    if (pageId === 'pdf-utilities') return tool.navId === 'pdf';
    return tool.navId === pageId;
  });

  const display = (slug) => ({
    name: toolNames[slug]?.name || slug,
    desc: toolNames[slug]?.desc || '',
    href: getLocalizedToolPath(locale, filteredTools.find((item) => item.internalSlug === slug)?.routeKey || pageId, slug),
  });

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
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100">
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${accent.wrap}`}>
            <Icon className={`w-6 h-6 ${accent.icon}`} />
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">{t('hero.title')}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">{t('hero.subtitle')}</p>
        {filteredTools[0] && (
          <Link
            href={display(filteredTools[0].internalSlug).href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs"
          >
            {t('hero.cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold">{t('grid.title')}</h2>
          <p className="text-xs text-slate-500 font-medium">{t('grid.subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => {
            const card = display(tool.internalSlug);
            return (
              <Link
                key={tool.internalSlug}
                href={card.href}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-sky-500/30 transition-all group"
              >
                <h3 className="text-sm font-extrabold mb-1 group-hover:text-sky-600">{card.name || tool.name}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{card.desc || tool.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {picker.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold">{t('picker.title')}</h2>
            <p className="text-xs text-slate-500 font-medium">{t('picker.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {picker.map((block) => (
              <div key={block.title} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold mb-1">{block.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{block.desc}</p>
                </div>
                <ul className="space-y-1.5">
                  {(block.slugs || []).map((slug) => {
                    const card = display(slug);
                    return (
                      <li key={slug}>
                        <Link href={card.href} className="text-[11px] font-bold text-sky-600 hover:underline">
                          {card.name || slug} →
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {topics.length > 0 && (
        <section className="bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-500" />
                {t('learning.title')}
              </h2>
              <p className="text-xs text-slate-500 font-medium">{t('learning.subtitle')}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div key={topic.title} className="p-6 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl">
                  <h3 className="text-sm font-extrabold mb-2">{topic.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{topic.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-20 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold">{t('faqs.title')}</h2>
            <p className="text-xs text-slate-500 font-medium">{t('faqs.subtitle')}</p>
          </div>
          <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
            {faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2 pr-4">
                    <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
