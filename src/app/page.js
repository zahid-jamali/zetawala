"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Video,
  ShoppingBag,
  ArrowRight,
  Zap,
  Layers,
  Globe,
  Cpu,
  Sparkles,
  Award,
} from "lucide-react";
import FAQSection from "../components/sections/FAQSection";

const youtubeFlow = [
  {
    step: "01",
    name: "Video Ideas",
    desc: "Identify 7 high-scoring, viral trending concepts.",
  },
  {
    step: "02",
    name: "Title Writer",
    desc: "Generate 5 high-CTR, algorithm-optimized titles.",
  },
  {
    step: "03",
    name: "Hook Architect",
    desc: "Draft a 30-second retention hook with tonal guidelines.",
  },
  {
    step: "04",
    name: "Description Builder",
    desc: "Write rich semantic descriptions stacked with SEO keywords.",
  },
  {
    step: "05",
    name: "Tags Extractor",
    desc: "Extract clean tags formatted as comma-separated lists for Studio.",
  },
  {
    step: "06",
    name: "Thumbnail Prompt",
    desc: "Generate graphic concepts and prompts for Midjourney.",
  },
  {
    step: "07",
    name: "Script Master",
    desc: "Build word-for-word audio scripts adjusted for durations.",
  },
];

const darazFlow = [
  {
    step: "01",
    name: "Product Hunting",
    desc: "Simulate demand speeds, saturation levels, margins, and sourcing tips.",
  },
  {
    step: "02",
    name: "Roman Urdu Keywords",
    desc: "Analyze localized Pak search tags mixing English and Urdu phonetics.",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("youtube"); // 'youtube' | 'daraz'

  const cardClasses =
    "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300";
  const featureBoxClasses =
    "p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:border-sky-500/30 dark:hover:border-sky-500/20 transition-all";

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 1. Hero Section: py-28 */}
      <section className="relative px-6 py-28 text-center max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Automated Assets & Productivity Systems</span>
        </div>

        {/* Commanding Headline with Sky-Blue Accent highlights */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] max-w-4xl mx-auto">
          Automated Digital Assets & Financial Stability through{" "}
          <span className="text-sky-600 dark:text-sky-400">
            E-Commerce & Video AI Utilities
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 dark:text-slate-305 max-w-2xl mx-auto leading-relaxed font-medium">
          Eliminate hours of manual optimization. Run automated pipelines to
          evaluate product demand, export Urdu search keywords, outline
          narrative hooks, and write full video scripts instantly.
        </p>

        <div className="pt-4 pb-12">
          <a
            href="#workspace-portfolio"
            className="px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all shadow-lg shadow-sky-500/10 hover:scale-[1.01] inline-flex items-center gap-2 cursor-pointer border border-transparent"
          >
            Launch Tool Packs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Dashboard Mockup Showcase Container */}
        <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-2 shadow-xl backdrop-blur-md">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
            <Image
              src="/images/dashboard_mockup.png"
              alt="ZetaWala Premium AI SaaS Dashboard Mockup"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-w-4xl) 100vw"
            />
          </div>
        </div>
      </section>

      {/* 2. "How It Works" Flow Switcher / Tabs System */}
      <section className="bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Workspace Workflow Pipelines
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Toggle between platforms to visualize how the micro-tools pass
              data sequentially.
            </p>
          </div>

          {/* Interactive tab switcher */}
          <div className="flex justify-center">
            <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setActiveTab("youtube")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "youtube"
                    ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-800"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                YouTube Pipeline
              </button>
              <button
                onClick={() => setActiveTab("daraz")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "daraz"
                    ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm border border-slate-200 dark:border-slate-800"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
                }`}
              >
                Daraz Engine
              </button>
            </div>
          </div>

          {/* Sequential map rendering */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeTab === "youtube"
              ? youtubeFlow.map((flow) => (
                  <div
                    key={flow.step}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-start gap-4 hover:scale-[1.01] transition-all"
                  >
                    <span className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center font-bold text-sky-600 dark:text-sky-400 shrink-0 text-xs mt-0.5">
                      {flow.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {flow.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal font-medium">
                        {flow.desc}
                      </p>
                    </div>
                  </div>
                ))
              : darazFlow.map((flow) => (
                  <div
                    key={flow.step}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-start gap-4 hover:scale-[1.01] transition-all"
                  >
                    <span className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-905/40 border border-sky-100 dark:border-sky-900/40 flex items-center justify-center font-bold text-sky-600 dark:text-sky-400 shrink-0 text-xs mt-0.5">
                      {flow.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {flow.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal font-medium">
                        {flow.desc}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* 3. Advanced Multi-Platform Capabilities (Features Grid) */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Advanced Core Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Why growth agencies and marketplace hunters choose ZetaWala
            utilities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={featureBoxClasses}>
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center mb-5">
              <Layers className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Modular Workflow
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-450 leading-relaxed font-medium">
              Seamlessly copy data strings from one workspace output view and
              pass them to the next generator in a single click.
            </p>
          </div>

          <div className={featureBoxClasses}>
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center mb-5">
              <Globe className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Localized Keywords
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-450 leading-relaxed font-medium">
              Extract intent terms adapted specifically to Roman Urdu phonetics
              used by e-commerce searchers on Daraz.
            </p>
          </div>

          <div className={featureBoxClasses}>
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center mb-5">
              <Cpu className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Sourcing Intelligence
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-455 leading-relaxed font-medium">
              Evaluate marketplace demand levels, saturation loopholes, and gain
              actionable sourcing channel recommendations.
            </p>
          </div>

          <div className={featureBoxClasses}>
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center mb-5">
              <Sparkles className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Rapid Export Hooks
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-455 leading-relaxed font-medium">
              Quick-copy comma-separated tag sets directly into YouTube Studio
              or design prompts into Midjourney models.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Corporate Trust & Growth Analytics Section */}
      <section className="bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shadow-sm">
              <Award className="w-3.5 h-3.5 text-sky-600" />
              Scale and Retention
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Powering Modern Content Creators & Seller Storefronts
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-300 leading-relaxed font-medium">
              ZetaWala scales operational efficiency. Our telemetry charts
              showcase the milestone analytics generated by users utilizing
              localized SEO pipelines.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl flex flex-col justify-between space-y-3 shadow-sm">
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                user retention
              </span>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                98.4%
              </p>
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 w-[98.4%]" />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl flex flex-col justify-between space-y-3 shadow-sm">
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                CTR performance boost
              </span>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                4.8x
              </p>
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 w-[80%]" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl flex flex-col justify-between space-y-3 shadow-sm">
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                cumulative jobs run
              </span>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                142K
              </p>
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 w-[92%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tool catalog anchor target */}
      <section
        id="workspace-portfolio"
        className="max-w-7xl mx-auto px-6 py-20 scroll-mt-16"
      >
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Launch Tool Packs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Select a platform workspace below to begin running SEO automation
            prompts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Card A: YouTube Growth Suite */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0">
                  <Video className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    YouTube Growth Suite
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    7-step automated content creation pipeline
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-350 font-medium leading-relaxed">
                Supercharge channel analytics. Find trending ideas, copy titles,
                construct hooks, and build multi-minute fully-structured video
                scripts.
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/dashboard/youtube/video-ideas"
                className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-transparent shadow-lg shadow-sky-500/10"
              >
                Launch YouTube Pipeline
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card B: Daraz Market Intelligence */}
          <div className={cardClasses}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Daraz Market Intelligence
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pakistan marketplace sourcing & keyword research
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-350 font-medium leading-relaxed">
                Locate winning products on Daraz. Evaluate customer loophole
                metrics, bad review pain points, and discover Urdu-phonetic
                tags.
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/dashboard/daraz/product-hunting"
                className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-transparent shadow-lg shadow-sky-500/10"
              >
                Launch Daraz Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Semantic SEO FAQ Section Component */}
      <FAQSection />
    </div>
  );
}
