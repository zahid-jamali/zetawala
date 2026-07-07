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

      {/* Group A: Keywords & FAQs */}
      {['daraz-keywords', 'faq-generator'].includes(toolSlug) && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product Focus or Seed Keywords</label>
          <input
            ref={inputRef}
            type="text"
            required
            value={toolInputs.product || ''}
            onChange={(e) => handleInputChange('product', e.target.value)}
            className={inputClasses}
            placeholder="e.g. Bluetooth wireless mouse, silk bedsheet"
          />
        </div>
      )}

      {/* Group B: Product Titles, Descriptions, Benefits, Sales Copy */}
      {['product-title', 'product-description', 'benefits-generator', 'sales-copy'].includes(toolSlug) && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product Name / Focus</label>
            <input
              ref={inputRef}
              type="text"
              required
              value={toolInputs.product || ''}
              onChange={(e) => handleInputChange('product', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Ergonomic Office Chair"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Key Features / Specs</label>
            <textarea
              required
              value={toolInputs.features || ''}
              onChange={(e) => handleInputChange('features', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Mesh backrest, adjustable height, 3D armrests, heavy duty wheels"
              rows={4}
            />
          </div>
        </>
      )}

      {/* Group C: Rewriter, Support Replies, Negative Replies */}
      {['competitor-rewriter', 'customer-reply', 'negative-reply'].includes(toolSlug) && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            {toolSlug === 'competitor-rewriter' ? 'Competitor Listing Text' : toolSlug === 'customer-reply' ? 'Customer Message' : 'Customer Review'}
          </label>
          <textarea
            ref={inputRef}
            required
            value={toolInputs.textToAnalyze || ''}
            onChange={(e) => handleInputChange('textToAnalyze', e.target.value)}
            className={inputClasses}
            placeholder={
              toolSlug === 'competitor-rewriter' 
                ? "Paste competitor description or title..." 
                : toolSlug === 'customer-reply' 
                ? "Paste customer inquiry message..." 
                : "Paste customer negative review text..."
            }
            rows={5}
          />
        </div>
      )}

      {/* Group D: Listing Optimizer */}
      {toolSlug === 'listing-optimizer' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Current Title</label>
            <input
              ref={inputRef}
              type="text"
              required
              value={toolInputs.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={inputClasses}
              placeholder="e.g. wireless mouse 10m range black color"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Current Description / Highlights</label>
            <textarea
              required
              value={toolInputs.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={inputClasses}
              placeholder="Paste current listing details..."
              rows={4}
            />
          </div>
        </>
      )}

      {/* Group E: Financial Calculators */}
      {['cost-calculator', 'profit-calculator'].includes(toolSlug) && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Source Cost (PKR)</label>
              <input
                ref={inputRef}
                type="number"
                required
                value={toolInputs.sourceCost || ''}
                onChange={(e) => handleInputChange('sourceCost', e.target.value)}
                className={inputClasses}
                placeholder="Purchase cost"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Selling Price (PKR)</label>
              <input
                type="number"
                required
                value={toolInputs.sellingPrice || ''}
                onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                className={inputClasses}
                placeholder="Daraz retail price"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Category Comm. (%)</label>
              <input
                type="number"
                required
                value={toolInputs.commissionRate || '10'}
                onChange={(e) => handleInputChange('commissionRate', e.target.value)}
                className={inputClasses}
                placeholder="e.g. 8, 10, 15"
              />
            </div>
            {toolSlug === 'cost-calculator' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={toolInputs.weight || '0.5'}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={inputClasses}
                  placeholder="e.g. 0.2"
                />
              </div>
            )}
          </div>
        </>
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
