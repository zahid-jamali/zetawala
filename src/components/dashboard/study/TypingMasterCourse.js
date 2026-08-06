'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Download, GraduationCap } from 'lucide-react';
import { TYPING_LESSONS } from '../../../lib/study/typingContent';
import { downloadCertificate } from '../../../lib/study/certificates';

const PROGRESS_KEY = 'zetawala_typing_master_progress';

export default function TypingMasterCourse() {
  const [progress, setProgress] = useState({ completed: [], currentId: TYPING_LESSONS[0].id });
  const [typed, setTyped] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null');
      if (raw?.currentId) setProgress(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const lesson = useMemo(
    () => TYPING_LESSONS.find((l) => l.id === progress.currentId) || TYPING_LESSONS[0],
    [progress.currentId]
  );

  const save = (next) => {
    setProgress(next);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const completeLesson = () => {
    if (typed !== lesson.prompt) return;
    const completed = Array.from(new Set([...(progress.completed || []), lesson.id]));
    const idx = TYPING_LESSONS.findIndex((l) => l.id === lesson.id);
    const nextLesson = TYPING_LESSONS[Math.min(idx + 1, TYPING_LESSONS.length - 1)];
    save({ completed, currentId: nextLesson.id });
    setTyped('');
  };

  const allDone = (progress.completed || []).length >= TYPING_LESSONS.length;

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black">Typing Master Course</h2>
        </div>
        <p className="text-[11px] text-slate-500">
          Progress {progress.completed?.length || 0}/{TYPING_LESSONS.length} · resumes from LocalStorage
        </p>
        <div className="space-y-1 max-h-[360px] overflow-auto">
          {TYPING_LESSONS.map((l) => {
            const done = progress.completed?.includes(l.id);
            const active = l.id === lesson.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  save({ ...progress, currentId: l.id });
                  setTyped('');
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs border cursor-pointer ${
                  active ? 'border-sky-400 bg-sky-50/50 dark:bg-sky-950/20' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <span className="font-bold">{l.title}</span>
                <span className="block text-[10px] text-slate-500 capitalize">{l.level}{done ? ' · completed' : ''}</span>
              </button>
            );
          })}
        </div>
        {allDone && (
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
                  title: 'Typing Master Certificate',
                  name: name || 'Learner',
                  subtitle: 'Zetawala Typing Master Course',
                  stats: {
                    Lessons: `${TYPING_LESSONS.length}/${TYPING_LESSONS.length}`,
                    Status: 'Completed',
                  },
                  filename: 'typing-master-certificate.pdf',
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white text-xs font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Final Certificate
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-8 space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{lesson.level}</p>
            <h3 className="text-sm font-extrabold">{lesson.title}</h3>
          </div>
          <p className="text-sm font-mono leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">{lesson.prompt}</p>
          <textarea
            className="w-full min-h-[140px] px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm font-mono"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Type the lesson exactly…"
            spellCheck={false}
          />
          <button
            type="button"
            disabled={typed !== lesson.prompt}
            onClick={completeLesson}
            className="px-4 py-2 rounded-xl bg-emerald-600 disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
          >
            Mark Lesson Complete
          </button>
        </div>
      </div>
    </div>
  );
}
