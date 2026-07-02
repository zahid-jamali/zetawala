'use client';

import React from 'react';
import { HelpCircle, Check, Copy } from 'lucide-react';

export default function DarazTrafficKeywords({
  keywordOutput,
  selectedKeywords,
  toggleKeyword,
  handleCopyKeywords,
  copied
}) {
  return (
    <div className="flex flex-col justify-between h-full space-y-6 w-full text-slate-800 dark:text-slate-200">
      <div className="space-y-4 flex-1">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daraz Traffic Keywords</h3>
          {selectedKeywords?.length > 0 && (
            <button
              onClick={handleCopyKeywords}
              className="text-[10px] text-slate-605 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 transition-all cursor-pointer font-bold"
            >
              {copied ? <Check className="w-3 h-3 text-indigo-650 dark:text-indigo-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy Selected'}
            </button>
          )}
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
          Pakistani search intent tags mixing English and Roman Urdu search queries. Checkbox-select to export.
        </p>

        {keywordOutput && Array.isArray(keywordOutput) ? (
          <div className="space-y-1.5 overflow-y-auto max-h-[350px] pr-1 custom-scrollbar">
            {keywordOutput.map((kw, idx) => {
              const isChecked = selectedKeywords?.includes(kw);
              return (
                <div 
                  key={idx}
                  onClick={() => toggleKeyword(kw)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isChecked 
                      ? 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-500 text-indigo-900 dark:text-white' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-900 hover:border-slate-350 dark:hover:border-slate-800 text-slate-700 dark:text-slate-400'
                  }`}
                >
                  <span className="truncate pr-2 font-medium">{kw}</span>
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                    isChecked 
                      ? 'bg-indigo-600 border-indigo-500 text-white' 
                      : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 dark:text-slate-400">
            No keywords found.
          </div>
        )}
      </div>
    </div>
  );
}
