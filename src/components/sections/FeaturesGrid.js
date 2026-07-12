import React from 'react';
import Link from 'next/link';
import { Video, ShoppingBag, Layers, Globe, Cpu } from 'lucide-react';

export default function FeaturesGrid() {
  const cardClasses = "bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300";
  const featureBoxClasses = "p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl shadow-sm hover:border-sky-500/30 dark:hover:border-sky-500/20 transition-all";

  return (
    <>
      {/* 3. Main Workspace Portfolio Grid */}
      <section id="workspace-portfolio" className="max-w-6xl mx-auto px-6 py-20 space-y-12 scroll-mt-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Access SEO & Automation Suites
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Select a suite pack below to enter the live workspace dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* YouTube Automation Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 flex items-center justify-center">
                <Video className="w-6 h-6 text-red-650 dark:text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">YouTube Automation Pack</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-medium">
                  Supercharge video creation with a 7-step optimization pipeline. Find trends, optimize hooks, extract Studio tags, script voiceovers, and storyboard visual B-roll sequences in one click.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/dashboard/youtube"
                className="w-full py-3.5 rounded-2xl bg-red-650 hover:bg-red-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open YouTube Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Daraz SEO Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-orange-650 dark:text-orange-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Daraz SEO & Conversion Pack</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Dominate Pakistan's local e-commerce marketplace. Build highly optimized titles, draft descriptions, optimize keywords, respond to negative reviews, and simulate FBM/FBD net profit margins.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/dashboard/daraz"
                className="w-full py-3.5 rounded-2xl bg-orange-650 hover:bg-orange-750 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open Daraz Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Brand Quality Features */}
      <section className="bg-slate-100/50 dark:bg-slate-900/10 border-y border-slate-205 dark:border-slate-800 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Professionals Choose ZetaWala
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Engineered for local market niches and content creator workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={featureBoxClasses}>
              <Layers className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-4" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">Integrated Pipeline Flow</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                No need to copy-paste between separate tools. Run titles, scripts, and visuals as a continuous sequential pipeline.
              </p>
            </div>

            <div className={featureBoxClasses}>
              <Globe className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mb-4" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">Localized Pak SEO Tools</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Get target keyword lists mixing English and Roman Urdu phonetics tailored for Pakistan's search volumes.
              </p>
            </div>

            <div className={featureBoxClasses}>
              <Cpu className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">DeepSeek Completion Power</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Driven by high-performance models returning clean structured JSON lists without conversational descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
