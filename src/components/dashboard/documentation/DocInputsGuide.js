'use client';

import React from 'react';
import { Sliders, ArrowRight } from 'lucide-react';

export default function DocInputsGuide({ guide }) {
  if (!guide?.inputs?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Sliders className="w-4 h-4" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          What do you need to enter?
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {guide.inputs.map((inp, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2.5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {inp.name}
              </h3>
              {inp.format && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {inp.format}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {inp.description}
            </p>

            {inp.impact && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold text-slate-700 dark:text-slate-300">Calculation impact:</strong>{' '}
                  {inp.impact}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
