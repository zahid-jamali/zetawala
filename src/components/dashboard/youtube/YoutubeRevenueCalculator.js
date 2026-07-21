'use client';

import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import {
  contentTypes,
  niches,
  regions,
  revenueDisclaimer,
} from '../../../config/youtube/revenueConfig';
import { calculateYouTubeRevenue } from '../../../lib/youtube/revenueCalculator';
import {
  inputClasses,
  labelClasses,
  MetricCard,
  ErrorBanner,
  NextSteps,
} from './YoutubeShared';

export default function YoutubeRevenueCalculator() {
  const [monthlyViews, setMonthlyViews] = useState('100000');
  const [dailyViews, setDailyViews] = useState('');
  const [contentType, setContentType] = useState('long-form');
  const [region, setRegion] = useState('global');
  const [niche, setNiche] = useState('Education');
  const [rpmMode, setRpmMode] = useState('estimated');
  const [customRpm, setCustomRpm] = useState('4');

  const result = useMemo(
    () =>
      calculateYouTubeRevenue({
        monthlyViews,
        dailyViews,
        contentType,
        region,
        niche,
        rpmMode,
        customRpm,
      }),
    [monthlyViews, dailyViews, contentType, region, niche, rpmMode, customRpm]
  );

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Revenue Inputs</h2>
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Monthly Views *</label>
          <input className={inputClasses} type="number" min="0" value={monthlyViews} onChange={(e) => setMonthlyViews(e.target.value)} placeholder="e.g. 100000" />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Daily Views (optional)</label>
          <input className={inputClasses} type="number" min="0" value={dailyViews} onChange={(e) => setDailyViews(e.target.value)} placeholder="e.g. 3333" />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Content Type</label>
          <select className={inputClasses} value={contentType} onChange={(e) => setContentType(e.target.value)}>
            {contentTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Audience Region</label>
          <select className={inputClasses} value={region} onChange={(e) => setRegion(e.target.value)}>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Niche / Category</label>
          <select className={inputClasses} value={niche} onChange={(e) => setNiche(e.target.value)}>
            {niches.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>RPM Mode</label>
          <select className={inputClasses} value={rpmMode} onChange={(e) => setRpmMode(e.target.value)}>
            <option value="estimated">Estimated RPM bands</option>
            <option value="custom">Custom RPM</option>
          </select>
        </div>
        {rpmMode === 'custom' && (
          <div className="space-y-2">
            <label className={labelClasses}>Custom RPM (USD / 1000 views)</label>
            <input className={inputClasses} type="number" min="0" step="0.01" value={customRpm} onChange={(e) => setCustomRpm(e.target.value)} />
          </div>
        )}
        <p className="text-[10px] text-slate-500 leading-relaxed">
          This calculator is deterministic and does not call YouTube API or DeepSeek. RPM presets are estimates only.
        </p>
      </div>

      <div className="lg:col-span-8 space-y-5">
        {!result.success && <ErrorBanner message={(result.errors || []).join(' ')} />}

        {result.success && (
          <>
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Estimated YouTube Revenue</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Typical monthly estimate:{' '}
                <span className="font-black text-sky-600 dark:text-sky-400">
                  ${result.scenarios.low.monthly.toLocaleString()} – ${result.scenarios.high.monthly.toLocaleString()}
                </span>
              </p>
              <p className="text-[11px] text-slate-500">Formula: {result.formula}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {['low', 'typical', 'high'].map((key) => (
                <div key={key} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{key} scenario</p>
                  <p className="text-xs text-slate-500">RPM ${result.scenarios[key].rpm}</p>
                  <p className="text-sm font-bold">Daily: ${result.scenarios[key].daily}</p>
                  <p className="text-sm font-bold">Monthly: ${result.scenarios[key].monthly}</p>
                  <p className="text-sm font-bold">Yearly: ${result.scenarios[key].yearly}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <MetricCard title="Monthly Views Used" value={result.inputs.monthlyViews?.toLocaleString()} badge="Input" />
              <MetricCard title="Daily Views Used" value={result.inputs.dailyViews?.toLocaleString()} badge="Input" />
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="text-xs font-extrabold">Assumptions</h4>
              <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                {result.assumptions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="text-xs font-extrabold">Revenue Factors</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">{result.factors.join(' · ')}</p>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">{revenueDisclaimer}</p>

            <NextSteps
              links={[
                { slug: 'niche-opportunity', label: 'Validate a Niche First' },
                { slug: 'niche-finder', label: 'Discover Niches' },
                { slug: 'channel-health', label: 'Analyze Your Channel' },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
