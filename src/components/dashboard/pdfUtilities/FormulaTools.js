'use client';

import React, { useMemo, useState } from 'react';
import { Sigma } from 'lucide-react';
import {
  FORMULA_CATEGORIES,
  listTemplates,
  generateExcelFormula,
  explainExcelFormula,
} from '../../../lib/pdfUtilities/formulaService';
import {
  inputClasses,
  labelClasses,
  CopyButton,
  ResultCard,
  NextSteps,
  ErrorBanner,
} from './PdfShared';

export function ExcelFormulaGenerator() {
  const [category, setCategory] = useState('lookup');
  const templates = useMemo(() => listTemplates(category), [category]);
  const [templateId, setTemplateId] = useState(templates[0]?.id || 'vlookup-basic');
  const [params, setParams] = useState({});

  const activeTemplates = useMemo(() => listTemplates(category), [category]);
  const effectiveId = activeTemplates.some((t) => t.id === templateId)
    ? templateId
    : activeTemplates[0]?.id;

  const result = useMemo(() => {
    try {
      return generateExcelFormula({ category, templateId: effectiveId, params });
    } catch (e) {
      return { error: e.message };
    }
  }, [category, effectiveId, params]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Sigma className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Formula Builder</h2>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Category</label>
          <select
            className={inputClasses}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              const next = listTemplates(e.target.value);
              setTemplateId(next[0]?.id);
            }}
          >
            {FORMULA_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Template</label>
          <select
            className={inputClasses}
            value={effectiveId}
            onChange={(e) => setTemplateId(e.target.value)}
          >
            {activeTemplates.map((t) => (
              <option key={t.id} value={t.id}>{t.label || t.id}</option>
            ))}
          </select>
        </div>
        {(activeTemplates.find((t) => t.id === effectiveId)?.fields || []).map((f) => (
          <div key={f.key} className="space-y-2">
            <label className={labelClasses}>{f.label}</label>
            <input
              className={inputClasses}
              value={params[f.key] ?? ''}
              placeholder={f.placeholder}
              onChange={(e) => setParams((p) => ({ ...p, [f.key]: e.target.value }))}
            />
          </div>
        ))}
        <p className="text-[10px] text-slate-500">Deterministic rule-based generator — no AI.</p>
      </div>
      <div className="lg:col-span-8 space-y-5">
        {result.error && <ErrorBanner message={result.error} />}
        {result.formula && (
          <ResultCard title="Generated Formula" actions={<CopyButton text={result.formula} />}>
            <p className="text-lg font-mono font-bold text-sky-600 dark:text-sky-400 break-all">{result.formula}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">{result.explanation}</p>
            {result.example && (
              <p className="text-[11px] text-slate-500">Example: <code>{result.example}</code></p>
            )}
          </ResultCard>
        )}
        <NextSteps
          links={[
            { slug: 'excel-formula-explainer', label: 'Explain a Formula' },
            { slug: 'excel-to-json', label: 'Excel → JSON' },
            { slug: 'csv-to-excel', label: 'CSV → Excel' },
          ]}
        />
      </div>
    </div>
  );
}

export function ExcelFormulaExplainer() {
  const [formula, setFormula] = useState('=VLOOKUP(A2, Sheet2!A:D, 2, FALSE)');
  const result = useMemo(() => {
    try {
      return explainExcelFormula(formula);
    } catch (e) {
      return { error: e.message, functions: [] };
    }
  }, [formula]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Sigma className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Paste Formula</h2>
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Excel Formula</label>
          <textarea
            className={`${inputClasses} min-h-[140px] font-mono text-xs`}
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            spellCheck={false}
          />
        </div>
        <p className="text-[10px] text-slate-500">Deterministic parser — no AI calls.</p>
      </div>
      <div className="lg:col-span-8 space-y-5">
        {result.error && <ErrorBanner message={result.error} />}
        {result.summary && (
          <ResultCard title="Explanation">
            <p className="text-sm text-slate-700 dark:text-slate-200">{result.summary}</p>
            {result.output && (
              <p className="text-xs text-slate-500 mt-2">Expected output: {result.output}</p>
            )}
          </ResultCard>
        )}
        {(result.functions || []).map((fn, i) => (
          <ResultCard key={i} title={fn.name}>
            <p className="text-xs text-slate-600 dark:text-slate-300">{fn.description}</p>
            {fn.example && <p className="text-[11px] text-slate-500 mt-2">Example: <code>{fn.example}</code></p>}
          </ResultCard>
        ))}
        {result.outer?.argSummary && (
          <ResultCard title="Arguments">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">{result.outer.argSummary}</p>
          </ResultCard>
        )}
        <NextSteps
          links={[
            { slug: 'excel-formula-generator', label: 'Generate Formula' },
            { slug: 'excel-to-json', label: 'Excel → JSON' },
          ]}
        />
      </div>
    </div>
  );
}
