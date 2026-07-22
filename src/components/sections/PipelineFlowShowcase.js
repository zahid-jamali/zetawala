'use client';

import React, { useState } from 'react';

const youtubeFlow = [
  { step: '01', name: 'Video Ideas', desc: 'Identify 7 high-scoring, viral trending concepts.' },
  { step: '02', name: 'Title Writer', desc: 'Generate 5 high-CTR, algorithm-optimized titles.' },
  { step: '03', name: 'Hook Architect', desc: 'Draft a 30-second retention hook with tonal guidelines.' },
  { step: '04', name: 'Description Builder', desc: 'Write rich semantic descriptions stacked with SEO keywords.' },
  { step: '05', name: 'Tags Extractor', desc: 'Extract clean tags formatted as comma-separated lists for Studio.' },
  { step: '06', name: 'Thumbnail Prompt', desc: 'Generate graphic concepts and prompts for Midjourney.' },
  { step: '07', name: 'Script Master', desc: 'Build word-for-word audio scripts adjusted for durations.' }
];

const darazFlow = [
  { step: '01', name: 'Product Hunting', desc: 'Simulate demand speeds, saturation levels, margins, and sourcing tips.' },
  { step: '02', name: 'Roman Urdu Keywords', desc: 'Analyze localized Pak search tags mixing English and Urdu phonetics.' }
];

const localCommerceFlow = [
  { step: '01', name: 'WhatsApp Broadcast', desc: 'Draft AIDA Roman Urdu broadcast and Status copy with emojis.' },
  { step: '02', name: 'Local Ad Script', desc: 'Build Facebook/Instagram scripts sized for 15s and 30s creatives.' },
  { step: '03', name: 'Wholesale Negotiation', desc: 'Prepare Shah Alami inquiry and bargaining WhatsApp templates.' },
  { step: '04', name: 'Comment Responder', desc: 'Reply to price comments and complaints with conversion-focused tone.' },
  { step: '05', name: 'Product Storyboard', desc: 'Tell a pain-to-solution story before pitching the product.' }
];

const seoFlow = [
  { step: '01', name: 'Website SEO Audit', desc: 'Score technical & on-page factors with prioritized fix recommendations.' },
  { step: '02', name: 'Technical SEO', desc: 'Validate sitemaps, robots.txt, canonicals, indexability & broken links.' },
  { step: '03', name: 'Content SEO', desc: 'Audit titles, meta tags, keyword density & content structure signals.' }
];

export default function PipelineFlowShowcase() {
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' | 'daraz' | 'local-commerce' | 'seo'

  const activeFlow =
    activeTab === 'youtube'
      ? youtubeFlow
      : activeTab === 'local-commerce'
        ? localCommerceFlow
        : activeTab === 'seo'
          ? seoFlow
          : darazFlow;

  const tabButton = (id, label) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === id ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-800' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'}`}
    >
      {label}
    </button>
  );

  return (
    <section className="bg-white dark:bg-slate-900/40 border-y border-slate-205 dark:border-slate-800 py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Workspace Workflow Pipelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Toggle between YouTube, Daraz, Local Social Commerce & WhatsApp, and SEO & Webmaster workflows to visualize how the micro-tools pass data sequentially.
          </p>
        </div>

        {/* Interactive tab switcher */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-1">
            {tabButton('youtube', 'YouTube Pipeline')}
            {tabButton('daraz', 'Daraz SEO Pipeline')}
            {tabButton('local-commerce', 'WhatsApp & Local Commerce')}
            {tabButton('seo', 'SEO & Webmaster')}
          </div>
        </div>

        {/* Flow Map Visual Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeFlow.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-4">
                <span className="text-3xl font-black text-sky-500/25 dark:text-sky-400/20">{item.step}</span>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
