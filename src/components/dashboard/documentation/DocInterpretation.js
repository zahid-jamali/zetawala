'use client';

import React from 'react';
import { Target, BarChart3, Lightbulb, AlertTriangle } from 'lucide-react';

export default function DocInterpretation({ guide }) {
  if (!guide?.interpretation) return null;

  const { overview, benchmarks, actionableAdvice, caution } = guide.interpretation;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
          <Target className="w-4 h-4" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          How to interpret the result
        </h2>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-2xs">
        {overview && (
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {overview}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4 pt-2">
          {benchmarks && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <BarChart3 className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Industry Benchmarks
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {benchmarks}
              </p>
            </div>
          )}

          {actionableAdvice && (
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Lightbulb className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Recommended Action
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {actionableAdvice}
              </p>
            </div>
          )}
        </div>

        {caution && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Important context:</strong> {caution}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
