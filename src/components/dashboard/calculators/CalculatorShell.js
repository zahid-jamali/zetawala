'use client';

import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculatorFormConfig } from '../../../config/calculators/formConfig';
import { aiProviders } from '../../../config/calculators/aiPricing';
import { getCalculatorTool } from '../../../config/calculators/tools';
import { calculatorFns } from '../../../lib/calculators';
import {
  inputClasses,
  labelClasses,
  MetricCard,
  ErrorBanner,
  NextSteps,
  Field,
} from './CalculatorShared';

function AiApiFields({ form, set }) {
  const provider = aiProviders.find((p) => p.id === form.provider) || aiProviders[0];
  const isCustom = form.provider === 'custom' || form.model === 'custom';

  return (
    <>
      <div className="space-y-2">
        <label className={labelClasses}>AI Provider</label>
        <select
          className={inputClasses}
          value={form.provider}
          onChange={(e) => {
            const next = aiProviders.find((p) => p.id === e.target.value);
            set('provider', e.target.value);
            set('model', next?.models[0]?.id || 'custom');
          }}
        >
          {aiProviders.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className={labelClasses}>AI Model</label>
        <select
          className={inputClasses}
          value={form.model}
          onChange={(e) => set('model', e.target.value)}
        >
          {provider.models.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>
      {isCustom && (
        <>
          <Field label="Custom Input $/1M Tokens" value={form.customInputPer1M} onChange={(v) => set('customInputPer1M', v)} step="0.01" />
          <Field label="Custom Output $/1M Tokens" value={form.customOutputPer1M} onChange={(v) => set('customOutputPer1M', v)} step="0.01" />
        </>
      )}
      <Field label="Input Tokens (per request)" value={form.inputTokens} onChange={(v) => set('inputTokens', v)} />
      <Field label="Output Tokens (per request)" value={form.outputTokens} onChange={(v) => set('outputTokens', v)} />
      <Field label="Requests per Day" value={form.requestsPerDay} onChange={(v) => set('requestsPerDay', v)} />
      <Field label="Days per Month" value={form.daysPerMonth} onChange={(v) => set('daysPerMonth', v)} />
    </>
  );
}

function AdsenseFields({ form, set }) {
  return (
    <>
      <Field label="Monthly Pageviews" value={form.monthlyPageviews} onChange={(v) => set('monthlyPageviews', v)} />
      <div className="space-y-2">
        <label className={labelClasses}>Estimate Mode</label>
        <select className={inputClasses} value={form.mode} onChange={(e) => set('mode', e.target.value)}>
          <option value="rpm">RPM</option>
          <option value="cpc">CTR + CPC</option>
        </select>
      </div>
      {form.mode === 'rpm' ? (
        <Field label="RPM ($ per 1000 pageviews)" value={form.rpm} onChange={(v) => set('rpm', v)} step="0.01" />
      ) : (
        <>
          <Field label="CTR (%)" value={form.ctrPct} onChange={(v) => set('ctrPct', v)} step="0.1" />
          <Field label="CPC ($)" value={form.cpc} onChange={(v) => set('cpc', v)} step="0.01" />
        </>
      )}
    </>
  );
}

function SalaryFields({ form, set }) {
  return (
    <>
      <div className="space-y-2">
        <label className={labelClasses}>Salary Period</label>
        <select className={inputClasses} value={form.salaryPeriod} onChange={(e) => set('salaryPeriod', e.target.value)}>
          <option value="annual">Annual</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <Field
        label={form.salaryPeriod === 'monthly' ? 'Monthly Salary ($)' : 'Annual Salary ($)'}
        value={form.salary}
        onChange={(v) => set('salary', v)}
      />
      <Field label="Working Days per Week" value={form.workingDaysPerWeek} onChange={(v) => set('workingDaysPerWeek', v)} step="0.5" />
      <Field label="Working Hours per Day" value={form.workingHoursPerDay} onChange={(v) => set('workingHoursPerDay', v)} step="0.5" />
      <Field label="Weeks per Year" value={form.weeksPerYear} onChange={(v) => set('weeksPerYear', v)} />
    </>
  );
}

export default function CalculatorShell({ toolSlug }) {
  const tool = getCalculatorTool(toolSlug);
  const config = calculatorFormConfig[toolSlug];
  const calculate = calculatorFns[toolSlug];

  const [form, setForm] = useState(config?.defaults || {});

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const result = useMemo(() => {
    if (!calculate) return { success: false, errors: ['Calculator not found.'] };
    return calculate(form);
  }, [calculate, form]);

  if (!tool || !config) {
    return (
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <p className="text-sm text-slate-500">Calculator not found.</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">{config.title}</h2>
        </div>

        {toolSlug === 'ai-api-cost' && <AiApiFields form={form} set={set} />}
        {toolSlug === 'adsense-revenue' && <AdsenseFields form={form} set={set} />}
        {toolSlug === 'salary-to-hourly' && <SalaryFields form={form} set={set} />}
        {config.fields.map((field) => (
          <Field
            key={field.key}
            label={field.label}
            type={field.type || 'number'}
            step={field.step}
            value={form[field.key] ?? ''}
            onChange={(v) => set(field.key, v)}
          />
        ))}

        <p className="text-[10px] text-slate-500 leading-relaxed">
          Instant local calculation — no AI calls. Results update as you type. Estimates only; verify with your own data.
        </p>
      </div>

      <div className="lg:col-span-8 space-y-5">
        {!result.success && <ErrorBanner message={(result.errors || []).join(' ')} />}

        {result.success && (
          <>
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">{tool.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-black text-sky-600 dark:text-sky-400">{result.headline}</span>
              </p>
              {result.formula && (
                <p className="text-[11px] text-slate-500">Formula: {result.formula}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {(result.metrics || []).map((m) => (
                <MetricCard
                  key={m.title}
                  title={m.title}
                  value={m.value}
                  subtitle={m.subtitle}
                />
              ))}
            </div>

            {result.details?.length > 0 && (
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h4 className="text-xs font-extrabold">Details</h4>
                <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  {result.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            <NextSteps links={config.nextSteps || []} />
          </>
        )}
      </div>
    </div>
  );
}
