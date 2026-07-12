import React from 'react';
import Image from 'next/image';
import { Zap, ArrowRight } from 'lucide-react';

export default function HeroShowcase() {
  return (
    <section className="relative px-6 py-28 text-center max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
        <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        <span>Automated Assets & Productivity Systems</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] max-w-4xl mx-auto animate-fade-in">
        Automated Digital Assets & Financial Stability through{' '}
        <span className="text-sky-600 dark:text-sky-400">
          E-Commerce & Video AI Utilities
        </span>
      </h1>

      <p className="text-base sm:text-lg text-slate-400 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium">
        Eliminate hours of manual optimization. Run automated pipelines to evaluate product demand, export Urdu search keywords, outline narrative hooks, and write full video scripts instantly.
      </p>

      <div className="pt-4 pb-12">
        <a
          href="#workspace-portfolio"
          className="px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all shadow-lg shadow-sky-500/10 hover:scale-[1.01] inline-flex items-center gap-2 cursor-pointer border border-transparent"
        >
          Launch Tool Packs
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Dashboard Mockup Showcase Container */}
      <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-2 shadow-xl backdrop-blur-md">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
          <Image
            src="/images/dashboard_mockup.png"
            alt="ZetaWala Premium AI SaaS Dashboard Mockup"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-w-4xl) 100vw"
          />
        </div>
      </div>
    </section>
  );
}
