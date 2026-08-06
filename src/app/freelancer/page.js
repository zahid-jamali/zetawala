import Link from 'next/link';
import { Briefcase, ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { UPWORK_TOOLS, FIVERR_TOOLS } from '../../config/freelancer/tools';
import { getSeoPath } from '../../config/routes';

export const metadata = {
  title: 'Free Freelancer Toolkit – Upwork & Fiverr Tools | Zetawala',
  description:
    'Free Freelancer Toolkit for Upwork and Fiverr: proposals, gigs, profiles, pricing, contracts, buyer replies, and more—powered by DeepSeek where AI is needed.',
  alternates: { canonical: 'https://zetawala.com/freelancer' },
  openGraph: {
    title: 'Free Freelancer Toolkit – Upwork & Fiverr | Zetawala',
    description: 'Win more clients with Upwork and Fiverr tools for proposals, gigs, profiles, and pricing.',
    url: 'https://zetawala.com/freelancer',
    siteName: 'Zetawala',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Freelancer Toolkit | Zetawala',
    description: 'Upwork and Fiverr tools for proposals, gigs, profiles, and client messaging.',
  },
  robots: { index: true, follow: true },
};

export default function FreelancerCategoryPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100">
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Freelancer Toolkit</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Win more clients on Upwork and Fiverr with proposals, gig SEO, profiles, pricing, contracts, and follow-ups—plus an optional shared Freelancer Profile.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/freelancer/upwork" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs">
            Upwork Toolkit <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/freelancer/fiverr" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold text-xs">
            Fiverr Toolkit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <HubCard
          title="Upwork Toolkit"
          href="/freelancer/upwork"
          desc="Proposals, job match, profile optimizer, cover letters, interview answers, rates, contracts, portfolio copy, and follow-ups."
          tools={UPWORK_TOOLS}
        />
        <HubCard
          title="Fiverr Toolkit"
          href="/freelancer/fiverr"
          desc="Gig titles, descriptions, SEO, tags, FAQs, pricing packages, image text, buyer replies, bios, and review responses."
          tools={FIVERR_TOOLS}
        />
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-6">
        <h2 className="text-xl font-extrabold text-center">Frequently Asked Questions</h2>
        {[
          {
            q: 'What is the Freelancer Toolkit?',
            a: 'A suite of 20 free Upwork and Fiverr tools—AI-powered writing/analysis via DeepSeek, plus deterministic rate and package math.',
          },
          {
            q: 'Do I need to fill my profile every time?',
            a: 'No. Save an optional Freelancer Profile in LocalStorage and tools can prefill skills, experience, tone, and more.',
          },
        ].map((faq, i) => (
          <details key={i} className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
            <summary className="px-5 py-4 flex items-center justify-between cursor-pointer list-none font-bold text-sm">
              <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-emerald-500" />{faq.q}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="px-5 pb-4 text-xs text-slate-500">{faq.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}

function HubCard({ title, href, desc, tools }) {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div>
        <h2 className="text-lg font-extrabold mb-1">{title}</h2>
        <p className="text-[11px] text-slate-500 font-medium">{desc}</p>
      </div>
      <ul className="space-y-1.5">
        {tools.slice(0, 5).map((t) => (
          <li key={t.slug}>
            <Link href={getSeoPath('freelancer', t.slug)} className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline">
              {t.name} →
            </Link>
          </li>
        ))}
      </ul>
      <Link href={href} className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
        View all {title} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
