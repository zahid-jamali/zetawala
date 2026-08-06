'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Code2, Download } from 'lucide-react';
import { CODING_SNIPPETS } from '../../../lib/study/typingContent';
import { downloadCertificate } from '../../../lib/study/certificates';

const HISTORY_KEY = 'zetawala_coding_typing_history';

export default function CodingTypingTest() {
  const [language, setLanguage] = useState('javascript');
  const [difficulty, setDifficulty] = useState('easy');
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [done, setDone] = useState(false);
  const [name, setName] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'));
    } catch {
      setHistory([]);
    }
  }, []);

  const target = CODING_SNIPPETS[language]?.[difficulty] || '';

  const stats = useMemo(() => {
    const elapsedSec = Math.max(((startedAt ? Date.now() - startedAt : 0) / 1000) || 1, 1);
    const minutes = elapsedSec / 60;
    let correct = 0;
    const n = Math.min(target.length, typed.length);
    for (let i = 0; i < n; i += 1) if (target[i] === typed[i]) correct += 1;
    const errors = [...Array(n)].filter((_, i) => target[i] !== typed[i]).length + Math.max(0, typed.length - target.length);
    const wpm = Math.round((correct / 5) / minutes);
    const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
    return { wpm, accuracy, errors, elapsedSec: Math.round(elapsedSec) };
  }, [target, typed, startedAt]);

  const finish = () => {
    setDone(true);
    const entry = { ...stats, language, difficulty, date: new Date().toISOString() };
    const next = [entry, ...history].slice(0, 20);
    setHistory(next);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setTyped('');
    setStartedAt(null);
    setDone(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black">Coding Typing Test</h2>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Language</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              reset();
            }}
          >
            {Object.keys(CODING_SNIPPETS).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Difficulty</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              reset();
            }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-[9px] font-bold uppercase text-slate-400">WPM</p>
            <p className="text-lg font-black">{stats.wpm}</p>
          </div>
          <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-[9px] font-bold uppercase text-slate-400">Accuracy</p>
            <p className="text-lg font-black">{stats.accuracy}%</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-500">Errors: {stats.errors} · Time: {stats.elapsedSec}s</p>
        <button type="button" onClick={reset} className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-bold cursor-pointer">
          Reset
        </button>
        {done && (
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              placeholder="Name for certificate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="button"
              onClick={() =>
                downloadCertificate({
                  title: 'Coding Typing Certificate',
                  name: name || 'Learner',
                  subtitle: `Zetawala · ${language} · ${difficulty}`,
                  stats: {
                    WPM: stats.wpm,
                    Accuracy: `${stats.accuracy}%`,
                    Errors: stats.errors,
                    Language: language,
                  },
                  filename: 'coding-typing-certificate.pdf',
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Certificate
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-8 space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 overflow-auto">
          <pre className="text-xs font-mono whitespace-pre leading-relaxed">
            {target.split('').map((ch, i) => {
              let cls = 'text-slate-500';
              if (i < typed.length) cls = typed[i] === ch ? 'text-emerald-400' : 'text-rose-400 bg-rose-950/40';
              else if (i === typed.length) cls = 'bg-sky-700/60 text-white';
              return <span key={i} className={cls}>{ch}</span>;
            })}
          </pre>
        </div>
        <textarea
          className="w-full min-h-[220px] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono"
          value={typed}
          disabled={done}
          spellCheck={false}
          onChange={(e) => {
            if (!startedAt) setStartedAt(Date.now());
            const v = e.target.value;
            setTyped(v);
            if (v === target) finish();
          }}
          placeholder="Type the code exactly, preserving formatting…"
        />
        {history.length > 0 && (
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
            <p className="font-extrabold text-xs">History</p>
            {history.slice(0, 6).map((h, i) => (
              <p key={i} className="text-slate-500">
                {new Date(h.date).toLocaleString()} · {h.language}/{h.difficulty} · {h.wpm} WPM · {h.accuracy}%
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
