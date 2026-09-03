import Link from 'next/link';
import { Calculator, ArrowRight, BookOpen, ChevronDown, HelpCircle } from 'lucide-react';
import { calculatorTools } from '../../config/calculators/tools';
import { getSeoPath } from '../../config/routes';
import { getPageHreflangLanguages } from '../../i18n/hreflang';

export const metadata = {
  title: 'Free Business Calculators – Freelance, SaaS, Ads & Ecommerce | Zetawala',
  description:
    'Free business and marketing calculators: freelance hourly rates, AI API cost, SaaS pricing, LTV, CAC, break-even, profit margin, Google Ads, AdSense, affiliate, Amazon FBA, Etsy, and eBay fees.',
  keywords: [
    'free business calculators',
    'freelance hourly rate calculator',
    'saas pricing calculator',
    'customer lifetime value calculator',
    'cac calculator',
    'break even calculator',
    'profit margin calculator',
    'google ads roi calculator',
    'adsense revenue calculator',
    'amazon fba profit calculator',
    'ai api cost calculator',
  ],
  alternates: {
    canonical: 'https://zetawala.com/calculators',
    languages: getPageHreflangLanguages('calculators'),
  },
  openGraph: {
    title: 'Free Business Calculators – Freelance, SaaS, Ads & Ecommerce | Zetawala',
    description:
      'Instant deterministic calculators for freelancers, SaaS founders, marketers, and ecommerce sellers—no AI required.',
    url: 'https://zetawala.com/calculators',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Business & Marketing Calculators | Zetawala',
    description:
      'Freelance rates, SaaS pricing, LTV, CAC, ads ROI, AdSense, and ecommerce profit calculators.',
  },
  robots: { index: true, follow: true },
};

const toolPicker = [
  {
    title: 'Price freelance work',
    desc: 'Set sustainable hourly rates and project quotes with tax, expenses, revisions, and contingency buffers.',
    slugs: ['freelance-hourly-rate', 'freelance-project-pricing', 'salary-to-hourly'],
  },
  {
    title: 'Model SaaS & unit economics',
    desc: 'Find subscription prices, LTV, CAC, and break-even points before you scale spend.',
    slugs: ['saas-pricing', 'customer-ltv', 'customer-cac', 'break-even'],
  },
  {
    title: 'Measure marketing ROI',
    desc: 'Project returns from content, Google Ads, email, affiliates, and AdSense traffic.',
    slugs: ['content-marketing-roi', 'google-ads-profit', 'email-marketing-roi', 'affiliate-earnings', 'adsense-revenue'],
  },
  {
    title: 'Check ecommerce margins',
    desc: 'Net profit after product cost, shipping, ads, and marketplace fees on Amazon, Etsy, and eBay.',
    slugs: ['ecommerce-profit', 'amazon-fba-profit', 'etsy-fee-profit', 'ebay-fee', 'profit-margin'],
  },
];

const learningTopics = [
  {
    title: 'Why rates beat guesswork',
    body: 'Underpricing freelancers often ignore taxes, non-billable time, and expenses. A clear hourly floor protects cash flow.',
  },
  {
    title: 'LTV vs CAC',
    body: 'Healthy growth usually needs LTV meaningfully above CAC. Pair both calculators before scaling paid acquisition.',
  },
  {
    title: 'Marketplace fee drag',
    body: 'Amazon, Etsy, and eBay fees compound with shipping and ads. Model net profit per unit before listing volume.',
  },
  {
    title: 'AI API budgeting',
    body: 'Token prices look small per request but scale with daily volume. Estimate monthly and yearly spend before launch.',
  },
];

const categoryFaqs = [
  {
    q: 'What is the Calculators suite on ZetaWala?',
    a: 'It is a suite of 18 free deterministic calculators for freelancers, SaaS founders, marketers, and ecommerce sellers. Every result is computed from formulas in the browser—no DeepSeek or LLM calls.',
  },
  {
    q: 'Do these calculators use AI?',
    a: 'No. All math runs locally from your inputs. AI provider rates in the API cost calculator are published estimate tables only.',
  },
  {
    q: 'Which calculator should I start with?',
    a: 'Freelancers should start with the Hourly Rate or Project Pricing calculator. SaaS founders often begin with SaaS Pricing, LTV, and CAC. Sellers should open Ecommerce, Amazon FBA, Etsy, or eBay profit tools.',
  },
  {
    q: 'Are results guaranteed accurate?',
    a: 'They are transparent estimates from standard business formulas. Always verify fees, tax rules, and ad metrics with your own accounts.',
  },
  {
    q: 'Where can I read related guides?',
    a: 'Visit the Calculators blog section for pricing, ROI, and ecommerce margin guides.',
  },
];

export default function CalculatorsCategoryPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30 flex items-center justify-center shrink-0">
          <Calculator className="w-6 h-6 text-violet-600 dark:text-violet-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Business & Marketing Calculators
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium">
          Instant freelance rates, SaaS pricing, LTV, CAC, ads ROI, AdSense, affiliate earnings, and marketplace profit math—18 free tools with deterministic formulas and no AI dependency.
        </p>
        <div className="pt-2">
          <Link
            href={getSeoPath('calculators', 'freelance-hourly-rate')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition-colors"
          >
            Open Freelance Rate Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">All Calculators</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">18 tools for pricing, unit economics, marketing ROI, and ecommerce margins.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculatorTools.map((tool) => (
            <Link
              key={tool.slug}
              href={getSeoPath('calculators', tool.slug)}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-violet-500/30 dark:hover:border-violet-500/20 transition-all group"
            >
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Choose the Right Calculator</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Match your goal to the right starting point in the suite.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {toolPicker.map((block) => (
            <div
              key={block.title}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4"
            >
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">{block.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{block.desc}</p>
              </div>
              <ul className="space-y-1.5">
                {block.slugs.map((slug) => {
                  const tool = calculatorTools.find((t) => t.slug === slug);
                  if (!tool) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={getSeoPath('calculators', slug)}
                        className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        {tool.name} →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-500" />
              Pricing & ROI Learning
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core concepts behind the calculator toolkit.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {learningTopics.map((topic) => (
              <div
                key={topic.title}
                className="p-6 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl"
              >
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">{topic.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{topic.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link
              href="/blog/calculators"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Read Calculators blog guides
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Common questions about the Calculators suite.</p>
        </div>
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {categoryFaqs.map((faq, idx) => (
            <details key={idx} className="group transition-all">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/45 select-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2 pr-4">
                  <HelpCircle className="w-4 h-4 text-violet-500 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="px-6 pb-6 pt-1">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-350 leading-relaxed font-medium">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
