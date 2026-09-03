import Link from 'next/link';
import { Calculator, ArrowRight, BookOpen, ChevronDown, HelpCircle } from 'lucide-react';
import { calculatorTools } from '../../config/calculators/tools';
import { createTranslator } from '../../i18n/t';
import { getLocalizedToolPath } from '../../i18n/paths';
import { isToolLocalized } from '../../i18n/catalog';

const toolPicker = [
  {
    titleKey: 'picker.freelance',
    slugs: ['freelance-hourly-rate', 'freelance-project-pricing', 'salary-to-hourly'],
  },
  {
    titleKey: 'picker.saas',
    slugs: ['saas-pricing', 'customer-ltv', 'customer-cac', 'break-even'],
  },
  {
    titleKey: 'picker.marketing',
    slugs: ['content-marketing-roi', 'google-ads-profit', 'email-marketing-roi', 'affiliate-earnings', 'adsense-revenue'],
  },
  {
    titleKey: 'picker.ecommerce',
    slugs: ['ecommerce-profit', 'amazon-fba-profit', 'etsy-fee-profit', 'ebay-fee', 'profit-margin'],
  },
];

const pickerCopy = {
  en: {
    freelance: { title: 'Price freelance work', desc: 'Set sustainable hourly rates and project quotes with tax, expenses, revisions, and contingency buffers.' },
    saas: { title: 'Model SaaS & unit economics', desc: 'Find subscription prices, LTV, CAC, and break-even points before you scale spend.' },
    marketing: { title: 'Measure marketing ROI', desc: 'Project returns from content, Google Ads, email, affiliates, and AdSense traffic.' },
    ecommerce: { title: 'Check ecommerce margins', desc: 'Net profit after product cost, shipping, ads, and marketplace fees on Amazon, Etsy, and eBay.' },
  },
  es: {
    freelance: { title: 'Precia trabajo freelance', desc: 'Define tarifas horarias y presupuestos de proyecto con impuestos, gastos y colchón.' },
    saas: { title: 'Modela SaaS y unit economics', desc: 'Precio de suscripción, LTV, CAC y punto de equilibrio antes de escalar gasto.' },
    marketing: { title: 'Mide el ROI de marketing', desc: 'Proyecta retorno de contenido, Google Ads, email, afiliados y AdSense.' },
    ecommerce: { title: 'Revisa márgenes ecommerce', desc: 'Beneficio neto tras coste, envío, anuncios y comisiones de Amazon, Etsy y eBay.' },
  },
  fr: {
    freelance: { title: 'Tarifer le freelance', desc: 'Fixez des taux horaires et devis projet avec impôts, charges et marge de sécurité.' },
    saas: { title: 'Modéliser SaaS et unit economics', desc: 'Prix d’abonnement, LTV, CAC et seuil de rentabilité avant d’augmenter les dépenses.' },
    marketing: { title: 'Mesurer le ROI marketing', desc: 'Projetez le retour contenu, Google Ads, e-mail, affiliation et AdSense.' },
    ecommerce: { title: 'Vérifier les marges e-commerce', desc: 'Profit net après coût, livraison, pubs et commissions Amazon, Etsy et eBay.' },
  },
  de: {
    freelance: { title: 'Freelance-Arbeit preisen', desc: 'Nachhaltige Stundensätze und Projektangebote mit Steuern, Kosten und Puffer.' },
    saas: { title: 'SaaS und Unit Economics modellieren', desc: 'Abo-Preis, LTV, CAC und Break-even, bevor Sie Spend skalieren.' },
    marketing: { title: 'Marketing-ROI messen', desc: 'Ertrag aus Content, Google Ads, E-Mail, Affiliates und AdSense projizieren.' },
    ecommerce: { title: 'E-Commerce-Margen prüfen', desc: 'Nettogewinn nach Kosten, Versand, Ads und Gebühren bei Amazon, Etsy und eBay.' },
  },
};

export default function LocalizedCalculatorsHub({ locale, dict, toolNames = {} }) {
  const t = createTranslator(dict);
  const faqs = dict.faqs?.items || [];
  const topics = dict.learning?.topics || [];
  const picker = pickerCopy[locale] || pickerCopy.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const displayTool = (slug) => {
    const tool = calculatorTools.find((item) => item.slug === slug);
    const name = toolNames[slug]?.name || tool?.name || slug;
    return {
      slug,
      name,
      desc: toolNames[slug]?.desc || tool?.desc || '',
      href: getLocalizedToolPath(locale, 'calculators', slug),
      isLocalized: isToolLocalized(slug, locale),
    };
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100">
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30 flex items-center justify-center shrink-0">
          <Calculator className="w-6 h-6 text-violet-600 dark:text-violet-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          {t('hero.subtitle')}
        </p>
        <div className="pt-2">
          <Link
            href={getLocalizedToolPath(locale, 'calculators', 'freelance-hourly-rate')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition-colors"
          >
            {t('hero.cta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{t('grid.title')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('grid.subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculatorTools.map((tool) => {
            const card = displayTool(tool.slug);
            return (
              <Link
                key={tool.slug}
                href={card.href}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-violet-500/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400">
                    {card.name}
                  </h3>
                  {card.isLocalized && locale !== 'en' && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-300 shrink-0">
                      {t('grid.localizedBadge')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{card.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{t('pickerTitle')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('pickerSubtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {toolPicker.map((block) => {
            const copy = picker[block.titleKey.split('.')[1]];
            if (!copy) return null;
            return (
              <div
                key={block.titleKey}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4"
              >
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">{copy.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{copy.desc}</p>
                </div>
                <ul className="space-y-1.5">
                  {block.slugs.map((slug) => {
                    const card = displayTool(slug);
                    return (
                      <li key={slug}>
                        <Link href={card.href} className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline">
                          {card.name} →
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-500" />
              {t('learning.title')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('learning.subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <div key={topic.title} className="p-6 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">{topic.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{topic.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link href="/blog/calculators" className="inline-flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline">
              {t('learning.blogCta')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{t('faqs.title')}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('faqs.subtitle')}</p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {faqs.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800/45 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 pr-4">
                  <HelpCircle className="w-4 h-4 text-violet-500 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="px-6 pb-6 pt-1">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
