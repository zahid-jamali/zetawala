"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  Menu,
  X,
  ChevronDown,
  Video,
  ShoppingBag,
  Lock,
  ChevronRight,
  Sun,
  Moon,
  ArrowRight
} from "lucide-react";
import { toggleTheme } from "../../store/uiSlice";
import { navigationConfig } from "../../config/navigation";

const youtubeCategory = navigationConfig.find(c => c.slug === 'youtube-automation');
const youtubeTools = youtubeCategory ? youtubeCategory.tools.filter(t => t.isActive) : [];

const darazCategory = navigationConfig.find(c => c.slug === 'daraz-seo');
const darazTools = darazCategory ? darazCategory.tools.filter(t => t.isActive) : [];

export default function Navbar() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileYoutubeOpen, setMobileYoutubeOpen] = useState(true);
  const [mobileDarazOpen, setMobileDarazOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 transition-all">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        
        {/* Left: Brand Logo Wrapper */}
        <div className="flex items-center gap-8">
          <Link href="/" className="h-9 relative flex items-center shrink-0 transition-opacity hover:opacity-90">
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="h-full w-auto object-contain rounded-2xl dark:brightness-110"
            />
          </Link>

          {/* Center Links (Mega Dropdowns - Hover Safe) */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
            
            {/* YouTube Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                YouTube Automation
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl grid grid-cols-2 gap-4">
                  <div className="col-span-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-1 flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      video metadata & script pipeline
                    </span>
                  </div>
                  {youtubeTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/dashboard/youtube/${tool.slug}`}
                      className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2.5 group/item"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{tool.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">{tool.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Daraz 2-Column Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Daraz E-commerce
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl grid grid-cols-2 gap-4">
                  <div className="col-span-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-1 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      pakistan market validator & listing suite
                    </span>
                  </div>
                  {darazTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/dashboard/daraz/${tool.slug}`}
                      className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2.5 group/item"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{tool.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 py-2 text-slate-400 dark:text-slate-650 flex items-center gap-1.5 cursor-not-allowed select-none">
              <Lock className="w-3.5 h-3.5" />
              <span>Cross-Border SEO</span>
            </div>

            <Link href="/blog" className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-all">
              Blog
            </Link>
          </nav>
        </div>

        {/* Right: Theme Toggle & Mobile Trigger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-550 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed h-screen inset-0 z-50 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm" />

        <div className={`absolute top-0 right-0 w-[310px] h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 transform ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="h-10">
              <img src="/images/Logo.png" alt="Logo" className="w-full h-full rounded-full" />
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Collapsible Mobile Scrollable Menu Links */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 custom-scrollbar">
            
            {/* Collapsible YouTube Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button
                onClick={() => setMobileYoutubeOpen(!mobileYoutubeOpen)}
                className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <Video className="w-4 h-4 text-red-500" />
                  <span>YouTube Pipeline</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileYoutubeOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileYoutubeOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {youtubeTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/dashboard/youtube/${tool.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/35 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col pr-3">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-500 transition-colors">{tool.name}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal line-clamp-1">{tool.desc}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Daraz Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button
                onClick={() => setMobileDarazOpen(!mobileDarazOpen)}
                className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  <span>Daraz E-commerce</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileDarazOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileDarazOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {darazTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/dashboard/daraz/${tool.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/35 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex flex-col pr-3">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-500 transition-colors">{tool.name}</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal line-clamp-1">{tool.desc}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Read Blog Link */}
            <div className="pt-2">
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="p-4 bg-sky-50 dark:bg-sky-950/20 rounded-2xl border border-sky-100 dark:border-sky-900/30 flex items-center justify-between text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:bg-sky-100/50 transition-colors cursor-pointer"
              >
                <span>Read SEO Blog Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Roadmap */}
            <div>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Amazon & Etsy Suite
                </span>
                <span className="text-[9px] uppercase font-bold bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 tracking-wider">
                  Locked
                </span>
              </div>
            </div>
          </div>

          {/* Footer Area */}
          <div className="p-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">
              © 2026 ZetaWala. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
