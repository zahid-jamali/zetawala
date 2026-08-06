'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Keyboard } from 'lucide-react';
import { TYPING_PASSAGES } from '../../../lib/study/typingContent';
import { downloadCertificate } from '../../../lib/study/certificates';

const HISTORY_KEY = 'zetawala_typing_speed_history';

function calcStats(target, typed, elapsedSec) {
  const minutes = Math.max(elapsedSec / 60, 1 / 60);
  let correctChars = 0;
  const len = Math.min(target.length, typed.length);
  for (let i = 0; i < len; i += 1) {
    if (target[i] === typed[i]) correctChars += 1;
  }
  const mistakes = Math.max(typed.length - correctChars, 0) + Math.max(0, target.length > typed.length && elapsedSec > 0 ? 0 : 0);
  const errors = [...Array(len)].filter((_, i) => target[i] !== typed[i]).length + Math.max(0, typed.length - target.length);
  const wpm = Math.round((correctChars / 5) / minutes);
  const cpm = Math.round(correctChars / minutes);
  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;
  return { wpm, cpm, accuracy, mistakes: errors, correctChars };
}

export default function TypingSpeedTest() {
  const [duration, setDuration] = useState(60);
  const [passage, setPassage] = useState(() => TYPING_PASSAGES[0]);
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [done, setDone] = useState(false);
  const [name, setName] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'));
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (!startedAt || done) return undefined;
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = Math.max(duration - elapsed, 0);
      setSecondsLeft(left);
      if (left <= 0) finish(elapsed);
    }, 200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startedAt, done, duration]);

  const elapsed = startedAt ? Math.min(duration, Math.floor((Date.now() - startedAt) / 1000)) : 0;
  const live = useMemo(
    () => calcStats(passage, typed, Math.max(elapsed, done ? duration : 1)),
    [passage, typed, elapsed, done, duration]
  );

  const finish = (elapsedOverride) => {
    const e = elapsedOverride ?? elapsed;
    const stats = calcStats(passage, typed, Math.max(e, 1));
    setDone(true);
    const entry = { ...stats, date: new Date().toISOString(), duration };
    const next = [entry, ...history].slice(0, 20);
    setHistory(next);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setPassage(TYPING_PASSAGES[Math.floor(Math.random() * TYPING_PASSAGES.length)]);
    setTyped('');
    setStartedAt(null);
    setSecondsLeft(duration);
    setDone(false);
    inputRef.current?.focus();
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black">Typing Speed Test</h2>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Duration</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            value={duration}
            disabled={!!startedAt && !done}
            onChange={(e) => {
              const d = Number(e.target.value);
              setDuration(d);
              setSecondsLeft(d);
            }}
          >
            {[30, 60, 120].map((d) => (
              <option key={d} value={d}>{d} seconds</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <Stat label="Time" value={`${secondsLeft}s`} />
          <Stat label="WPM" value={live.wpm} />
          <Stat label="CPM" value={live.cpm} />
          <Stat label="Accuracy" value={`${live.accuracy}%`} />
        </div>
        <button type="button" onClick={reset} className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-bold cursor-pointer">
          New Passage
        </button>
        {done && (
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Name for certificate</label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <button
              type="button"
              onClick={() =>
                downloadCertificate({
                  title: 'Typing Speed Certificate',
                  name: name || 'Learner',
                  subtitle: 'Zetawala Typing Speed Test',
                  stats: {
                    WPM: live.wpm,
                    CPM: live.cpm,
                    Accuracy: `${live.accuracy}%`,
                    Mistakes: live.mistakes,
                    Duration: `${duration}s`,
                  },
                  filename: 'typing-speed-certificate.pdf',
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Certificate
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-8 space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <p className="text-sm leading-relaxed font-medium text-slate-700 dark:text-slate-200 mb-4">
            {passage.split('').map((ch, i) => {
              let cls = 'text-slate-400';
              if (i < typed.length) cls = typed[i] === ch ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 bg-rose-50 dark:bg-rose-950/30';
              else if (i === typed.length) cls = 'bg-sky-200/60 dark:bg-sky-800/50 text-slate-900 dark:text-white';
              return <span key={i} className={cls}>{ch}</span>;
            })}
          </p>
          <textarea
            ref={inputRef}
            className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm"
            value={typed}
            disabled={done}
            onChange={(e) => {
              if (!startedAt) setStartedAt(Date.now());
              const v = e.target.value;
              setTyped(v);
              if (v.length >= passage.length) finish();
            }}
            placeholder="Start typing here…"
            spellCheck={false}
          />
        </div>

        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h3 className="text-xs font-extrabold">Local History</h3>
          {history.length === 0 && <p className="text-xs text-slate-500">No attempts yet.</p>}
          {history.slice(0, 8).map((h, i) => (
            <p key={i} className="text-[11px] text-slate-600 dark:text-slate-300">
              {new Date(h.date).toLocaleString()} · {h.wpm} WPM · {h.accuracy}% · {h.duration}s
            </p>
          ))}
          <p className="text-[10px] text-slate-400">Leaderboard-ready: history stored locally until auth is available.</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-lg font-black">{value}</p>
    </div>
  );
}
