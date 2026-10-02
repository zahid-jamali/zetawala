'use client';

import React from 'react';
import { Cpu, Binary, Check } from 'lucide-react';

export default function DocMethodology({ guide }) {
  if (!guide) return null;

  return (
    <div className="space-y-10">
      {/* Section F: How Does It Work? */}
      {guide.howItWorks?.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              How does the {guide.h1 || 'tool'} work?
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-2xs">
            <ol className="space-y-3">
              {guide.howItWorks.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Section G: Formula & Calculation / Methodology */}
      {guide.formula && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Binary className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Formula and methodology
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-2xs">
            {/* Expression Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-sky-300 dark:bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm overflow-x-auto">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Deterministic Calculation Formula
              </span>
              <code>{guide.formula.expression}</code>
            </div>

            {/* Variable definitions */}
            {guide.formula.variables?.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Variable Definitions
                </h3>
                <dl className="grid sm:grid-cols-2 gap-3 text-xs">
                  {guide.formula.variables.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-150 dark:border-slate-850"
                    >
                      <dt className="font-bold text-slate-900 dark:text-white font-mono">
                        {v.symbol}
                      </dt>
                      <dd className="text-slate-600 dark:text-slate-400 mt-0.5">
                        {v.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {guide.formula.notes && (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-100 dark:border-slate-800">
                {guide.formula.notes}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
