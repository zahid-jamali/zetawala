import Link from 'next/link';
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { UPWORK_TOOLS } from '../../../config/freelancer/tools';
import { getSeoPath } from '../../../config/routes';

export const metadata = {
  title: 'Free Upwork Toolkit – Proposals Profiles Rates | Zetawala',
  description:
    'Free Upwork tools: proposal generator & analyzer, job match, profile optimizer, cover letters, interview answers, hourly rate calculator, contracts, portfolio copy, and follow-ups.',
  alternates: { canonical: 'https://zetawala.com/freelancer/upwork' },
  openGraph: {
    title: 'Free Upwork Toolkit | Zetawala',
    description: 'Proposals, profiles, rates, contracts, and client follow-ups for Upwork freelancers.',
    url: 'https://zetawala.com/freelancer/upwork',
    siteName: 'Zetawala',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function UpworkHubPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100">
      <section className="px-6 py-16 text-center max-w-4xl mx-auto space-y-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
          <Link href="/freelancer" className="hover:underline">Freelancer Toolkit</Link> / Upwork
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Upwork Toolkit</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Win more Upwork jobs with stronger proposals, sharper profiles, clearer rates, and professional client communication.
        </p>
        <Link
          href={getSeoPath('freelancer', 'upwork-proposal-generator')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
        >
          Open Proposal Generator <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 space-y-6">
        <h2 className="text-xl font-extrabold text-center">All Upwork Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UPWORK_TOOLS.map((tool) => (
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
        <h2 className="text-xl font-extrabold text-center">How It Works</h2>
        <p className="text-xs text-slate-500 text-center">
          Paste a job post or profile section, optionally prefill from your Freelancer Profile, generate with DeepSeek (or run the rate calculator), then copy, download, or jump to a related tool.
        </p>
        {[
          { q: 'Is the hourly rate calculator AI?', a: 'No. It uses pure math from income goals, expenses, taxes, and billable hours.' },
          { q: 'Are contracts legal advice?', a: 'No. Contracts are educational templates—have a qualified professional review before use.' },
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
          <Link href="/freelancer/fiverr" className="text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline">
            Explore Fiverr Toolkit →
          </Link>
        </div>
      </section>
    </div>
  );
}
