import React from 'react';

export default function HookViewer({ outputData }) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 space-y-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Delivery Tonal Guidance</span>
        <p className="text-xs text-slate-705 dark:text-slate-300 leading-relaxed font-medium">{outputData.toneGuidelines}</p>
      </div>
      <div className="p-5 bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl space-y-2 relative group/hook">
        <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Narrative Hook block</span>
        <p className="text-slate-850 dark:text-white text-sm leading-relaxed whitespace-pre-wrap">{outputData.script}</p>
      </div>
    </div>
  );
}
