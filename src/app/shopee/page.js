import Link from 'next/link';
import { Store, ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { shopeeTools } from '../../config/shopee/tools';
import { getSeoPath } from '../../config/routes';

export const metadata = {
  title: 'Free Shopee Seller Toolkit – Listing SEO Profit Fees | Zetawala',
  description:
    'Free Shopee seller tools: listing titles, descriptions, keywords, SEO analyzer, profit/fee/pricing/shipping calculators, chat replies, and listing optimizer.',
  alternates: { canonical: 'https://www.zetawala.com/shopee' },
  openGraph: {
    title: 'Free Shopee Seller Toolkit | Zetawala',
    description: 'Listing SEO, profit math, shipping estimates, and chat replies for Shopee sellers.',
    url: 'https://www.zetawala.com/shopee',
    siteName: 'Zetawala',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ShopeeHubPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100">
      <section className="px-6 py-16 text-center max-w-4xl mx-auto space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center">
          <Store className="w-6 h-6 text-orange-600" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Shopee Seller Toolkit</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Optimize Shopee listings, keywords, margins, fees, shipping, and customer chat—AI where it helps, instant math where it matters.
        </p>
        <Link href={getSeoPath('shopee', 'shopee-listing-title-generator')} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs">
          Open Title Generator <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <h2 className="text-xl font-extrabold text-center">All Shopee Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shopeeTools.map((tool) => (
            <Link key={tool.slug} href={getSeoPath('shopee', tool.slug)} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-orange-500/30 group">
              <h3 className="text-sm font-extrabold mb-1 group-hover:text-orange-600">{tool.name}</h3>
              <p className="text-[11px] text-slate-500 font-medium">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-16 space-y-4">
        <h2 className="text-xl font-extrabold text-center">Marketplace Tips</h2>
        {[
          { q: 'How should I start?', a: 'Generate keywords, craft a title and description, run the SEO analyzer, then check profit and pricing before publishing.' },
          { q: 'Are fee % values fixed?', a: 'No. Fee calculator inputs are configurable because Shopee fees vary by region and category.' },
        ].map((faq, i) => (
          <details key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
            <summary className="px-5 py-4 flex justify-between cursor-pointer list-none font-bold text-sm">
              <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-orange-500" />{faq.q}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </summary>
            <p className="px-5 pb-4 text-xs text-slate-500">{faq.a}</p>
          </details>
        ))}
        <div className="text-center pt-4">
          <Link href="/lazada" className="text-xs font-extrabold text-sky-600 hover:underline">Explore Lazada Seller Toolkit →</Link>
        </div>
      </section>
    </div>
  );
}
