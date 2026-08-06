"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

const seoFaqs = [
  {
    q: "What is Zetawala and who is it for?",
    a: "Zetawala is a free multi-suite productivity platform for creators, sellers, and website owners. It combines YouTube automation, Daraz SEO tools, Local Social Commerce & WhatsApp Suite workflows, SEO & Webmaster Intelligence, Business & Marketing Calculators, PDF & Image Utilities, AI Writing & Language Tools, AI Study, Quizzes & Typing, Freelancer Toolkit (Upwork & Fiverr), and Shopee & Lazada Seller Toolkits—so you can research, audit, optimize, and create content without juggling dozens of disconnected apps.",
  },
  {
    q: "What tools are included in SEO & Webmaster Intelligence?",
    a: "The suite includes an SEO Website Checker, Content Audit, Title & Meta Description Analyzer, PageSpeed & Core Web Vitals Analyzer, Internal Link & Orphan Page Analyzer, Broken Link Checker, Sitemap Generator & Validator, Canonical & Indexability Checker, SEO Action Plan Generator, Robots.txt Generator & Tester, Header & Meta Tags Inspector, Traffic & Ad Revenue Estimator, SEO Health Score Calculator, Keyword Density Checker, plus SEO, Keyword, and Content ROI calculators.",
  },
  {
    q: "What calculators does Zetawala include?",
    a: "The Calculators suite has 18 free deterministic tools: freelance hourly rate and project pricing, AI API cost, SaaS pricing, LTV, CAC, break-even, profit margin, content/email/Google Ads ROI, affiliate earnings, AdSense revenue, ecommerce/Amazon FBA/Etsy/eBay profit, and salary-to-hourly conversion—no AI calls required.",
  },
  {
    q: "What PDF & Image Utilities does Zetawala include?",
    a: "Fifteen free utilities: PDF to Markdown, table/link/image extractors, PDF metadata viewer, Excel formula generator and explainer, Excel/JSON/CSV converters, image EXIF viewer and remover, color palette extractor, social image resizer, and screenshot OCR.",
  },
  {
    q: "What AI Writing & Language Tools does Zetawala include?",
    a: "Ten free tools: AI Humanizer, AI Content Detector, Plagiarism Checker, Grammar Checker, Paraphrasing Tool, Roman Urdu → Urdu Converter, Urdu → Roman Urdu Converter, Roman Urdu Grammar & Spell Checker, AI Text Summarizer, and AI Rewrite Tool—powered by DeepSeek for English, Spanish, and Urdu workflows.",
  },
  {
    q: "What AI Study, Quizzes & Typing tools does Zetawala include?",
    a: "Ten free tools: AI Notes Generator, AI Quiz Generator, PDF to Quiz, AI Flashcard Generator, YouTube Study Notes, AI Assignment Generator, AI Homework Solver, Typing Speed Test, Typing Master Course, and Coding Typing Test—AI study tools use DeepSeek; typing tools are pure client logic with certificates.",
  },
  {
    q: "What is the Freelancer Toolkit?",
    a: "Twenty free Upwork and Fiverr tools: proposal and gig generators, analyzers, profile optimizers, pricing packages, contracts, buyer/review replies, and an hourly rate calculator—AI tools use DeepSeek; rate and package math are deterministic. Optional Freelancer Profile prefills shared fields.",
  },
  {
    q: "What Shopee and Lazada seller tools does Zetawala include?",
    a: "Each marketplace has 10 tools: listing title/description generators, keyword research, SEO analyzer, profit/fee/pricing/shipping calculators, chat replies, and listing optimizer. Shared seller math and prompts keep both toolkits consistent while using marketplace-specific defaults.",
  },
  {
    q: "How does Zetawala help with YouTube growth?",
    a: "Zetawala’s YouTube Automation suite helps you discover niches, validate opportunity, analyze channel and video performance, estimate revenue, then generate ideas, titles, hooks, descriptions, tags, scripts, thumbnails prompts, and visuals in a guided pipeline—so research and content creation stay connected.",
  },
  {
    q: "Can Zetawala help Daraz sellers in Pakistan?",
    a: "Yes. The Daraz SEO suite supports product hunting, Roman Urdu keywords, listing titles and descriptions, competitor rewriting, customer replies, FAQ generation, sales copy, and a profit calculator tailored to local marketplace realities—including fees and margin awareness for Pakistani sellers.",
  },
  {
    q: "What is the Local Social Commerce & WhatsApp Suite?",
    a: "It is built for Pakistani social sellers who market on WhatsApp, Facebook, and Instagram. You can draft AIDA-style broadcast and Status copy in Roman Urdu, generate local ad scripts, prepare wholesale negotiation messages (e.g. Shah Alami), reply to price comments, and create story-driven product posts.",
  },
  {
    q: "Does Zetawala use real website data for SEO audits?",
    a: "Yes for technical checks. SEO tools fetch public page data on the server, parse HTML/XML, calculate scores and issue lists, and use Google PageSpeed Insights for performance metrics where configured. AI (DeepSeek) is used only to interpret results and recommend next steps—not to invent crawl statistics.",
  },
  {
    q: "Are Zetawala tools free to use?",
    a: "Zetawala is designed as a free, ad-supported toolkit. You can open suite workspaces from the homepage and run tools without installing software. Some analysis endpoints may use fair-use rate limits and optional captcha to keep the platform stable for everyone.",
  },
  {
    q: "How should beginners start an SEO audit on Zetawala?",
    a: "Start with the SEO Website Checker for a broad scan, then run PageSpeed & Core Web Vitals if the site feels slow, Content Audit for thin or poorly structured pages, Canonical & Indexability Checker if pages are not getting indexed, and finish with the SEO Health Score and SEO Action Plan Generator for a prioritized roadmap.",
  },
  {
    q: "Is Zetawala mobile friendly?",
    a: "Yes. The full layout is responsive with Tailwind CSS, so YouTube, Daraz, WhatsApp, SEO, Calculators, PDF Utilities, AI Writing, AI Study, Freelancer, Shopee, and Lazada workspaces remain usable on phones, tablets, and desktops.",
  },
];

export default function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-850 py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Clear answers about Zetawala’s YouTube, Daraz, WhatsApp, SEO & Webmaster, Calculators, PDF & Image Utilities, AI Writing, AI Study, Freelancer, Shopee, and Lazada tools.
          </p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {seoFaqs.map((faq, idx) => (
            <details key={idx} className="group transition-all">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/45 select-none [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="px-6 pb-6 pt-1 animate-slide-down">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
