'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function IdeaCard({ ideas, onSendToTitle }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!Array.isArray(ideas)) return null;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-3 text-slate-800 dark:text-slate-200">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">trending ideas catalog</p>
      {ideas.map((idea, idx) => (
        <div 
          key={idx} 
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 transition-all rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm shrink-0">#{idx + 1}</span>
            <span className="text-slate-800 dark:text-white font-medium">{idea}</span>
          </div>
          <div className="flex items-center gap-2 justify-end shrink-0">
            <button
              onClick={() => handleCopy(idea, idx)}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title="Copy Idea"
            >
              {copiedIdx === idx ? <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onSendToTitle(idea)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-[11px] font-bold shrink-0 transition-all cursor-pointer border border-transparent dark:border-slate-200"
            >
              ⚡ Send to Title
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
