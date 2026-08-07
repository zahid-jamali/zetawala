'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Download,
  GraduationCap,
  Lock,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  Keyboard,
} from 'lucide-react';
import { TYPING_LESSONS, TYPING_LEVELS } from '../../../lib/study/typingContent';
import { downloadCertificate } from '../../../lib/study/certificates';
import { getSeoPath } from '../../../config/routes';

const PROGRESS_KEY = 'zetawala_typing_master_v2';

function calcStats(target, typed, elapsedSec) {
  const minutes = Math.max(elapsedSec / 60, 1 / 60);
  let correctChars = 0;
  const len = Math.min(target.length, typed.length);
  for (let i = 0; i < len; i += 1) {
    if (target[i] === typed[i]) correctChars += 1;
  }
  const errors =
    [...Array(len)].filter((_, i) => target[i] !== typed[i]).length +
    Math.max(0, typed.length - target.length);
  const wpm = Math.round(correctChars / 5 / minutes);
  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;
  return { wpm, accuracy, mistakes: errors, correctChars };
}

function emptyProgress() {
  return {
    currentId: TYPING_LESSONS[0].id,
    scores: {}, // id -> { wpm, accuracy, completedAt }
  };
}

export default function TypingMasterCourse() {
  const [progress, setProgress] = useState(emptyProgress);
  const [typed, setTyped] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [done, setDone] = useState(false);
  const [lastStats, setLastStats] = useState(null);
  const [name, setName] = useState('');
  const [tick, setTick] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null');
      if (raw?.currentId && raw?.scores) setProgress(raw);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!startedAt || done) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 200);
    return () => clearInterval(id);
  }, [startedAt, done]);

  const lessonIndex = TYPING_LESSONS.findIndex((l) => l.id === progress.currentId);
  const lesson = TYPING_LESSONS[lessonIndex >= 0 ? lessonIndex : 0];
  const completedIds = Object.keys(progress.scores || {});
  const completedCount = completedIds.length;
  const allDone = completedCount >= TYPING_LESSONS.length;

  const isUnlocked = (idx) => {
    if (idx === 0) return true;
    const prev = TYPING_LESSONS[idx - 1];
    return Boolean(progress.scores?.[prev.id]);
  };

  const elapsed = startedAt ? Math.max(1, Math.floor((Date.now() - startedAt) / 1000)) : 0;
  const live = useMemo(
    () => calcStats(lesson.prompt, typed, Math.max(elapsed, 1)),
    // tick forces live WPM refresh while typing
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lesson.prompt, typed, elapsed, tick]
  );

  const avgStats = useMemo(() => {
    const scores = Object.values(progress.scores || {});
    if (!scores.length) return { wpm: 0, accuracy: 0 };
    const wpm = Math.round(scores.reduce((s, x) => s + (x.wpm || 0), 0) / scores.length);
    const accuracy = Math.round(scores.reduce((s, x) => s + (x.accuracy || 0), 0) / scores.length);
    return { wpm, accuracy };
  }, [progress.scores]);

  const save = (next) => {
    setProgress(next);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const resetDrill = () => {
    setTyped('');
    setStartedAt(null);
    setDone(false);
    setLastStats(null);
    setTick(0);
    inputRef.current?.focus();
  };

  const finishLesson = (stats) => {
    setDone(true);
    setLastStats(stats);
    const passed = stats.accuracy >= (lesson.minAccuracy || 90);
    if (!passed) return;

    const scores = {
      ...(progress.scores || {}),
      [lesson.id]: {
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        completedAt: new Date().toISOString(),
      },
    };
    const nextIdx = Math.min(lessonIndex + 1, TYPING_LESSONS.length - 1);
    save({
      scores,
      currentId: TYPING_LESSONS[nextIdx].id,
    });
  };

  const onType = (value) => {
    if (done) return;
    if (!startedAt) setStartedAt(Date.now());
    setTyped(value);
    if (value.length >= lesson.prompt.length) {
      const stats = calcStats(lesson.prompt, value, Math.max(1, Math.floor((Date.now() - (startedAt || Date.now())) / 1000)));
      finishLesson(stats);
    }
  };

  const selectLesson = (l, idx) => {
    if (!isUnlocked(idx)) return;
    save({ ...progress, currentId: l.id });
    setTyped('');
    setStartedAt(null);
    setDone(false);
    setLastStats(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const resetCourse = () => {
    if (!window.confirm('Reset all Typing Master progress?')) return;
    save(emptyProgress());
    resetDrill();
  };

  const passed = lastStats && lastStats.accuracy >= (lesson.minAccuracy || 90);
  const progressPct = Math.round((completedCount / TYPING_LESSONS.length) * 100);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar curriculum */}
      <div className="lg:col-span-4 space-y-4">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-sky-500" />
            <h2 className="text-sm font-black">Typing Master Course</h2>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Guided curriculum with live feedback, accuracy gates, and a completion certificate with real WPM stats.
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>Course progress</span>
              <span>{completedCount}/{TYPING_LESSONS.length}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <MiniStat label="Avg WPM" value={avgStats.wpm || '—'} />
              <MiniStat label="Avg Acc" value={avgStats.accuracy ? `${avgStats.accuracy}%` : '—'} />
            </div>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
            {TYPING_LEVELS.map((level) => {
              const lessons = TYPING_LESSONS.filter((l) => l.level === level.id);
              return (
                <div key={level.id} className="space-y-1.5">
                  <div className="px-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{level.label}</p>
                    <p className="text-[10px] text-slate-500">{level.desc}</p>
                  </div>
                  {lessons.map((l) => {
                    const idx = TYPING_LESSONS.findIndex((x) => x.id === l.id);
                    const unlocked = isUnlocked(idx);
                    const score = progress.scores?.[l.id];
                    const active = l.id === lesson.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        disabled={!unlocked}
                        onClick={() => selectLesson(l, idx)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs border transition-colors ${
                          !unlocked
                            ? 'opacity-50 cursor-not-allowed border-slate-100 dark:border-slate-800'
                            : active
                              ? 'border-sky-400 bg-sky-50/60 dark:bg-sky-950/25 cursor-pointer'
                              : 'border-slate-200 dark:border-slate-800 hover:border-sky-300 cursor-pointer'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-800 dark:text-slate-100 truncate">{l.title}</span>
                          {!unlocked ? (
                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          ) : score ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : null}
                        </span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">
                          Pass ≥{l.minAccuracy}%
                          {score ? ` · Best ${score.wpm} WPM · ${score.accuracy}%` : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={resetCourse}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset course
          </button>
        </div>

        {allDone && (
          <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-3xl space-y-3">
            <p className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">Course complete</p>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
              placeholder="Name for certificate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="button"
              onClick={() =>
                downloadCertificate({
                  title: 'Typing Master Certificate',
                  name: name || 'Learner',
                  subtitle: 'Zetawala Typing Master Course',
                  stats: {
                    Lessons: `${TYPING_LESSONS.length}/${TYPING_LESSONS.length}`,
                    'Avg WPM': avgStats.wpm,
                    'Avg Accuracy': `${avgStats.accuracy}%`,
                    Status: 'Completed',
                  },
                  filename: 'typing-master-certificate.pdf',
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Certificate
            </button>
          </div>
        )}
      </div>

      {/* Main drill */}
      <div className="lg:col-span-8 space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Module {lesson.module} · {lesson.level}
              </p>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{lesson.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatChip label="WPM" value={live.wpm} />
              <StatChip label="Accuracy" value={`${live.accuracy}%`} />
              <StatChip label="Time" value={`${elapsed}s`} />
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">Coach tip</p>
              <p className="text-[11px] text-amber-900/80 dark:text-amber-200/80 leading-relaxed">{lesson.tip}</p>
            </div>
          </div>

          {lesson.focusKeys?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {lesson.focusKeys.map((k) => (
                <span
                  key={k}
                  className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 font-mono"
                >
                  {k}
                </span>
              ))}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <p className="text-sm leading-relaxed font-mono font-medium text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
              {lesson.prompt.split('').map((ch, i) => {
                let cls = 'text-slate-400';
                if (i < typed.length) {
                  cls =
                    typed[i] === ch
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-500 bg-rose-50 dark:bg-rose-950/30';
                } else if (i === typed.length) {
                  cls = 'bg-sky-200/70 dark:bg-sky-800/50 text-slate-900 dark:text-white';
                }
                return (
                  <span key={i} className={cls}>
                    {ch}
                  </span>
                );
              })}
            </p>
          </div>

          <textarea
            ref={inputRef}
            className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            value={typed}
            disabled={done}
            onChange={(e) => onType(e.target.value)}
            placeholder="Click here and type the lesson — live feedback appears above…"
            spellCheck={false}
            autoFocus
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={resetDrill}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Retry lesson
            </button>
            <p className="text-[10px] text-slate-500">
              Need ≥{lesson.minAccuracy}% accuracy to unlock the next lesson.
            </p>
          </div>

          {done && lastStats && (
            <div
              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                passed
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                  : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
              }`}
            >
              <p className="font-extrabold">
                {passed ? 'Lesson passed' : 'Almost — accuracy too low'}
              </p>
              <p>
                {lastStats.wpm} WPM · {lastStats.accuracy}% accuracy · {lastStats.mistakes} mistakes
              </p>
              {!passed && (
                <p className="text-[11px] opacity-80">
                  Required: {lesson.minAccuracy}%+. Slow down, fix errors as you go, then retry.
                </p>
              )}
              {passed && lessonIndex < TYPING_LESSONS.length - 1 && (
                <button
                  type="button"
                  onClick={() => selectLesson(TYPING_LESSONS[lessonIndex + 1], lessonIndex + 1)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white text-[11px] font-bold cursor-pointer"
                >
                  Next lesson <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-sky-500" />
            <h4 className="text-xs font-extrabold">Recommended next</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={getSeoPath('study', 'typing-speed-test')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:border-sky-300"
            >
              Typing Speed Test <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={getSeoPath('study', 'coding-typing-test')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:border-sky-300"
            >
              Coding Typing Test <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-sm font-black">{value}</p>
    </div>
  );
}

function StatChip({ label, value }) {
  return (
    <div className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mr-1.5">{label}</span>
      <span className="text-xs font-black">{value}</span>
    </div>
  );
}
