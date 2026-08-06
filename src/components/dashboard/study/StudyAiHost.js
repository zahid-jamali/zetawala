'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Download,
  UploadCloud,
  RefreshCw,
} from 'lucide-react';
import TurnstileWidget from '../TurnstileWidget';
import { getStudyTool, STUDY_AI_SLUGS } from '../../../config/study/tools';
import { getSeoPath } from '../../../config/routes';
import { downloadTextAsPdf, downloadDocxLike } from '../../../lib/study/certificates';
import QuizPlayer from './QuizPlayer';
import FlashcardPlayer from './FlashcardPlayer';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';
const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

const NEXT = {
  'ai-notes-generator': [
    { slug: 'ai-quiz-generator', label: 'Quiz Generator' },
    { slug: 'ai-flashcard-generator', label: 'Flashcards' },
  ],
  'ai-quiz-generator': [
    { slug: 'ai-flashcard-generator', label: 'Flashcards' },
    { slug: 'ai-notes-generator', label: 'Notes' },
  ],
  'pdf-to-quiz': [
    { slug: 'ai-quiz-generator', label: 'Topic Quiz' },
    { slug: 'ai-flashcard-generator', label: 'Flashcards' },
  ],
  'ai-flashcard-generator': [
    { slug: 'ai-quiz-generator', label: 'Quiz' },
    { slug: 'ai-notes-generator', label: 'Notes' },
  ],
  'youtube-study-notes': [
    { slug: 'ai-quiz-generator', label: 'More Quizzes' },
    { slug: 'ai-notes-generator', label: 'Topic Notes' },
  ],
  'ai-assignment-generator': [
    { slug: 'ai-homework-solver', label: 'Homework Solver' },
    { slug: 'ai-notes-generator', label: 'Notes' },
  ],
  'ai-homework-solver': [
    { slug: 'ai-assignment-generator', label: 'Assignment' },
    { slug: 'ai-notes-generator', label: 'Notes' },
  ],
};

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  if (!text) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold cursor-pointer"
    >
      {ok ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {ok ? 'Copied' : 'Copy'}
    </button>
  );
}

