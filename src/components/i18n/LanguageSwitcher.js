'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { ENABLED_LOCALES, LOCALE_META } from '../../i18n/config';
import { getSwitcherHref } from '../../i18n/switcher';
import { useCurrentLocale } from './LocaleProvider';

function goToLocale(href) {
  if (typeof window === 'undefined') return;
  window.location.assign(href);
}

export default function LanguageSwitcher({ compact = false }) {
  const { locale, t, pathname } = useCurrentLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();
  const current = LOCALE_META[locale] || LOCALE_META.en;

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const timer = window.setTimeout(() => {
      document.addEventListener('mousedown', onPointer);
    }, 0);
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mousedown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
        aria-label={t('switcher.choose')}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {compact ? current.code : current.nativeName}
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t('switcher.label')}
          className="absolute right-0 mt-1 min-w-[12.5rem] max-h-[min(480px,80vh)] overflow-y-auto custom-scrollbar z-[70] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl py-1"
        >
          {ENABLED_LOCALES.map((code) => {
            const meta = LOCALE_META[code];
            const href = getSwitcherHref(pathname, code);
            const selected = code === locale;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <a
                  href={href}
                  hrefLang={code}
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    if (href && href !== pathname) goToLocale(href);
                  }}
                  className={`flex items-center justify-between gap-3 px-3 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/70 ${
                    selected ? 'text-sky-700 dark:text-sky-300' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>
                    <span className="block">{meta.nativeName}</span>
                    <span className="block text-[10px] font-medium text-slate-400">{meta.englishName}</span>
                  </span>
                  {selected && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
