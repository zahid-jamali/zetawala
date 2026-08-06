import React from 'react';
import Link from 'next/link';
import { Video, ShoppingBag, MessageCircle, Search, Calculator, FileStack, PenLine, BookOpen, Briefcase, Store, Layers, Globe, Cpu } from 'lucide-react';

export default function FeaturesGrid() {
  const cardClasses = "bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300";
  const featureBoxClasses = "p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl shadow-sm hover:border-sky-500/30 dark:hover:border-sky-500/20 transition-all";

  return (
    <>
      {/* 3. Main Workspace Portfolio Grid */}
      <section id="workspace-portfolio" className="max-w-6xl mx-auto px-6 py-20 space-y-12 scroll-mt-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Access SEO & Automation Suites
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Select a suite pack below to enter the live workspace dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          {/* YouTube Automation Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 flex items-center justify-center">
                <Video className="w-6 h-6 text-red-650 dark:text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">YouTube Automation Pack</h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-medium">
                  Supercharge creator workflows with niche research, channel/video intelligence, revenue estimates, plus a full content pipeline—ideas, titles, hooks, scripts, tags, thumbnails, and visuals.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/tools/youtube/youtube-niche-finder"
                className="w-full py-3.5 rounded-2xl bg-red-650 hover:bg-red-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open YouTube Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Daraz SEO Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-orange-650 dark:text-orange-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Daraz SEO & Conversion Pack</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Dominate Pakistan&apos;s local e-commerce marketplace. Build highly optimized titles, draft descriptions, optimize keywords, respond to negative reviews, and simulate FBM/FBD net profit margins.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/tools/daraz/daraz-product-hunting"
                className="w-full py-3.5 rounded-2xl bg-orange-650 hover:bg-orange-750 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open Daraz Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Local Social Commerce & WhatsApp Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Local Social Commerce & WhatsApp Suite</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Scale WhatsApp broadcasts, Meta ad scripts, Shah Alami wholesale negotiations, social comment replies, and story-driven product posts in natural Roman Urdu for Pakistani buyers.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/tools/local-commerce/whatsapp-broadcast-status-copywriter"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open Local Commerce Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* SEO & Webmaster Intelligence Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center">
                <Search className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">SEO & Webmaster Intelligence</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Run technical audits, PageSpeed & Core Web Vitals checks, sitemap validation, canonical/indexability reviews, and ROI calculators—everything webmasters need to diagnose and prioritize SEO fixes.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/seo"
                className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open SEO Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Calculators Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/30 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Business & Marketing Calculators</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Instant freelance rates, SaaS pricing, LTV, CAC, ads ROI, AdSense, affiliate earnings, and ecommerce profit math—deterministic formulas with no AI dependency.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/calculators"
                className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open Calculators Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* PDF & Image Utilities Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30 flex items-center justify-center">
                <FileStack className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">PDF & Image Utilities</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Convert PDFs to Markdown, extract tables and links, Excel converters, EXIF tools, color palettes, social image resizers, and screenshot OCR—all free, server-side utilities.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/pdf-utilities"
                className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open PDF Utilities Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* AI Writing & Language Tools Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center">
                <PenLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">AI Writing & Language Tools</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Humanize AI text, detect AI content, check grammar and plagiarism, paraphrase, convert Roman Urdu ↔ Urdu, summarize, and rewrite—10 free language tools powered by DeepSeek.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/writing"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open AI Writing Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* AI Study, Quizzes & Typing Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">AI Study, Quizzes & Typing</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  AI notes, quizzes, PDF-to-quiz, flashcards, YouTube study notes, assignments, homework help, plus typing speed, typing master, and coding typing tests with certificates.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/study"
                className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open Study Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Freelancer Toolkit Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Freelancer Toolkit</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Upwork and Fiverr hubs with 20 tools—proposals, gig SEO, profiles, pricing, contracts, buyer replies, and an optional shared freelancer profile.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link
                href="/freelancer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Open Freelancer Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 flex items-center justify-center">
                <Store className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Shopee Seller Toolkit</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Listing titles, descriptions, keywords, SEO scores, profit/fee/pricing/shipping math, chat replies, and listing optimizer for Shopee sellers.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link href="/shopee" className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                Open Shopee Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Lazada Seller Toolkit</h3>
                <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed font-medium">
                  Same shared seller engine for Lazada—listing SEO, keywords, calculators, shipping estimates, chat replies, and listing optimization.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Link href="/lazada" className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                Open Lazada Workspace
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Brand Quality Features */}
      <section className="bg-slate-100/50 dark:bg-slate-900/10 border-y border-slate-205 dark:border-slate-800 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Professionals Choose ZetaWala
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Engineered for local market niches and content creator workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={featureBoxClasses}>
              <Layers className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-4" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">Integrated Pipeline Flow</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                No need to copy-paste between separate tools. Run titles, scripts, and visuals as a continuous sequential pipeline.
              </p>
            </div>

            <div className={featureBoxClasses}>
              <Globe className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mb-4" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">Localized Pak SEO Tools</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Get target keyword lists mixing English and Roman Urdu phonetics tailored for Pakistan&apos;s search volumes.
              </p>
            </div>

            <div className={featureBoxClasses}>
              <Cpu className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2">DeepSeek Completion Power</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Driven by high-performance models returning clean structured JSON lists without conversational descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
