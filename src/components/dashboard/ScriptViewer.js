'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function ScriptViewer({ script }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!script || !script.introduction) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cardClasses = "p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 relative group shadow-sm";
  const labelClasses = "text-[9px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest block";
  const textClasses = "text-slate-800 dark:text-slate-200 leading-relaxed text-sm whitespace-pre-wrap";
  const btnClasses = "absolute top-3 right-3 p-1.5 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer";

  return (
    <div className="space-y-5 text-slate-800 dark:text-slate-200">
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Production Script Layout</span>
      <div className="space-y-4">
        
        {/* Intro */}
        <div className={cardClasses}>
          <span className={labelClasses}>Introduction</span>
          <p className={textClasses}>{script.introduction}</p>
          <button
            onClick={() => handleCopy(script.introduction, 'intro')}
            className={btnClasses}
          >
            {copiedKey === 'intro' ? <Check className="w-3 h-3 text-indigo-650 dark:text-indigo-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* Body Points */}
        {Array.isArray(script.bodyPoints) && script.bodyPoints.map((point, idx) => (
          <div key={idx} className={cardClasses}>
            <span className={labelClasses}>Point {idx + 1}: {point.sectionTitle}</span>
            <p className={textClasses}>{point.content}</p>
            <button
              onClick={() => handleCopy(point.content, `body-${idx}`)}
              className={btnClasses}
            >
              {copiedKey === `body-${idx}` ? <Check className="w-3 h-3 text-indigo-650 dark:text-indigo-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        ))}

        {/* Outro */}
        <div className={cardClasses}>
          <span className={labelClasses}>Outro & Call-To-Action</span>
          <p className={textClasses}>{script.outro}</p>
          <button
            onClick={() => handleCopy(script.outro, 'outro')}
            className={btnClasses}
          >
            {copiedKey === 'outro' ? <Check className="w-3 h-3 text-indigo-650 dark:text-indigo-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

      </div>
    </div>
  );
}
