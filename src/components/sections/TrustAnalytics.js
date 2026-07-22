import React from 'react';
import { Award } from 'lucide-react';

export default function TrustAnalytics() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-6">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center mx-auto shrink-0">
        <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Engineered for Digital Assets Stability
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
        Whether you are auditing technical SEO, improving Core Web Vitals, sourcing Daraz products, automating YouTube retention hooks, or scaling WhatsApp social commerce—ZetaWala helps you move from insight to action faster.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">10x</span>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Speed Improvement</p>
        </div>
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">40%+</span>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Average CTR Increase</p>
        </div>
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">99%</span>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">JSON Parse Success</p>
        </div>
        <div className="space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">24/7</span>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Automated Availability</p>
        </div>
      </div>
    </section>
  );
}
