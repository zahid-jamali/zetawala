'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function PromptList({ prompts }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!Array.isArray(prompts)) return null;

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Midjourney / DALL-E 3 Prompts</p>
      {prompts.map((item, idx) => (
        <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 group/prompt relative shadow-sm">
          <span className="text-[10px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest block">Concept Prompt #{idx + 1}</span>
          <p className="text-slate-800 dark:text-slate-200 text-xs select-all bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-850 leading-relaxed font-mono pr-10">
            {item.prompt}
          </p>
          <button
            onClick={() => handleCopy(item.prompt, idx)}
            className="absolute top-3 right-3 p-1.5 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover/prompt:opacity-100 transition-all cursor-pointer"
          >
            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <p className="text-[11px] text-slate-700 dark:text-slate-350 leading-normal">
            <strong>Design Psychology:</strong> {item.psychologicalTrigger}
          </p>
        </div>
      ))}
    </div>
  );
}
