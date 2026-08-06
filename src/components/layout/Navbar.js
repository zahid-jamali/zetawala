'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown, ChevronRight, Sun, Moon, ArrowRight } from 'lucide-react';
import { toggleTheme } from '../../store/uiSlice';
import { getSeoPath } from '../../config/routes';
import { NAV_GROUPS } from '../../config/navSuites';

/**
 * Config-driven navbar: 4 top groups instead of one dropdown per category.
 * Blog & Coming Soon items removed for a cleaner professional bar.
 */

function ToolLink({ routeKey, tool, onNavigate, compact }) {
  return (
    <Link
      href={getSeoPath(routeKey, tool.slug)}
      onClick={onNavigate}
      className={
        compact
          ? 'block px-2 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-sky-600'
          : 'p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-2 group/item'
      }
    >
      {compact ? (
        tool.name
      ) : (
        <>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-sky-500 mt-1.5 shrink-0 transition-colors" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 leading-snug">{tool.name}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-1">{tool.desc}</p>
          </div>
        </>
      )}
    </Link>
  );
}

function SuiteCard({ suite, onNavigate }) {
  const Icon = suite.icon;
  return (
    <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 space-y-3">
      <Link href={suite.hubHref} onClick={onNavigate} className="flex items-start gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
          <Icon className={`w-4 h-4 ${suite.accent}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {suite.label}
          </p>
          <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{suite.desc}</p>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-500 shrink-0 mt-0.5" />
      </Link>
      {suite.tools?.length > 0 && (
        <div className="space-y-0.5 pt-1 border-t border-slate-100 dark:border-slate-800">
          {suite.tools.map((tool) => (
            <ToolLink
              key={tool.slug}
              routeKey={suite.routeKey}
              tool={tool}
              onNavigate={onNavigate}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DesktopDropdown({ group }) {
  const Icon = group.icon;
  const isTools = group.kind === 'tools';

  return (
    <div className="relative group/nav py-5">
      <button
        type="button"
        className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl flex items-center gap-1 cursor-pointer transition-all text-sm font-medium"
      >
        {group.label}
        <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover/nav:rotate-180 transition-transform duration-200" />
      </button>

      <div
        className={`absolute top-full pt-2 pointer-events-none group-hover/nav:pointer-events-auto opacity-0 group-hover/nav:opacity-100 translate-y-1 group-hover/nav:translate-y-0 transition-all duration-200 z-50 ${
          isTools ? 'left-0 w-[min(760px,calc(100vw-2rem))]' : 'left-1/2 -translate-x-1/2 w-[min(720px,calc(100vw-2rem))]'
        }`}
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 flex items-center gap-2">
            {Icon && <Icon className={`w-4 h-4 ${group.accent || 'text-sky-500'} shrink-0`} />}
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
              {group.tagline}
            </span>
          </div>

          {isTools ? (
            <div className="grid grid-cols-3 gap-x-3 gap-y-1">
              {group.tools.map((tool) => (
                <ToolLink key={tool.slug} routeKey={group.routeKey} tool={tool} />
              ))}
            </div>
          ) : (
            <div className={`grid gap-3 ${group.suites.length >= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
              {group.suites.map((suite) => (
                <SuiteCard key={suite.categorySlug} suite={suite} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileSuiteBlock({ suite, open, onToggle, onNavigate }) {
  const Icon = suite.icon;
  return (
    <div className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 cursor-pointer"
      >
        <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-400">
          <Icon className={`w-4 h-4 ${suite.accent}`} />
          <span>{suite.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="p-2 space-y-1 bg-white dark:bg-slate-900">
          <Link
            href={suite.hubHref}
            onClick={onNavigate}
            className="p-2.5 rounded-xl flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            Open {suite.label} hub
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {suite.tools?.map((tool) => (
            <Link
              key={tool.slug}
              href={getSeoPath(suite.routeKey, tool.slug)}
              onClick={onNavigate}
              className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/35 flex items-center justify-between group"
            >
              <div className="flex flex-col pr-3 min-w-0">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-500">{tool.name}</span>
                <span className="text-[9px] text-slate-400 line-clamp-1">{tool.desc}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileId, setOpenMobileId] = useState('youtube');

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 transition-all">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="h-9 relative flex items-center shrink-0 transition-opacity hover:opacity-90">
            <img src="/images/Logo.png" alt="Zetawala" className="h-full w-auto object-contain rounded-2xl dark:brightness-110" />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
            {NAV_GROUPS.map((group) => (
              <DesktopDropdown key={group.id} group={group} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed h-screen inset-0 z-50 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div onClick={closeMobile} className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm" />
        <div className={`absolute top-0 right-0 w-[310px] h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <img src="/images/Logo.png" alt="Zetawala" className="h-10 w-auto rounded-full" />
            <button type="button" onClick={closeMobile} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" aria-label="Close menu">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 custom-scrollbar">
            {NAV_GROUPS.map((group) => {
              if (group.kind === 'tools') {
                const Icon = group.icon;
                const open = openMobileId === group.id;
                return (
                  <div key={group.id} className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
                    <button
                      type="button"
                      onClick={() => setOpenMobileId(open ? null : group.id)}
                      className="w-full p-4 flex items-center justify-between bg-slate-100/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                        <Icon className={`w-4 h-4 ${group.accent}`} />
                        <span>{group.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                    {open && (
                      <div className="p-2 space-y-1 bg-white dark:bg-slate-900 max-h-64 overflow-y-auto">
                        {group.tools.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={getSeoPath(group.routeKey, tool.slug)}
                            onClick={closeMobile}
                            className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/35 flex items-center justify-between group"
                          >
                            <div className="flex flex-col pr-3 min-w-0">
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-500">{tool.name}</span>
                              <span className="text-[9px] text-slate-400 line-clamp-1">{tool.desc}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={group.id} className="space-y-2">
                  <p className="px-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{group.label}</p>
                  {group.suites.map((suite) => (
                    <MobileSuiteBlock
                      key={suite.categorySlug}
                      suite={suite}
                      open={openMobileId === suite.categorySlug}
                      onToggle={() => setOpenMobileId(openMobileId === suite.categorySlug ? null : suite.categorySlug)}
                      onNavigate={closeMobile}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          <div className="p-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">© 2026 ZetaWala</span>
          </div>
        </div>
      </div>
    </header>
  );
}
