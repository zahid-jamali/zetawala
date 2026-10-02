'use client';

import React from 'react';
import { BookOpenCheck, ArrowRight, CornerDownRight } from 'lucide-react';

export default function DocExampleSandbox({ guide }) {
  if (!guide?.example) return null;

  const { scenario, inputs, process, output, interpretation } = guide.example;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <BookOpenCheck className="w-4 h-4" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Real-world example
        </h2>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-2xs">
        {scenario && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Scenario Setup
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              {scenario}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {/* Inputs Card */}
          {inputs && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Sample Input Parameters
              </span>
              <dl className="space-y-2 text-xs">
                {Object.entries(inputs).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-1 border-b border-slate-200/40 dark:border-slate-800/60 last:border-0">
                    <dt className="text-slate-600 dark:text-slate-400">{k}</dt>
                    <dd className="font-mono font-semibold text-slate-900 dark:text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Outputs Card */}
          {output && (
            <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Resulting Outputs
              </span>
              <dl className="space-y-2 text-xs">
                {Object.entries(output).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-1 border-b border-emerald-200/40 dark:border-emerald-900/40 last:border-0">
                    <dt className="text-slate-700 dark:text-slate-300 font-medium">{k}</dt>
                    <dd className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Calculation Step */}
        {process && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 dark:bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Calculation Steps
            </span>
            <p className="leading-relaxed">{process}</p>
          </div>
        )}

        {/* Interpretation */}
        {interpretation && (
          <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong className="font-semibold text-sky-900 dark:text-sky-300 block mb-1">
              Case Interpretation
            </strong>
            {interpretation}
          </div>
        )}
      </div>
    </section>
  );
}
