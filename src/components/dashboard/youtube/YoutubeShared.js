'use client';

import React from 'react';
import Link from 'next/link';
import { Loader2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useLocalizedHref } from '../../../i18n/useLocalizedHref';

export const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';

export const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

export function ScoreRing({ score, label, disclaimer }) {
  const value = score == null ? '—' : score;
  const color =
    score == null
      ? 'text-slate-400'
      : score >= 70
        ? 'text-emerald-500'
        : score >= 50
          ? 'text-sky-500'
          : 'text-amber-500';

  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className={`text-4xl font-black ${color}`}>{value}<span className="text-base text-slate-400">/100</span></p>
      {disclaimer && <p className="text-[10px] text-slate-500 leading-relaxed">{disclaimer}</p>}
    </div>
  );
}

export function MetricCard({ title, value, subtitle, badge = 'Zetawala Calculation' }) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{badge}</span>
      </div>
      <p className="text-lg font-black text-slate-900 dark:text-white">{value ?? 'N/A'}</p>
      {subtitle && <p className="text-[10px] text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function StageLoader({ stage }) {
  return (
    <div className="h-full min-h-[220px] flex flex-col items-center justify-center py-16 text-center space-y-3">
      <Loader2 className="w-10 h-10 text-slate-800 dark:text-white animate-spin" />
      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{stage || 'Working...'}</p>
      <p className="text-[10px] text-slate-500 max-w-sm">Collecting public YouTube data, calculating scores, then generating AI interpretation.</p>
    </div>
  );
}

export function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 text-red-650 dark:text-red-400 text-xs flex items-start gap-2.5">
      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
}

export function InsightBlock({ title, children }) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{title}</h4>
        <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500">AI Insight</span>
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{children}</div>
    </div>
  );
}

export function NextSteps({ links = [] }) {
  const { toolHref } = useLocalizedHref();
  if (!links.length) return null;
  return (
    <div className="p-5 rounded-3xl bg-sky-50/50 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-900/30 space-y-3">
      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Recommended Next Steps</h4>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={toolHref('youtube', link.slug)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:border-sky-300 transition-colors"
          >
            {link.label}
            <ArrowRight className="w-3 h-3" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function formatNumber(n) {
  if (n == null || Number.isNaN(n)) return 'N/A';
  return new Intl.NumberFormat('en-US', { notation: n >= 10000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(n);
}

export function ListOrText({ value }) {
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-4 space-y-1">
        {value.map((item, i) => (
          <li key={i}>{typeof item === 'string' ? item : item?.idea || JSON.stringify(item)}</li>
        ))}
      </ul>
    );
  }
  return <p>{value || '—'}</p>;
}
