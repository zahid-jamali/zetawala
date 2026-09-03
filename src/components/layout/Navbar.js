'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronRight, Sun, Moon, ArrowRight } from 'lucide-react';
import { toggleTheme } from '../../store/uiSlice';
import ToolSearch from './ToolSearch';
import LanguageSwitcher from '../i18n/LanguageSwitcher';
import { useCurrentLocale } from '../i18n/LocaleProvider';
import { localizeNavCategories } from '../../i18n/nav';
import { getHomePath } from '../../i18n/paths';

/**
 * Hybrid nav:
 *  - Top row: logo + tool search + theme
 *  - Category strip: every suite visible on first screen
 *  - Hover / focus a category → full tool list (not truncated)
 */

function CategoryMegaPanel({ category, onNavigate, t }) {
  const Icon = category.icon;
  const cols =
    category.tools.length > 12 ? 'sm:grid-cols-3' : category.tools.length > 6 ? 'sm:grid-cols-2' : 'sm:grid-cols-1';

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
            <Icon className={`w-4 h-4 ${category.accent}`} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{category.label}</p>
            <p className="text-[10px] text-slate-500 truncate">{category.desc}</p>
          </div>
        </div>
        <Link
          href={category.hubHref}
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
        >
          {t('nav.openHub')}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className={`p-3 grid gap-0.5 ${cols} max-h-[min(420px,60vh)] overflow-y-auto custom-scrollbar`}>
        {category.tools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href || category.hubHref}
            onClick={onNavigate}
            className="px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-2.5 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
            <span className="min-w-0">
              <span className="block text-xs font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400">
                {tool.name}
              </span>
              <span className="block text-[10px] text-slate-500 leading-snug mt-0.5 line-clamp-1">{tool.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="px-5 py-2.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 font-medium">
        {t('nav.toolsHint', { count: category.tools.length })}
      </div>
    </div>
  );
}

function DesktopCategoryNav({ categories, t }) {
  const [activeId, setActiveId] = useState(null);
  const closeTimer = useRef(null);
  const active = categories.find((c) => c.id === activeId) || null;

  const open = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveId(id);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveId(null), 160);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!activeId) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

  return (
    <div
      className="relative hidden lg:block border-t border-slate-100 dark:border-slate-800/80"
      onMouseLeave={scheduleClose}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav
          className="flex items-stretch gap-0.5 overflow-x-auto scrollbar-none py-0"
          aria-label="Tool categories"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isOn = activeId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onMouseEnter={() => open(cat.id)}
                onFocus={() => open(cat.id)}
                onClick={() => setActiveId(isOn ? null : cat.id)}
                className={`shrink-0 px-2.5 xl:px-3 py-2.5 text-[11px] xl:text-xs font-semibold rounded-none border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                  isOn
                    ? 'border-sky-500 text-sky-700 dark:text-sky-300 bg-sky-50/60 dark:bg-sky-950/20'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${cat.accent} opacity-90`} />
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mega panel under the strip */}
      {active && (
        <div
          className="absolute left-0 right-0 top-full z-[60] px-4 md:px-8 pt-2 pb-4"
          onMouseEnter={() => open(active.id)}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-7xl mx-auto">
            <CategoryMegaPanel category={active} onNavigate={() => setActiveId(null)} t={t} />
          </div>
        </div>
      )}

      {active && (
        <button
          type="button"
          aria-label={t('nav.closeMega')}
          className="fixed inset-0 z-[55] bg-slate-900/10 dark:bg-slate-950/40 cursor-default"
          onClick={() => setActiveId(null)}
        />
      )}
    </div>
  );
}

function MobileCategoryBlock({ category, open, onToggle, onNavigate, t }) {
  const Icon = category.icon;
  return (
    <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-3.5 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Icon className={`w-4 h-4 ${category.accent}`} />
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{category.label}</p>
            <p className="text-[10px] text-slate-400">{t('nav.toolsCount', { count: category.tools.length })}</p>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 max-h-64 overflow-y-auto">
          <Link
            href={category.hubHref}
            onClick={onNavigate}
            className="flex items-center justify-between px-3.5 py-2.5 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            {t('nav.openHubNamed', { label: category.label })}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {category.tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href || category.hubHref}
              onClick={onNavigate}
              className="block px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/35 border-t border-slate-50 dark:border-slate-800/50"
            >
              <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{tool.name}</span>
              <span className="block text-[10px] text-slate-400 line-clamp-1 mt-0.5">{tool.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const { locale, t } = useCurrentLocale();
  const categories = localizeNavCategories(locale, t);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileId, setOpenMobileId] = useState(categories[0]?.id || null);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-200">
      {/* Row 1 — brand + search */}
      <div className="h-14 md:h-16 max-w-7xl mx-auto flex items-center justify-between gap-3 px-4 md:px-8">
        <Link href={getHomePath(locale)} className="h-8 md:h-9 relative flex items-center shrink-0 transition-opacity hover:opacity-90">
          <img src="/images/Logo.png" alt="Zetawala" className="h-full w-auto object-contain rounded-2xl dark:brightness-110" />
        </Link>

        <div className="hidden md:block flex-1 max-w-md mx-4">
          <ToolSearch variant="navbar" />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <LanguageSwitcher compact />
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer"
            aria-label={t('nav.toggleTheme')}
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label={t('nav.openMenu')}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Row 2 — all categories (desktop) */}
      <DesktopCategoryNav categories={categories} t={t} />

      {/* Mobile drawer */}
      <div
        className={`fixed h-screen inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div onClick={closeMobile} className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm" />
        <div
          className={`absolute top-0 right-0 w-[min(340px,92vw)] h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 transform ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <img src="/images/Logo.png" alt="Zetawala" className="h-9 w-auto rounded-full" />
            <button type="button" onClick={closeMobile} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" aria-label={t('nav.closeMenu')}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 pt-4 md:hidden">
            <ToolSearch variant="drawer" onNavigate={closeMobile} autoFocus={mobileOpen} />
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 custom-scrollbar">
            <p className="px-1 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {t('nav.allCategories')}
            </p>
            {categories.map((cat) => (
              <MobileCategoryBlock
                key={cat.id}
                category={cat}
                open={openMobileId === cat.id}
                onToggle={() => setOpenMobileId(openMobileId === cat.id ? null : cat.id)}
                onNavigate={closeMobile}
                t={t}
              />
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">© 2026 ZetaWala</span>
          </div>
        </div>
      </div>
    </header>
  );
}
