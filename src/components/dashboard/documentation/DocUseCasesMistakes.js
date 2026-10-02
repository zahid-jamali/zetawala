'use client';

import React from 'react';
import { Briefcase, ShieldAlert, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';

export default function DocUseCasesMistakes({ guide }) {
  if (!guide) return null;

  return (
    <div className="space-y-10">
      {/* Section J: Common Use Cases */}
      {guide.useCases?.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Common use cases
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {guide.useCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-2xs"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Scenario {idx + 1}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {uc.situation}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {uc.benefit}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section K: Limitations and Assumptions */}
      {guide.limitations?.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Limitations and assumptions
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/60 dark:border-amber-900/40 space-y-3">
            <ul className="space-y-2.5">
              {guide.limitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Section L: Common Mistakes */}
      {guide.commonMistakes?.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Common mistakes when using this tool
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {guide.commonMistakes.map((cm, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-2xs"
              >
                <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {cm.mistake}
                  </h3>
                </div>
                <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400 pl-6 border-l-2 border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cm.prevention}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
