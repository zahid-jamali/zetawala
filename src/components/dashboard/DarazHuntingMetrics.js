'use client';

import React from 'react';
import { Truck, AlertTriangle, Lightbulb, Check } from 'lucide-react';

export default function DarazHuntingMetrics({ huntingOutput }) {
  if (!huntingOutput) return null;

  const getDemandColor = (score) => {
    if (score >= 80) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getCompBadge = (level) => {
    switch (level) {
      case 'Low':
        return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400';
      case 'Medium':
        return 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400';
      case 'High':
        return 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400';
      default:
        return 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400';
    }
  };

  const cardClasses = "p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm";
  const titleClasses = "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";
  const bodyTextClasses = "text-xs text-slate-700 dark:text-slate-300 leading-relaxed";

  return (
    <div className="space-y-6 flex flex-col justify-between text-slate-850 dark:text-slate-100">
      <div className="grid sm:grid-cols-2 gap-6">
        
        {/* Card 1: Market Demand Speedometer */}
        <div className={`${cardClasses} flex items-center justify-between gap-4`}>
          <div className="space-y-2">
            <h3 className={titleClasses}>Market Demand</h3>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Score: {huntingOutput.marketDemandScore?.score}/100</p>
            <p className={`${bodyTextClasses} pr-1 max-w-[200px] line-clamp-4`}>
              {huntingOutput.marketDemandScore?.reasoning}
            </p>
          </div>
          
          {/* SVG Radial Gauge */}
          <div className="relative w-24 h-24 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800 stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`stroke-current transition-all duration-1000 ${getDemandColor(huntingOutput.marketDemandScore?.score)}`}
                strokeWidth="3.5"
                strokeDasharray={`${huntingOutput.marketDemandScore?.score || 0}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-extrabold text-slate-900 dark:text-white text-base">
              {huntingOutput.marketDemandScore?.score}%
            </div>
          </div>
        </div>

        {/* Card 2: Saturated vs Open Competition */}
        <div className={`${cardClasses} space-y-4`}>
          <div className="flex items-center justify-between gap-2">
            <h3 className={titleClasses}>Market Competition</h3>
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-lg border uppercase tracking-wider shrink-0 ${
              getCompBadge(huntingOutput.competitionLevel?.level)
            }`}>
              {huntingOutput.competitionLevel?.level}
            </span>
          </div>
          <p className={bodyTextClasses}>
            {huntingOutput.competitionLevel?.reasoning}
          </p>
          {huntingOutput.winningCriteria && (
            <div className="flex gap-2 items-start text-xs text-slate-700 dark:text-slate-350 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-850">
              <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <p className="line-clamp-2 leading-relaxed">{huntingOutput.winningCriteria}</p>
            </div>
          )}
        </div>

      </div>

      {/* Card 3: Margin & Sourcing Estimator */}
      <div className={`${cardClasses} space-y-4`}>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <Truck className="w-4 h-4 text-indigo-650 dark:text-indigo-400" />
          Financial Margin & Sourcing Plan
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 text-xs text-slate-700 dark:text-slate-300">
          <div className="sm:col-span-1 space-y-1">
            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-[10px]">Estimated Margin</span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white block">
              High Profit Potential
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal pt-1">{huntingOutput.estimatedProfitMargin}</p>
          </div>
          <div className="sm:col-span-2 space-y-2">
            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-[10px]">Sourcing Channels (Local vs Global)</span>
            <p className="leading-relaxed text-slate-850 dark:text-slate-300">
              {huntingOutput.sourcingTips}
            </p>
          </div>
        </div>
      </div>

      {/* Card 4: Customer Loophole Finder */}
      <div className={`${cardClasses} space-y-4`}>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          Customer Loophole Finder (Bad Review Diagnostics)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Competing sellers fail on these points. Fix them to easily stand out and capture high reviews.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-4">
          {Array.isArray(huntingOutput.customerPainPoints) && huntingOutput.customerPainPoints.map((pain, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-850 space-y-2 flex flex-col justify-between shadow-sm">
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center text-rose-700 dark:text-rose-450 font-bold text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-805 dark:text-slate-200 leading-relaxed font-semibold">{pain}</p>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-850 text-[10px] text-slate-500 dark:text-slate-500 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Optimize design to fix
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
