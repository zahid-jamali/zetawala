'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculateUpworkHourlyRate } from '../../../lib/freelancer/hourlyRate';
import { loadFreelancerProfile } from '../../../lib/freelancer/profile';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';
const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

export default function UpworkHourlyRateCalculator() {
  const [rateHint, setRateHint] = useState('');
  const [form, setForm] = useState({
    monthlyIncomeGoal: '4000',
    expenses: '500',
    taxesPercent: '20',
    billableHours: '80',
  });

  useEffect(() => {
    const profile = loadFreelancerProfile();
    if (profile.hourlyRate) setRateHint(String(profile.hourlyRate));
  }, []);

  const result = useMemo(
    () =>
      calculateUpworkHourlyRate({
        monthlyIncomeGoal: form.monthlyIncomeGoal,
        expenses: form.expenses,
        taxesPercent: form.taxesPercent,
        billableHours: form.billableHours,
      }),
    [form]
  );

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-500" />
          <h2 className="text-sm font-black">Upwork Hourly Rate Calculator</h2>
        </div>
        <p className="text-[11px] text-slate-500">
          Pure math — no AI. {rateHint ? `Profile rate hint: $${rateHint}/hr` : ''}
        </p>
        {[
          ['monthlyIncomeGoal', 'Monthly Income Goal ($)'],
          ['expenses', 'Monthly Expenses ($)'],
          ['taxesPercent', 'Taxes (%)'],
          ['billableHours', 'Billable Hours / Month'],
        ].map(([k, label]) => (
          <div key={k} className="space-y-2">
            <label className={labelClasses}>{label}</label>
            <input
              type="number"
              min="0"
              step="any"
              className={inputClasses}
              value={form[k]}
              onChange={(e) => set(k, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="lg:col-span-8 grid sm:grid-cols-3 gap-4">
        <RateCard label="Minimum Rate" value={result.minimumRate} hint="Floor to stay sustainable" />
        <RateCard label="Suggested Hourly Rate" value={result.suggestedHourlyRate} hint="Covers goals + expenses + tax" highlight />
        <RateCard label="Premium Rate" value={result.premiumRate} hint="High-value / rush work" />
        <div className="sm:col-span-3 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 space-y-1">
          <p>Monthly gross needed: <strong className="text-slate-800 dark:text-slate-200">${result.monthlyGrossNeeded}</strong></p>
          <p>At {result.billableHours} billable hours/month.</p>
        </div>
      </div>
    </div>
  );
}

function RateCard({ label, value, hint, highlight }) {
  return (
    <div className={`p-5 rounded-3xl border shadow-sm ${highlight ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">${value}<span className="text-sm font-bold text-slate-400">/hr</span></p>
      <p className="text-[11px] text-slate-500 mt-2">{hint}</p>
    </div>
  );
}
