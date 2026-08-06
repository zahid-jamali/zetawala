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

const calculatorsFlow = [
  { step: '01', name: 'Hourly Rate', desc: 'Set minimum, recommended, and premium freelance rates from goals and taxes.' },
  { step: '02', name: 'Unit Economics', desc: 'Model SaaS pricing, LTV, CAC, and break-even before scaling spend.' },
  { step: '03', name: 'Marketing ROI', desc: 'Estimate returns from content, Google Ads, email, affiliates, and AdSense.' },
  { step: '04', name: 'Ecommerce Margins', desc: 'Net profit after marketplace fees on Amazon, Etsy, eBay, and DTC stores.' }
];

const pdfUtilitiesFlow = [
  { step: '01', name: 'PDF Extract', desc: 'Convert to Markdown, pull tables, links, metadata, and embedded images.' },
  { step: '02', name: 'Excel Convert', desc: 'Generate formulas, explain them, and convert Excel, JSON, and CSV.' },
  { step: '03', name: 'Image Tools', desc: 'View or strip EXIF, extract color palettes, and resize for social platforms.' },
  { step: '04', name: 'Screenshot OCR', desc: 'Turn screenshots into copyable text, TXT, or Markdown.' }
];

const writingFlow = [
  { step: '01', name: 'Humanize & Detect', desc: 'Rewrite AI text to sound natural, then score AI vs human writing signals.' },
  { step: '02', name: 'Grammar & Paraphrase', desc: 'Fix grammar, check plagiarism, and rewrite in fluency, formal, or academic modes.' },
  { step: '03', name: 'Urdu Language', desc: 'Convert Roman Urdu ↔ Urdu script and fix Roman Urdu spelling and grammar.' },
  { step: '04', name: 'Summarize & Rewrite', desc: 'Compress long text into key points or rewrite shorter, longer, or SEO-focused.' }
];

const studyFlow = [
  { step: '01', name: 'Notes & Quizzes', desc: 'Generate study notes and interactive MCQs with scores and review mode.' },
  { step: '02', name: 'PDF & YouTube', desc: 'Turn PDFs into quizzes and YouTube videos into notes, summaries, and quizzes.' },
  { step: '03', name: 'Flashcards & Homework', desc: 'Build flashcards, draft assignments, and get step-by-step homework explanations.' },
  { step: '04', name: 'Typing Practice', desc: 'Speed tests, typing master lessons, and coding typing with certificates.' }
];

const freelancerFlow = [
  { step: '01', name: 'Win Upwork Jobs', desc: 'Proposals, job match scores, cover letters, and interview answers.' },
  { step: '02', name: 'Optimize Profile', desc: 'Profile optimizer, portfolio copy, rates, and contracts.' },
  { step: '03', name: 'Build Fiverr Gigs', desc: 'Titles, descriptions, tags, FAQs, SEO scores, and image text.' },
  { step: '04', name: 'Close & Retain', desc: 'Pricing packages, buyer replies, bios, and review responses.' }
];

const marketplaceFlow = [
  { step: '01', name: 'Listing Copy', desc: 'Titles, descriptions, and keyword research for marketplace SEO.' },
  { step: '02', name: 'SEO Score', desc: 'Analyze listings and optimize quality before publishing.' },
  { step: '03', name: 'Margins & Fees', desc: 'Profit, fee, pricing, and shipping calculators with regional configs.' },
  { step: '04', name: 'Seller Chat', desc: 'Professional and friendly replies to buyer messages.' }
];

export default function PipelineFlowShowcase() {
  const [activeTab, setActiveTab] = useState('youtube');

  const activeFlow =
    activeTab === 'youtube'
      ? youtubeFlow
      : activeTab === 'local-commerce'
        ? localCommerceFlow
        : activeTab === 'seo'
          ? seoFlow
          : activeTab === 'calculators'
            ? calculatorsFlow
            : activeTab === 'pdf-utilities'
              ? pdfUtilitiesFlow
              : activeTab === 'writing'
                ? writingFlow
                : activeTab === 'study'
                  ? studyFlow
                  : activeTab === 'freelancer'
                    ? freelancerFlow
                    : activeTab === 'marketplace'
                      ? marketplaceFlow
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
            Toggle between YouTube, Daraz, Local Social Commerce & WhatsApp, SEO & Webmaster, Calculators, PDF & Image Utilities, AI Writing, AI Study, Freelancer, and Shopee/Lazada marketplace workflows.
          </p>
        </div>

        {/* Interactive tab switcher */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-1">
            {tabButton('youtube', 'YouTube Pipeline')}
            {tabButton('daraz', 'Daraz SEO Pipeline')}
            {tabButton('local-commerce', 'WhatsApp & Local Commerce')}
            {tabButton('seo', 'SEO & Webmaster')}
            {tabButton('calculators', 'Calculators')}
            {tabButton('pdf-utilities', 'PDF & Images')}
            {tabButton('writing', 'AI Writing')}
            {tabButton('study', 'AI Study')}
            {tabButton('freelancer', 'Freelancer')}
            {tabButton('marketplace', 'Shopee / Lazada')}
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
