'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { getLocalizedToolPath } from '../../../i18n/paths';
import { DEFAULT_LOCALE } from '../../../i18n/config';
import { useLocale } from '../../i18n/LocaleProvider';

export const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';

export const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

export function MetricCard({ title, value, subtitle, badge }) {
  const { t } = useLocale();
  const badgeText = badge || t('toolPage.badge') || 'Zetawala Calculation';
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
          {badgeText}
        </span>
      </div>
      <p className="text-lg font-black text-slate-900 dark:text-white">{value ?? 'N/A'}</p>
      {subtitle && <p className="text-[10px] text-slate-500">{subtitle}</p>}
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

export function NextSteps({ links = [], title, locale: localeProp }) {
  const { locale: ctxLocale, t } = useLocale();
  const locale = localeProp || ctxLocale || DEFAULT_LOCALE;
  if (!links.length) return null;
  return (
    <div className="p-5 rounded-3xl bg-sky-50/50 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-900/30 space-y-3">
      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{title || t('toolPage.nextSteps') || 'Recommended Next Steps'}</h4>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={getLocalizedToolPath(locale, 'calculators', link.slug)}
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

export function Field({ label, value, onChange, placeholder, type = 'number', step, min = '0' }) {
  return (
    <div className="space-y-2">
      <label className={labelClasses}>{label}</label>
      <input
        className={inputClasses}
        type={type}
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
