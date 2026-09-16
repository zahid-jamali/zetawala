'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLocalizedToolPath } from '../../i18n/paths';
import { useLocale } from '../i18n/LocaleProvider';

export default function PipelineStepTracker({
  steps = [],
  toolSlug,
  currentStepIndex,
  pipelineLabel,
  routeCategory,
  locale
}) {
  const { t } = useLocale();

  if (!steps || steps.length === 0) return null;

  const prevStep = currentStepIndex > 0 ? steps[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1] : null;

  const getDisplayName = (step) => {
    if (!step) return '';
    const translated = t(`tools.${step.slug}.name`);
    return translated !== `tools.${step.slug}.name` ? translated : step.name;
  };

  const prevName = getDisplayName(prevStep);
  const nextName = getDisplayName(nextStep);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-sm w-full max-w-full min-w-0">
      {/* Header: Pipeline Title, Step Counter Badge & Prev/Next Navigation */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80 mb-2 sm:mb-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-[11px] sm:text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider truncate">
            {pipelineLabel}
          </span>
          <span className="text-[9px] sm:text-[10px] font-extrabold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-200/60 dark:border-sky-800/60 shrink-0">
            {currentStepIndex + 1} of {steps.length}
          </span>
        </div>

        {/* Prev / Next Quick Step Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {prevStep && (
            <Link
              href={getLocalizedToolPath(locale, routeCategory, prevStep.slug)}
              prefetch={true}
              className="inline-flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-750 transition-colors"
              title={`Previous: ${prevName}`}
            >
              <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="font-bold">Prev</span>
            </Link>
          )}

          {nextStep && (
            <Link
              href={getLocalizedToolPath(locale, routeCategory, nextStep.slug)}
              prefetch={true}
              className="inline-flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-sm shadow-sky-500/20 transition-all"
              title={`Next: ${nextName}`}
            >
              <span className="font-bold">Next</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* All Pipeline Tools: Compact, Open, fitting 2-3 tools per line where possible */}
      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 w-full">
        {steps.map((step, idx) => {
          const isCurrent = step.slug === toolSlug;
          const displayName = getDisplayName(step);

          return (
            <Link
              key={step.slug}
              href={getLocalizedToolPath(locale, routeCategory, step.slug)}
              prefetch={true}
              className={`group inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-sky-500 text-white font-bold shadow-sm shadow-sky-500/25 ring-2 ring-sky-400/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200/80 dark:border-slate-800 font-medium'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full text-[8px] sm:text-[9px] flex items-center justify-center font-black shrink-0 transition-colors ${
                  isCurrent
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-300 dark:group-hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </span>
              <span className="leading-tight">{displayName}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
