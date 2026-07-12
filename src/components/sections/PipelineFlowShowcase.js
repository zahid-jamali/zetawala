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

export default function PipelineFlowShowcase() {
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' | 'daraz'

  const activeFlow = activeTab === 'youtube' ? youtubeFlow : darazFlow;

  return (
    <section className="bg-white dark:bg-slate-900/40 border-y border-slate-205 dark:border-slate-800 py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Workspace Workflow Pipelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Toggle between platforms to visualize how the micro-tools pass data sequentially.
          </p>
        </div>

        {/* Interactive tab switcher */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('youtube')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'youtube' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-800' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
              YouTube Pipeline
            </button>
            <button
              onClick={() => setActiveTab('daraz')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'daraz' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-800' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300'}`}
            >
              Daraz SEO Pipeline
            </button>
          </div>
        </div>

        {/* Flow Map Visual Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeFlow.map((item, idx) => (
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
