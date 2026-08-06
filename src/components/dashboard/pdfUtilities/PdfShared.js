'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, Copy, Check, Download, Loader2 } from 'lucide-react';
import { getSeoPath } from '../../../config/routes';

export const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';

export const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

export function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 text-red-650 dark:text-red-400 text-xs flex items-start gap-2.5">
      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
}

export function NextSteps({ links = [] }) {
  if (!links.length) return null;
  return (
    <div className="p-5 rounded-3xl bg-sky-50/50 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-900/30 space-y-3">
      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Recommended Next Steps</h4>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={getSeoPath('pdf-utilities', link.slug)}
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

export function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = React.useState(false);
  if (!text) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:border-sky-300 cursor-pointer"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  );
}

export function DownloadButton({ base64, mimeType, filename, label = 'Download', text }) {
  const href = React.useMemo(() => {
    if (base64) return `data:${mimeType || 'application/octet-stream'};base64,${base64}`;
    if (text != null) {
      const blob = new Blob([text], { type: mimeType || 'text/plain;charset=utf-8' });
      return URL.createObjectURL(blob);
    }
    return null;
  }, [base64, mimeType, text]);

  if (!href) return null;
  return (
    <a
      href={href}
      download={filename || 'download'}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold transition-colors"
    >
      <Download className="w-3.5 h-3.5" />
      {label}
    </a>
  );
}

export function ProcessButton({ onClick, loading, disabled, children = 'Process File' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {loading ? 'Processing…' : children}
    </button>
  );
}

export function ResultCard({ title, children, actions }) {
  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{title}</h3>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

export async function processUtility(action, { file, text, options } = {}) {
  const form = new FormData();
  form.append('action', action);
  if (file) form.append('file', file);
  if (text != null) form.append('text', text);
  if (options) form.append('options', JSON.stringify(options));

  const res = await fetch('/api/pdf-utilities/process', { method: 'POST', body: form });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Processing failed.');
  }
  return json.data;
}
