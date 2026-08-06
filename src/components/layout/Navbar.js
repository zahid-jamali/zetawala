'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown, Video, ShoppingBag, MessageCircle, Search, Calculator, FileStack, PenLine, BookOpen, Briefcase, Store, Lock, ChevronRight, Sun, Moon, ArrowRight } from 'lucide-react';
import { toggleTheme } from '../../store/uiSlice';
import { navigationConfig } from '../../config/navigation';
import { getSeoPath } from '../../config/routes';

const ytCat = navigationConfig.find(c => c.slug === 'youtube-automation');
const youtubeTools = ytCat ? ytCat.tools.filter(t => t.isActive) : [];

const dzCat = navigationConfig.find(c => c.slug === 'daraz-seo');
const darazTools = dzCat ? dzCat.tools.filter(t => t.isActive) : [];

const lcCat = navigationConfig.find(c => c.slug === 'local-social-commerce');
const localCommerceTools = lcCat ? lcCat.tools.filter(t => t.isActive) : [];

const seoCat = navigationConfig.find(c => c.slug === 'seo-webmaster');
const seoTools = seoCat ? seoCat.tools.filter(t => t.isActive) : [];

const calcCat = navigationConfig.find(c => c.slug === 'calculators');
const calculatorTools = calcCat ? calcCat.tools.filter(t => t.isActive) : [];

const pdfCat = navigationConfig.find(c => c.slug === 'pdf-image-utilities');
const pdfUtilityTools = pdfCat ? pdfCat.tools.filter(t => t.isActive) : [];

const writingCat = navigationConfig.find(c => c.slug === 'ai-writing');
const writingTools = writingCat ? writingCat.tools.filter(t => t.isActive) : [];

const studyCat = navigationConfig.find(c => c.slug === 'ai-study');
const studyTools = studyCat ? studyCat.tools.filter(t => t.isActive) : [];

const freelancerCat = navigationConfig.find(c => c.slug === 'freelancer-toolkit');
const freelancerTools = freelancerCat ? freelancerCat.tools.filter(t => t.isActive) : [];

const shopeeCat = navigationConfig.find(c => c.slug === 'shopee-seller');
const shopeeTools = shopeeCat ? shopeeCat.tools.filter(t => t.isActive) : [];

const lazadaCat = navigationConfig.find(c => c.slug === 'lazada-seller');
const lazadaTools = lazadaCat ? lazadaCat.tools.filter(t => t.isActive) : [];

