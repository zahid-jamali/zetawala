'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Check, Copy, ArrowRight, Sparkles } from 'lucide-react';
import { setToolInput } from '../../store/toolSlice';
import { getSeoPath } from '../../config/routes';

export default function ScriptViewer({ script }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [copiedKey, setCopiedKey] = useState(null);
  const [copiedFull, setCopiedFull] = useState(false);

  if (!script || !script.introduction) return null;

  const getFullScriptText = () => {
    let text = `[INTRODUCTION]\n${script.introduction}\n\n`;
    if (Array.isArray(script.bodyPoints)) {
      script.bodyPoints.forEach((point, idx) => {
        text += `[POINT ${idx + 1}: ${point.sectionTitle}]\n${point.content}\n\n`;
      });
    }
    text += `[OUTRO]\n${script.outro}`;
    return text.trim();
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyFullScript = () => {
    const fullText = getFullScriptText();
    navigator.clipboard.writeText(fullText);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleForwardToVisuals = () => {
    const fullText = getFullScriptText();
    dispatch(setToolInput({
      toolSlug: 'visuals-recommender',
      field: 'scriptText',
      value: fullText
    }));
    router.push(getSeoPath('youtube', 'visuals-recommender'));
  };

  const cardClasses = "p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 relative group shadow-sm";
  const labelClasses = "text-[9px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest block";
  const textClasses = "text-slate-800 dark:text-slate-200 leading-relaxed text-sm whitespace-pre-wrap";
  const btnClasses = "absolute top-3 right-3 p-1.5 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-805 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer";

  return (
    <div className="space-y-5 text-slate-800 dark:text-slate-200">
      
      {/* Visual Workspace Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-150 dark:border-slate-800 pb-3">
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
          Production Script Layout
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {/* 1-Click Copy Full Script */}
          <button
            type="button"
            onClick={handleCopyFullScript}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedFull ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
            {copiedFull ? 'Copied Full Script' : 'Copy Full Script'}
          </button>
          
          {/* Forward Script to Visuals */}
          <button
            type="button"
            onClick={handleForwardToVisuals}
            className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm border border-transparent dark:border-slate-200 transition-colors"
          >
            Forward to Visuals
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

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
