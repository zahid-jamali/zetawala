'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function TagGrid({ tags }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Robust parsing: handles arrays, objects containing tags, or comma-separated strings
  let tagsArray = [];
  if (Array.isArray(tags)) {
    tagsArray = tags;
  } else if (typeof tags === 'string') {
    tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
  } else if (tags && typeof tags === 'object') {
    const rawTags = tags.tags || tags.keywords || [];
    if (Array.isArray(rawTags)) {
      tagsArray = rawTags;
    } else if (typeof rawTags === 'string') {
      tagsArray = rawTags.split(',').map(t => t.trim()).filter(Boolean);
    }
  }

  if (tagsArray.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500 dark:text-slate-400">
        No tags available to render.
      </div>
    );
  }

  const handleCopy = (text, index = null) => {
    navigator.clipboard.writeText(text);
    if (index !== null) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="space-y-5 text-slate-800 dark:text-slate-200">
      
      {/* High-Visibility Header Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-850 rounded-2xl">
        <div>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">Tags Extractor Output</span>
          <p className="text-xs text-slate-600 dark:text-slate-350 mt-0.5">{tagsArray.length} keywords extracted cleanly</p>
        </div>
        <button
          onClick={() => handleCopy(tagsArray.join(', '))}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border border-transparent dark:border-slate-200"
        >
          {copiedAll ? <Check className="w-4 h-4 text-white dark:text-slate-900" /> : <Copy className="w-4 h-4" />}
          Copy All Tags (YouTube Studio Format)
        </button>
      </div>
      
      {/* Horizontal wrapping box grid */}
      <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 rounded-2xl">
        {tagsArray.map((tag, idx) => (
          <div 
            key={idx} 
            onClick={() => handleCopy(tag, idx)}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title="Click to copy single tag"
          >
            <span className="font-medium">{tag}</span>
            <span className="shrink-0 text-slate-400 dark:text-slate-650">
              {copiedIndex === idx ? <Check className="w-3 h-3 text-indigo-650 dark:text-indigo-400" /> : <Copy className="w-3 h-3" />}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
