'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send, Loader2 } from 'lucide-react';
import { setToolInput } from '../../store/toolSlice';
import TurnstileWidget from './TurnstileWidget';

export default function ToolInputForm({ toolSlug, onSubmit, inputRef, onSecurityTokenChange, securityToken, turnstileResetKey = 0 }) {
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
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-450 uppercase tracking-wider block">Optimized Video Title</label>
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

      {toolSlug === 'visuals-recommender' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-650 dark:text-slate-450 uppercase tracking-wider block">Required Visual Recommendations</label>
            <select
              value={toolInputs.visualsType || 'all'}
              onChange={(e) => handleInputChange('visualsType', e.target.value)}
              className={inputClasses}
            >
              <option value="all">All Three (Visual Idea, Keywords & AI Prompts)</option>
              <option value="idea">Visual Idea Only</option>
              <option value="keywords">Stock Search Keywords Only</option>
              <option value="prompt">AI / VEO Prompts Only</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-650 dark:text-slate-450 uppercase tracking-wider block">Video Narration Script</label>
            <textarea
              ref={inputRef}
              required
              value={toolInputs.scriptText || ''}
              onChange={(e) => handleInputChange('scriptText', e.target.value)}
              className={inputClasses}
              placeholder="Paste your video narrative script here to generate visual recommendations scene by scene..."
              rows={8}
            />
          </div>
        </>
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

      {/* Local Social Commerce: WhatsApp Broadcast & Status Copywriter */}
      {toolSlug === 'whatsapp-broadcast' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product Name</label>
            <input
              ref={inputRef}
              type="text"
              required
              value={toolInputs.productName || ''}
              onChange={(e) => handleInputChange('productName', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Silk Dupatta Set, Mini Air Fryer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product Details / Offer</label>
            <textarea
              required
              value={toolInputs.productDetails || ''}
              onChange={(e) => handleInputChange('productDetails', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Buy 2 Get 1 Free, Free Delivery Lahore, Cash on Delivery"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Target Audience</label>
            <input
              type="text"
              required
              value={toolInputs.targetAudience || ''}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Ladies 18-35 in Lahore, students, housewives"
            />
          </div>
        </>
      )}

      {/* Local Social Commerce: Facebook/Instagram Local Ad Script */}
      {toolSlug === 'local-ad-script' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product Category</label>
            <input
              ref={inputRef}
              type="text"
              required
              value={toolInputs.productCategory || ''}
              onChange={(e) => handleInputChange('productCategory', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Kitchen Gadgets, Skincare, Kids Fashion"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Unique Selling Proposition (USP)</label>
            <textarea
              required
              value={toolInputs.usp || ''}
              onChange={(e) => handleInputChange('usp', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Chops vegetables in 10 seconds, waterproof, COD available"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Video Length</label>
            <select
              value={toolInputs.videoLength || '15s'}
              onChange={(e) => handleInputChange('videoLength', e.target.value)}
              className={inputClasses}
            >
              <option value="15s">15s (Short Hook Ad)</option>
              <option value="30s">30s (Demo / Story Ad)</option>
              <option value="60s">60s (Longer Story Ad)</option>
            </select>
          </div>
        </>
      )}

      {/* Local Social Commerce: Wholesale Supplier Negotiation Drafter */}
      {toolSlug === 'wholesale-negotiation' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product to Source</label>
            <input
              ref={inputRef}
              type="text"
              required
              value={toolInputs.productToSource || ''}
              onChange={(e) => handleInputChange('productToSource', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Bluetooth Neckband, Cotton Bedsheet"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Expected Quantity</label>
            <input
              type="text"
              required
              value={toolInputs.expectedQuantity || ''}
              onChange={(e) => handleInputChange('expectedQuantity', e.target.value)}
              className={inputClasses}
              placeholder="e.g. 50 pcs, 100 dozen, 2 cartons"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Target Price / Questions</label>
            <textarea
              required
              value={toolInputs.targetPriceQuestions || ''}
              onChange={(e) => handleInputChange('targetPriceQuestions', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Target Rs. 450 each, sample available? delivery Lahore?"
              rows={4}
            />
          </div>
        </>
      )}

      {/* Local Social Commerce: Social Media Price & Comment Responder */}
      {toolSlug === 'social-comment-responder' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Customer&apos;s Comment</label>
            <textarea
              ref={inputRef}
              required
              value={toolInputs.customerComment || ''}
              onChange={(e) => handleInputChange('customerComment', e.target.value)}
              className={inputClasses}
              placeholder='e.g. "Price please" or "Delivery late thi, bohot gussa hai"'
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Desired Tone</label>
            <select
              value={toolInputs.desiredTone || 'Polite'}
              onChange={(e) => handleInputChange('desiredTone', e.target.value)}
              className={inputClasses}
            >
              <option value="Polite">Polite</option>
              <option value="Professional">Professional</option>
              <option value="Apologetic">Apologetic</option>
            </select>
          </div>
        </>
      )}

      {/* Local Social Commerce: One-Page Product Storyboard */}
      {toolSlug === 'product-storyboard' && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Product Features</label>
            <textarea
              ref={inputRef}
              required
              value={toolInputs.productFeatures || ''}
              onChange={(e) => handleInputChange('productFeatures', e.target.value)}
              className={inputClasses}
              placeholder="e.g. USB rechargeable, 3 heat modes, portable pouch"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Customer Pain Point It Solves</label>
            <textarea
              required
              value={toolInputs.customerPainPoint || ''}
              onChange={(e) => handleInputChange('customerPainPoint', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Winter me haath thand se sooj jate hain"
              rows={4}
            />
          </div>
        </>
      )}


      <TurnstileWidget onTokenChange={onSecurityTokenChange} resetKey={turnstileResetKey} />

      <button
        type="submit"
        disabled={loading || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !securityToken)}
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
