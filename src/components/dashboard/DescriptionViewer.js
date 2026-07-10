import React from 'react';

export default function DescriptionViewer({ outputData }) {
  return (
    <div className="space-y-2 h-full flex flex-col">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Rich Text Preview</span>
      <textarea
        readOnly
        value={outputData.description}
        className="flex-1 w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-mono focus:outline-none h-[300px] resize-none"
      />
    </div>
  );
}
