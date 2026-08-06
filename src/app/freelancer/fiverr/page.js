import Link from 'next/link';
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { FIVERR_TOOLS } from '../../../config/freelancer/tools';
import { getSeoPath } from '../../../config/routes';

export const metadata = {
  title: 'Free Fiverr Toolkit – Gig SEO Pricing Bios | Zetawala',
  description:
    'Free Fiverr tools: gig titles, descriptions, SEO analyzer, tags, FAQs, pricing packages, image text, buyer request replies, profile bios, and review responses.',
  alternates: { canonical: 'https://zetawala.com/freelancer/fiverr' },
  openGraph: {
    title: 'Free Fiverr Toolkit | Zetawala',
    description: 'Gig SEO, pricing packages, buyer replies, and seller bios for Fiverr freelancers.',
    url: 'https://zetawala.com/freelancer/fiverr',
    siteName: 'Zetawala',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function FiverrHubPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100">
      <section className="px-6 py-16 text-center max-w-4xl mx-auto space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
          <Link href="/freelancer" className="hover:underline">Freelancer Toolkit</Link> / Fiverr
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Fiverr Toolkit</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Rank better and convert more buyers with gig SEO, package pricing, profile bios, and polished client replies.
        </p>
        <Link
          href={getSeoPath('freelancer', 'fiverr-gig-title-generator')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
        >
          Open Gig Title Generator <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <h2 className="text-xl font-extrabold text-center">All Fiverr Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIVERR_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={getSeoPath('freelancer', tool.slug)}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-emerald-500/30 transition-all group"
            >
              <h3 className="text-sm font-extrabold mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{tool.name}</h3>
              <p className="text-[11px] text-slate-500 font-medium">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-4">
        <h2 className="text-xl font-extrabold text-center">Best Practices</h2>
        <p className="text-xs text-slate-500 text-center">
          Start with keyword-rich titles and tags, write a clear description, price packages from hours × experience, then reply fast to buyer requests and reviews.
        </p>
        {[
          {
            q: 'Does pricing use AI for numbers?',
            a: 'Package prices are calculated with business math. AI adds positioning suggestions for Basic, Standard, and Premium.',
          },
          {
            q: 'Does image text generate images?',
            a: 'No. It only generates thumbnail headlines, badges, and CTA text for you to place on your own creatives.',
          },
        ].map((faq, i) => (
          <details key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
            <summary className="px-5 py-4 flex justify-between cursor-pointer list-none font-bold text-sm">
              <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-emerald-500" />{faq.q}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </summary>
            <p className="px-5 pb-4 text-xs text-slate-500">{faq.a}</p>
          </details>
        ))}
        <div className="text-center pt-4">
          <Link href="/freelancer/upwork" className="text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline">
            Explore Upwork Toolkit →
          </Link>
        </div>
      </section>
    </div>
  );
}
