'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import { useCurrentLocale } from '../i18n/LocaleProvider';
import { searchToolsLocalized } from '../../i18n/nav';

/**
 * Global tool finder — navbar + homepage.
 * Type to filter; Enter opens the top result; Esc closes.
 */
export default function ToolSearch({
  variant = 'navbar', // 'navbar' | 'hero' | 'drawer'
  onNavigate,
  autoFocus = false,
  className = '',
}) {
  const router = useRouter();
  const { locale, t } = useCurrentLocale();
  const listId = useId();
  const inputRef = useRef(null);
  const rootRef = useRef(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(
    () => searchToolsLocalized(query, variant === 'hero' ? 8 : 10, locale, t),
    [query, variant, locale, t]
  );
  const showPanel = open && query.trim().length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Cmd/Ctrl+K focuses search from anywhere (navbar instance)
  useEffect(() => {
    if (variant !== 'navbar') return undefined;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [variant]);

  useEffect(() => {
    if (!showPanel) return undefined;
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [showPanel]);

  const go = (href) => {
    setQuery('');
    setOpen(false);
    onNavigate?.();
    router.push(href);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      inputRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const hit = results[activeIndex] || results[0];
      if (hit) go(hit.href);
    }
  };

  const isHero = variant === 'hero';
  const isDrawer = variant === 'drawer';

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div
        className={
          isHero
            ? 'flex items-center gap-3 w-full max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/40 dark:shadow-none px-4 py-3.5'
            : isDrawer
              ? 'flex items-center gap-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 px-3 py-2.5'
              : 'flex items-center gap-2 w-full max-w-[280px] xl:max-w-[320px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/40 px-3 py-2 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/15 transition-all'
        }
      >
        <Search className={`shrink-0 text-slate-400 ${isHero ? 'w-5 h-5' : 'w-4 h-4'}`} />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={isHero ? t('search.placeholderHero') : t('search.placeholder')}
          aria-label={t('search.placeholder')}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={showPanel}
          className={`flex-1 min-w-0 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 ${
            isHero ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
          }`}
        />
        {variant === 'navbar' && (
          <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-400 shrink-0">
            Ctrl K
          </kbd>
        )}
      </div>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className={`absolute z-[60] mt-2 w-full ${
            isHero ? 'left-1/2 -translate-x-1/2 max-w-xl' : 'left-0 min-w-[min(100%,360px)]'
          } rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden`}
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-xs text-slate-500">{t('search.noResults', { query: query.trim() })}</p>
          ) : (
            <ul className="max-h-[min(360px,50vh)] overflow-y-auto py-1.5 custom-scrollbar">
              {results.map((tool, i) => (
                <li key={`${tool.categoryId}-${tool.slug}`} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => go(tool.href)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-start gap-3 cursor-pointer transition-colors ${
                      i === activeIndex
                        ? 'bg-sky-50 dark:bg-sky-950/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{tool.name}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        <span className="font-semibold text-sky-600 dark:text-sky-400">{tool.categoryLabel}</span>
                        {' · '}
                        {tool.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
