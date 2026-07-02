'use client';

import React, { useState } from 'react';
import { TrendingUp, ChevronDown, Check, Copy } from 'lucide-react';

export default function TitleList({ titles, onSendToTool }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!Array.isArray(titles)) return null;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-3 text-slate-800 dark:text-slate-200">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">algorithm-optimized titles</p>
      {titles.map((title, idx) => (
        <div 
          key={idx} 
          className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 transition-all rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 group relative shadow-sm"
        >
          <div className="flex gap-3">
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <span className="text-slate-800 dark:text-white font-medium">{title}</span>
          </div>
          
          <div className="flex items-center gap-2 justify-end relative shrink-0">
            <button
              onClick={() => handleCopy(title, idx)}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
              title="Copy Title"
            >
              {copiedIdx === idx ? <Check className="w-4 h-4 text-indigo-605 dark:text-indigo-455" /> : <Copy className="w-4 h-4" />}
            </button>
            
            <div className="relative flex items-center justify-center">
              <button
                onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-[11px] font-bold flex items-center justify-center gap-1 transition-all border border-transparent dark:border-slate-200 cursor-pointer"
              >
                Forward To
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              {activeDropdown === idx && (
                <div className="absolute right-0 bottom-full sm:bottom-auto sm:top-full z-10 mt-1 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden py-1">
                  {[
                    { label: 'Hook Architect', slug: 'hook-architect' },
                    { label: 'Script Master', slug: 'script-master' },
                    { label: 'Description Builder', slug: 'description-builder' },
                    { label: 'Tags Extractor', slug: 'tags-extractor' },
                    { label: 'Thumbnail Prompter', slug: 'thumbnail-prompt' }
                  ].map((tgt) => (
                    <button
                      key={tgt.slug}
                      onClick={() => {
                        onSendToTool(title, tgt.slug);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      🚀 {tgt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
