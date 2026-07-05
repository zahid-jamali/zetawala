'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send, Loader2 } from 'lucide-react';
import { setToolInput } from '../../store/toolSlice';

export default function ToolInputForm({ toolSlug, onSubmit, inputRef }) {
  const dispatch = useDispatch();
  const { loading, inputs } = useSelector((state) => state.tools);
  const toolInputs = inputs[toolSlug] || {};

  const handleInputChange = (field, value) => {
    dispatch(setToolInput({ toolSlug, field, value }));
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";

  return (
    <form onSubmit={onSubmit} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-5 shadow-sm">
      
      {toolSlug === 'video-ideas' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Target Channel Niche</label>
          <input
            ref={inputRef}
            type="text"
            required
            value={toolInputs.niche || ''}
            onChange={(e) => handleInputChange('niche', e.target.value)}
            className={inputClasses}
            placeholder="e.g. Mechanical Keyboard reviews, Solo Travel vlogs"
          />
        </div>
      )}

      {toolSlug === 'title-generator' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Target Niche</label>
            <input
              type="text"
              required
              value={toolInputs.niche || ''}
              onChange={(e) => handleInputChange('niche', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Keyboard Reviews"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Video Concept / Idea</label>
            <textarea
              ref={inputRef}
              required
              value={toolInputs.idea || ''}
              onChange={(e) => handleInputChange('idea', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Reviewing the cheapest mechanical keyboard available locally on Daraz"
              rows={4}
            />
          </div>
        </>
      )}

      {['hook-architect', 'description-builder', 'tags-extractor', 'thumbnail-prompt'].includes(toolSlug) && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Optimized Video Title</label>
          <input
            ref={inputRef}
            type="text"
            required
            value={toolInputs.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={inputClasses}
            placeholder="e.g. I Bought the Cheapest Keyboard on Daraz — Is it E-Waste?"
          />
        </div>
      )}

      {toolSlug === 'script-master' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Optimized Video Title</label>
            <input
              ref={inputRef}
              type="text"
              required
              value={toolInputs.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={inputClasses}
              placeholder="e.g. I Bought the Cheapest Keyboard on Daraz — Is it E-Waste?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Target Duration / Format</label>
            <select
              value={toolInputs.duration || '5'}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className={inputClasses}
            >
              <option value="shorts">YouTube Shorts / Reel (under 60s)</option>
              <option value="3">3 Minutes (Long Form)</option>
              <option value="5">5 Minutes (Long Form)</option>
              <option value="8">8 Minutes (Long Form)</option>
              <option value="12">12 Minutes (Long Form)</option>
            </select>
          </div>
        </>
      )}

      {toolSlug === 'product-hunting' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product Niche or Seed query</label>
          <input
            ref={inputRef}
            type="text"
            required
            value={toolInputs.seed || ''}
            onChange={(e) => handleInputChange('seed', e.target.value)}
            className={inputClasses}
            placeholder="e.g. Lightweight dry iron, wireless charger, study lamp..."
          />
        </div>
      )}

      {toolSlug === 'roman-urdu-keywords' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Specific Product Focus</label>
          <input
            ref={inputRef}
            type="text"
            required
            value={toolInputs.product || ''}
            onChange={(e) => handleInputChange('product', e.target.value)}
            className={inputClasses}
            placeholder="e.g. RGB Mechanical Keyboard"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 mt-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer border border-transparent dark:border-slate-200"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Interrogating Model...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Generate Output
          </>
        )}
      </button>

    </form>
  );
}
