'use client';

import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { seoData } from '../../config/seo';
import BlogCarousel from './BlogCarousel';

export default function ToolSeoSection({ toolSlug }) {
  const data = seoData[toolSlug];
  
  if (!data) return null;

  // Determine matching blog category for interlinking
  const isYoutube = [
    'video-ideas', 'title-generator', 'hook-architect', 'description-builder',
    'tags-extractor', 'thumbnail-prompt', 'script-master', 'visuals-recommender'
  ].includes(toolSlug);

  const isLocalCommerce = [
    'whatsapp-broadcast', 'local-ad-script', 'wholesale-negotiation',
    'social-comment-responder', 'product-storyboard'
  ].includes(toolSlug);

  const blogCategory = isYoutube
    ? 'youtube'
    : isLocalCommerce
      ? 'local-commerce'
      : 'daraz';

  return (
    <div className="mt-12 pt-12 border-t border-slate-205 dark:border-slate-800 space-y-10 text-slate-900 dark:text-slate-100">
      
      {/* 1. SEO Description */}
      <section className="grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 space-y-1">
          <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
            Algorithm Optimization & SEO Insights
          </h3>
          <p className="text-[11px] text-slate-500">How this metadata tool helps search visibility & content ranking.</p>
        </div>
        <div className="md:col-span-8 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-xs leading-relaxed text-slate-700 dark:text-slate-303">
          <p>{data.description}</p>
        </div>
      </section>

      {/* 2. Tool Example Sandbox */}
      {data.example && (
        <section className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 space-y-1">
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              Practical Usage Example
            </h3>
            <p className="text-[11px] text-slate-500">Standard input parameters and the expected optimization output.</p>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Sample Input</span>
              <p className="text-xs font-mono text-slate-650 dark:text-slate-400 whitespace-pre-wrap">{data.example.input}</p>
            </div>
            <div className="p-5 bg-sky-50/30 dark:bg-sky-950/10 border border-sky-100/50 dark:border-sky-900/20 rounded-2xl space-y-2">
              <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Generated Output</span>
              <p className="text-xs font-mono text-slate-750 dark:text-slate-300 whitespace-pre-wrap">{data.example.output}</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. SEO FAQ Accordions */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 space-y-1">
            <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-[11px] text-slate-500">Essential answers to technical ranking & search indexing questions.</p>
          </div>
          <div className="md:col-span-8 space-y-3">
            {data.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all shadow-sm"
              >
                <summary className="flex items-center justify-between p-4 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-850/30 transition-colors">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:-rotate-180 transition-transform duration-200" />
                </summary>
                <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 text-xs leading-relaxed text-slate-650 dark:text-slate-350">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 4. Dynamic Related Blog Posts Interlinking Carousel */}
      <BlogCarousel category={blogCategory} />

    </div>
  );
}