export default function Navbar() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileYoutubeOpen, setMobileYoutubeOpen] = useState(true);
  const [mobileDarazOpen, setMobileDarazOpen] = useState(false);
  const [mobileLocalCommerceOpen, setMobileLocalCommerceOpen] = useState(false);
  const [mobileSeoOpen, setMobileSeoOpen] = useState(false);
  const [mobileCalculatorsOpen, setMobileCalculatorsOpen] = useState(false);
  const [mobilePdfUtilitiesOpen, setMobilePdfUtilitiesOpen] = useState(false);
  const [mobileWritingOpen, setMobileWritingOpen] = useState(false);
  const [mobileStudyOpen, setMobileStudyOpen] = useState(false);
  const [mobileFreelancerOpen, setMobileFreelancerOpen] = useState(false);
  const [mobileShopeeOpen, setMobileShopeeOpen] = useState(false);
  const [mobileLazadaOpen, setMobileLazadaOpen] = useState(false);

  const mobileLink = "p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/35 transition-colors flex items-center justify-between group";

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 transition-all">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="h-9 relative flex items-center shrink-0 transition-opacity hover:opacity-90">
            <img src="/images/Logo.png" alt="Logo" className="h-full w-auto object-contain rounded-2xl dark:brightness-110" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
            
            {/* YouTube Mega Dropdown — 3-column panel (no scroll) */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                YouTube Automation
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 w-[760px] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">intelligence, monetization & content pipeline</span>
                  </div>

                  <div className="grid grid-cols-3 gap-x-3 gap-y-1">
                    {youtubeTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={getSeoPath('youtube', tool.slug)}
                        className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Daraz 2-Column Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Daraz E-commerce
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl grid grid-cols-2 gap-4">
                  <div className="col-span-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-1 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">pakistan market validator & listing suite</span>
                  </div>
                  {darazTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('daraz', tool.slug)}
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

            {/* Local Social Commerce Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Local Commerce
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl grid grid-cols-2 gap-4">
                  <div className="col-span-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-1 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">whatsapp suite & local social commerce</span>
                  </div>
                  {localCommerceTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('local-commerce', tool.slug)}
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

            {/* SEO & Webmaster Mega Dropdown — opens left so it stays on-screen */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                SEO & Webmaster
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 w-[min(760px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Search className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">technical audits, indexability & webmaster intelligence</span>
                    </div>
                    <Link
                      href="/seo"
                      className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {seoTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={getSeoPath('seo', tool.slug)}
                        className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Calculators Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Calculators
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 w-[min(760px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Calculator className="w-4 h-4 text-violet-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">freelance, saas, marketing & ecommerce math</span>
                    </div>
                    <Link
                      href="/calculators"
                      className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {calculatorTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={getSeoPath('calculators', tool.slug)}
                        className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PDF & Image Utilities Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                PDF & Images
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 w-[min(760px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileStack className="w-4 h-4 text-teal-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">pdf, excel, image & ocr utilities</span>
                    </div>
                    <Link
                      href="/pdf-utilities"
                      className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {pdfUtilityTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={getSeoPath('pdf-utilities', tool.slug)}
                        className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-teal-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Writing & Language Tools Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                AI Writing
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 w-[min(760px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <PenLine className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">humanizer, grammar, urdu & rewrite tools</span>
                    </div>
                    <Link
                      href="/writing"
                      className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {writingTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={getSeoPath('writing', tool.slug)}
                        className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-indigo-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Study, Quizzes & Typing Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                AI Study
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 w-[min(760px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <BookOpen className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">notes, quizzes, flashcards & typing</span>
                    </div>
                    <Link
                      href="/study"
                      className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {studyTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={getSeoPath('study', tool.slug)}
                        className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Freelancer Toolkit Mega Dropdown */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Freelancer
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 w-[min(820px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl max-h-[70vh] overflow-y-auto">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">upwork & fiverr toolkit</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link href="/freelancer/upwork" className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline">Upwork</Link>
                      <Link href="/freelancer/fiverr" className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline">Fiverr</Link>
                      <Link href="/freelancer" className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline">All →</Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {freelancerTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={getSeoPath('freelancer', tool.slug)}
                        className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-emerald-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Shopee Seller Toolkit */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Shopee
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full right-0 w-[min(760px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl max-h-[70vh] overflow-y-auto">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Store className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">listing seo · fees · chat</span>
                    </div>
                    <Link href="/shopee" className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0">View all →</Link>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {shopeeTools.map((tool) => (
                      <Link key={tool.slug} href={getSeoPath('shopee', tool.slug)} className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-orange-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lazada Seller Toolkit */}
            <div className="relative group py-5">
              <button className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-805/65 dark:hover:text-black rounded-xl flex items-center gap-1 cursor-pointer transition-all">
                Lazada
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full right-0 w-[min(760px,calc(100vw-2rem))] pt-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl max-h-[70vh] overflow-y-auto">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Store className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">listing seo · fees · chat</span>
                    </div>
                    <Link href="/lazada" className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0">View all →</Link>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1">
                    {lazadaTools.map((tool) => (
                      <Link key={tool.slug} href={getSeoPath('lazada', tool.slug)} className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-blue-500 mt-1.5 shrink-0 transition-colors" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
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
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
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

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 custom-scrollbar">
            
            {/* Collapsible YouTube Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileYoutubeOpen(!mobileYoutubeOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
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
                      href={getSeoPath('youtube', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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
              <button onClick={() => setMobileDarazOpen(!mobileDarazOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
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
                      href={getSeoPath('daraz', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible Local Commerce Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileLocalCommerceOpen(!mobileLocalCommerceOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>Local Commerce & WhatsApp</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileLocalCommerceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileLocalCommerceOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {localCommerceTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('local-commerce', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible SEO & Webmaster Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileSeoOpen(!mobileSeoOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <Search className="w-4 h-4 text-sky-500" />
                  <span>SEO & Webmaster Intelligence</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileSeoOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileSeoOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {seoTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('seo', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible Calculators Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileCalculatorsOpen(!mobileCalculatorsOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <Calculator className="w-4 h-4 text-violet-500" />
                  <span>Calculators</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileCalculatorsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileCalculatorsOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {calculatorTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('calculators', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible PDF & Image Utilities Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobilePdfUtilitiesOpen(!mobilePdfUtilitiesOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <FileStack className="w-4 h-4 text-teal-500" />
                  <span>PDF & Image Utilities</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobilePdfUtilitiesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobilePdfUtilitiesOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {pdfUtilityTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('pdf-utilities', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible AI Writing Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileWritingOpen(!mobileWritingOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <PenLine className="w-4 h-4 text-indigo-500" />
                  <span>AI Writing & Language Tools</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileWritingOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileWritingOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {writingTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('writing', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible AI Study Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileStudyOpen(!mobileStudyOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span>AI Study, Quizzes & Typing</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileStudyOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileStudyOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {studyTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('study', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible Freelancer Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileFreelancerOpen(!mobileFreelancerOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                  <span>Freelancer Toolkit</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileFreelancerOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileFreelancerOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  <Link href="/freelancer/upwork" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
                    <span className="text-xs font-bold text-emerald-600">Upwork Toolkit Hub</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  </Link>
                  <Link href="/freelancer/fiverr" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
                    <span className="text-xs font-bold text-emerald-600">Fiverr Toolkit Hub</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  </Link>
                  {freelancerTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={getSeoPath('freelancer', tool.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileLink}
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

            {/* Collapsible Shopee Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileShopeeOpen(!mobileShopeeOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <Store className="w-4 h-4 text-orange-500" />
                  <span>Shopee Seller Toolkit</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileShopeeOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileShopeeOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {shopeeTools.map((tool) => (
                    <Link key={tool.slug} href={getSeoPath('shopee', tool.slug)} onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
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

            {/* Collapsible Lazada Folder */}
            <div className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
              <button onClick={() => setMobileLazadaOpen(!mobileLazadaOpen)} className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-850/40 border-b border-slate-150 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-350">
                  <Store className="w-4 h-4 text-blue-500" />
                  <span>Lazada Seller Toolkit</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileLazadaOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileLazadaOpen && (
                <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
                  {lazadaTools.map((tool) => (
                    <Link key={tool.slug} href={getSeoPath('lazada', tool.slug)} onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
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
                <span className="text-[9px] uppercase font-bold bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 tracking-wider">Locked</span>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">© 2026 ZetaWala. All rights reserved.</span>
          </div>
        </div>
      </div>
    </header>
  );
}
