'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown, 
  Video, 
  ShoppingBag, 
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { toggleTheme } from '../../store/uiSlice';

const youtubeTools = [
  { name: 'Video Ideas', slug: 'video-ideas', desc: 'Find viral trending concepts' },
  { name: 'Title Writer', slug: 'title-generator', desc: 'High-CTR copywriting' },
  { name: 'Hook Architect', slug: 'hook-architect', desc: 'Capture viewer attention' },
  { name: 'Description Writer', slug: 'description-builder', desc: 'SEO semantic structure' },
  { name: 'Tags Extractor', slug: 'tags-extractor', desc: 'YouTube Studio keywords' },
  { name: 'AI Thumbnail Prompt', slug: 'thumbnail-prompt', desc: 'Midjourney graphic prompter' },
  { name: 'Script Master', slug: 'script-master', desc: 'Word-for-word audio script' },
];

const darazTools = [
  { name: 'Product Hunting', slug: 'product-hunting', desc: 'Simulate demand & margins' },
  { name: 'Roman Urdu Keywords', slug: 'roman-urdu-keywords', desc: 'Pakistan search volume tags' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null); // 'youtube' | 'daraz' | null

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 transition-all">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        
        {/* Left: Brand Logo Wrapper (Asset Spacing Slot) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="w-32 h-10 relative flex items-center shrink-0">
            {/* Brand Logo Image Placeholder */}
            <span className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight">
              ZetaWala
            </span>
          </Link>

          {/* Center Links (Mega Dropdowns - Hover Safe) */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
            
            {/* YouTube Automation Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                YouTube Automation
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              {/* Invisible Safe Bridge PT-2 & Dropdown Box */}
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
                        <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                          {tool.name}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Daraz E-Commerce Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Daraz E-commerce
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              {/* Invisible Safe Bridge PT-2 & Dropdown Box */}
              <div className="absolute top-full left-0 w-[280px] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl space-y-3">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      pakistan market validator
                    </span>
                  </div>
                  {darazTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/dashboard/daraz/${tool.slug}`}
                      className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2.5 group/item block"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                          {tool.name}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Cross-Border (Coming Soon) */}
            <div className="px-4 py-2 text-slate-400 dark:text-slate-600 flex items-center gap-1.5 cursor-not-allowed select-none">
              <Lock className="w-3.5 h-3.5" />
              <span>Cross-Border SEO</span>
            </div>

          </nav>
        </div>

        {/* Right: Theme Toggle & Mobile Trigger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Responsive Overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-slate-950/20 dark:bg-slate-950/80 backdrop-blur-sm md:hidden animate-fade-in flex flex-col justify-start">
          <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-8 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            
            {/* YouTube Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                <Video className="w-4 h-4 text-red-500" />
                <span>YouTube Automation Tools</span>
              </div>
              <div className="grid gap-2">
                {youtubeTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/dashboard/youtube/${tool.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-350">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Daraz Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2">
                <ShoppingBag className="w-4 h-4 text-orange-500" />
                <span>Daraz SEO Suite</span>
              </div>
              <div className="grid gap-2">
                {darazTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/dashboard/daraz/${tool.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-350">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  Amazon & Etsy Models
                </span>
                <span className="text-[10px] uppercase font-bold bg-slate-200 dark:bg-slate-850 px-2 py-0.5 rounded-md text-slate-500 dark:text-slate-400">
                  Locked
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