function ResultView({ toolSlug, data }) {
  if (!data) return null;

  if (toolSlug === 'ai-notes-generator') {
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <h3 className="text-sm font-extrabold">{data.title || 'Study Notes'}</h3>
            <div className="flex flex-wrap gap-2">
              <CopyBtn text={data.notes} />
              <button
                type="button"
                onClick={() => downloadTextAsPdf(data.title || 'Notes', data.notes, 'study-notes.pdf')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white text-[11px] font-bold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">Level: {data.level} · {data.wordCount || '—'} words</p>
          <pre className="text-sm whitespace-pre-wrap leading-relaxed">{data.notes}</pre>
        </div>
        <SectionList title="Key Points" items={data.keyPoints} />
        <SectionList title="Examples" items={data.examples} />
        <SectionList title="Important Concepts" items={data.importantConcepts} />
      </div>
    );
  }

  if (toolSlug === 'ai-quiz-generator' || toolSlug === 'pdf-to-quiz') {
    return <QuizPlayer questions={data.questions || []} title={`${data.topic || 'Practice'} Quiz`} />;
  }

  if (toolSlug === 'ai-flashcard-generator') {
    return (
      <div className="space-y-3">
        <div className="flex justify-end">
          <CopyBtn text={(data.cards || []).map((c) => `Q: ${c.front}\nA: ${c.back}`).join('\n\n')} />
        </div>
        <FlashcardPlayer cards={data.cards || []} />
      </div>
    );
  }

  if (toolSlug === 'youtube-study-notes') {
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <h3 className="text-sm font-extrabold">{data.videoTitle || 'YouTube Notes'}</h3>
            <div className="flex gap-2">
              <CopyBtn text={[data.summary, data.notes].filter(Boolean).join('\n\n')} />
              <button
                type="button"
                onClick={() => downloadTextAsPdf(data.videoTitle || 'YouTube Notes', `${data.summary}\n\n${data.notes}`, 'youtube-notes.pdf')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white text-[11px] font-bold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
          <h4 className="text-xs font-extrabold">Summary</h4>
          <p className="text-sm">{data.summary}</p>
          <h4 className="text-xs font-extrabold">Notes</h4>
          <pre className="text-sm whitespace-pre-wrap">{data.notes}</pre>
        </div>
        <SectionList title="Key Points" items={data.keyPoints} />
        <QuizPlayer questions={data.quiz || []} title="Video Quiz" />
      </div>
    );
  }

  if (toolSlug === 'ai-assignment-generator') {
    return (
      <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <h3 className="text-sm font-extrabold">{data.title || 'Assignment'}</h3>
          <div className="flex flex-wrap gap-2">
            <CopyBtn text={data.assignment} />
            <button
              type="button"
              onClick={() => downloadDocxLike('assignment.doc', data.title || 'Assignment', data.assignment)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[11px] font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> DOCX
            </button>
            <button
              type="button"
              onClick={() => downloadTextAsPdf(data.title || 'Assignment', data.assignment, 'assignment.pdf')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white text-[11px] font-bold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>
        <pre className="text-sm whitespace-pre-wrap leading-relaxed">{data.assignment}</pre>
        <SectionList title="References" items={data.references} />
      </div>
    );
  }

  if (toolSlug === 'ai-homework-solver') {
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <h3 className="text-sm font-extrabold">Step-by-step</h3>
          <ol className="list-decimal pl-5 text-sm space-y-2">
            {(data.steps || []).map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
        <div className="p-5 rounded-3xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/10 space-y-2">
          <h3 className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">Final Answer</h3>
          <p className="text-sm font-bold">{data.finalAnswer}</p>
        </div>
        <SectionList title="Key Concepts" items={data.keyConcepts} />
        {data.alternativeApproach && (
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold">Alternative approach: </span>{data.alternativeApproach}
          </div>
        )}
      </div>
    );
  }

  return <pre className="text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-auto">{JSON.stringify(data, null, 2)}</pre>;
}

function SectionList({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <h4 className="text-xs font-extrabold mb-2">{title}</h4>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function StudyAiHost({ toolSlug }) {
  const tool = getStudyTool(toolSlug);
  const [form, setForm] = useState({
    topic: '',
    level: 'High School',
    difficulty: 'medium',
    count: '8',
    wordCount: '800',
    question: '',
    youtubeUrl: '',
    text: '',
    pdfName: '',
  });
  const [securityToken, setSecurityToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [pdfPreview, setPdfPreview] = useState('');

  if (!tool) return <p className="text-sm text-slate-500">Unknown study tool.</p>;

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const turnstileRequired = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const extractPdf = async (file) => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/writing/extract', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'PDF extract failed.');
      set('text', json.data.text || '');
      set('pdfName', json.data.filename || file.name);
      setPdfPreview((json.data.text || '').slice(0, 1200));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const runGenerate = async (payload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: toolSlug, payload, securityToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Generation failed.');
      setResult(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSecurityToken('');
      setTurnstileResetKey((k) => k + 1);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (toolSlug === 'youtube-study-notes') {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const tr = await fetch('/api/study/youtube-transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: form.youtubeUrl }),
        });
        const tj = await tr.json();
        if (!tr.ok || !tj.success) throw new Error(tj.error || 'Transcript unavailable.');
        await runGenerate({
          transcript: tj.data.transcript,
          videoTitle: tj.data.videoId,
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setSecurityToken('');
        setTurnstileResetKey((k) => k + 1);
      }
      return;
    }

    const payload = {};
    if (toolSlug === 'ai-notes-generator') {
      payload.topic = form.topic;
      payload.level = form.level;
    } else if (toolSlug === 'ai-quiz-generator') {
      payload.topic = form.topic;
      payload.difficulty = form.difficulty;
      payload.count = form.count;
    } else if (toolSlug === 'pdf-to-quiz') {
      payload.text = form.text;
      payload.count = form.count;
    } else if (toolSlug === 'ai-flashcard-generator') {
      payload.topic = form.topic;
      payload.text = form.text;
      payload.count = form.count;
    } else if (toolSlug === 'ai-assignment-generator') {
      payload.topic = form.topic;
      payload.wordCount = form.wordCount;
    } else if (toolSlug === 'ai-homework-solver') {
      payload.question = form.question;
    }

    await runGenerate(payload);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={onSubmit} className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">{tool.name}</h2>
        </div>
        <p className="text-[11px] text-slate-500">{tool.desc}</p>

        {(toolSlug === 'ai-notes-generator' || toolSlug === 'ai-quiz-generator' || toolSlug === 'ai-flashcard-generator' || toolSlug === 'ai-assignment-generator') && (
          <div className="space-y-2">
            <label className={labelClasses}>Topic</label>
            <input className={inputClasses} value={form.topic} onChange={(e) => set('topic', e.target.value)} placeholder="e.g. Photosynthesis" required={toolSlug !== 'ai-flashcard-generator' || !form.text} />
          </div>
        )}

        {toolSlug === 'ai-notes-generator' && (
          <div className="space-y-2">
            <label className={labelClasses}>Grade / Level</label>
            <select className={inputClasses} value={form.level} onChange={(e) => set('level', e.target.value)}>
              {['Middle School', 'High School', 'College', 'Professional'].map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        )}

        {toolSlug === 'ai-quiz-generator' && (
          <>
            <div className="space-y-2">
              <label className={labelClasses}>Difficulty</label>
              <select className={inputClasses} value={form.difficulty} onChange={(e) => set('difficulty', e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Number of Questions</label>
              <input className={inputClasses} type="number" min="3" max="20" value={form.count} onChange={(e) => set('count', e.target.value)} />
            </div>
          </>
        )}

        {(toolSlug === 'pdf-to-quiz' || toolSlug === 'ai-flashcard-generator') && (
          <div className="space-y-2">
            <label className={labelClasses}>Upload PDF {toolSlug === 'ai-flashcard-generator' ? '(optional)' : ''}</label>
            <label className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 cursor-pointer text-xs font-bold">
              <UploadCloud className="w-4 h-4 text-sky-500" />
              {form.pdfName || 'Choose PDF'}
              <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => extractPdf(e.target.files?.[0])} />
            </label>
            {pdfPreview && (
              <pre className="text-[10px] max-h-28 overflow-auto p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 whitespace-pre-wrap">
                {pdfPreview}…
              </pre>
            )}
            {toolSlug === 'pdf-to-quiz' && (
              <div className="space-y-2">
                <label className={labelClasses}>Questions</label>
                <input className={inputClasses} type="number" min="3" max="15" value={form.count} onChange={(e) => set('count', e.target.value)} />
              </div>
            )}
          </div>
        )}

        {toolSlug === 'youtube-study-notes' && (
          <div className="space-y-2">
            <label className={labelClasses}>YouTube URL</label>
            <input className={inputClasses} value={form.youtubeUrl} onChange={(e) => set('youtubeUrl', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." required />
            <p className="text-[10px] text-slate-500">Requires captions/transcript on the video.</p>
          </div>
        )}

        {toolSlug === 'ai-assignment-generator' && (
          <div className="space-y-2">
            <label className={labelClasses}>Word Count</label>
            <input className={inputClasses} type="number" min="300" max="3000" value={form.wordCount} onChange={(e) => set('wordCount', e.target.value)} />
          </div>
        )}

        {toolSlug === 'ai-homework-solver' && (
          <div className="space-y-2">
            <label className={labelClasses}>Question</label>
            <textarea className={`${inputClasses} min-h-[160px]`} value={form.question} onChange={(e) => set('question', e.target.value)} placeholder="Paste your homework question…" required />
          </div>
        )}

        {toolSlug === 'ai-flashcard-generator' && (
          <div className="space-y-2">
            <label className={labelClasses}>Cards</label>
            <input className={inputClasses} type="number" min="6" max="30" value={form.count} onChange={(e) => set('count', e.target.value)} />
          </div>
        )}

        <TurnstileWidget onTokenChange={setSecurityToken} resetKey={turnstileResetKey} />
        <button
          type="submit"
          disabled={loading || (turnstileRequired && !securityToken)}
          className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-semibold text-sm disabled:opacity-50 cursor-pointer inline-flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {loading ? 'Working…' : result ? (
            <><RefreshCw className="w-4 h-4" /> Regenerate</>
          ) : 'Generate'}
        </button>
      </form>

      <div className="lg:col-span-8 space-y-4">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 text-red-600 dark:text-red-400 text-xs flex gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}
        {loading && (
          <div className="min-h-[220px] flex flex-col items-center justify-center gap-3 py-16">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-xs text-slate-500">Generating with DeepSeek…</p>
          </div>
        )}
        {!loading && result && (
          <>
            <ResultView toolSlug={toolSlug} data={result} />
            <div className="p-5 rounded-3xl bg-sky-50/50 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-900/30 space-y-3">
              <h4 className="text-xs font-extrabold">Recommended Next Steps</h4>
              <div className="flex flex-wrap gap-2">
                {(NEXT[toolSlug] || []).map((l) => (
                  <Link key={l.slug} href={getSeoPath('study', l.slug)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-[11px] font-bold text-sky-600">
                    {l.label}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
        {!loading && !result && !error && (
          <div className="p-10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            Fill in the form and generate study materials.
          </div>
        )}
      </div>
    </div>
  );
}

export { STUDY_AI_SLUGS };
