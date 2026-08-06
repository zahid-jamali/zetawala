'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PenLine,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Download,
  UploadCloud,
} from 'lucide-react';
import TurnstileWidget from '../TurnstileWidget';
import { getWritingTool, LANG_LABELS, WRITING_TOOL_SLUGS } from '../../../config/writing/tools';
import { getSeoPath } from '../../../config/routes';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';
const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

const NEXT = {
  'ai-humanizer': [
    { slug: 'ai-content-detector', label: 'AI Detector' },
    { slug: 'paraphrasing-tool', label: 'Paraphrase' },
    { slug: 'grammar-checker', label: 'Grammar Check' },
  ],
  'ai-content-detector': [
    { slug: 'ai-humanizer', label: 'Humanize' },
    { slug: 'plagiarism-checker', label: 'Plagiarism Check' },
  ],
  'plagiarism-checker': [
    { slug: 'ai-content-detector', label: 'AI Detector' },
    { slug: 'grammar-checker', label: 'Grammar Check' },
  ],
  'grammar-checker': [
    { slug: 'paraphrasing-tool', label: 'Paraphrase' },
    { slug: 'ai-rewrite-tool', label: 'Rewrite' },
  ],
  'paraphrasing-tool': [
    { slug: 'ai-rewrite-tool', label: 'Rewrite' },
    { slug: 'ai-humanizer', label: 'Humanize' },
  ],
  'roman-urdu-to-urdu': [
    { slug: 'urdu-to-roman-urdu', label: 'Urdu → Roman' },
    { slug: 'roman-urdu-grammar', label: 'Roman Grammar' },
  ],
  'urdu-to-roman-urdu': [
    { slug: 'roman-urdu-to-urdu', label: 'Roman → Urdu' },
    { slug: 'roman-urdu-grammar', label: 'Roman Grammar' },
  ],
  'roman-urdu-grammar': [
    { slug: 'roman-urdu-to-urdu', label: 'Roman → Urdu' },
    { slug: 'grammar-checker', label: 'Grammar Checker' },
  ],
  'ai-text-summarizer': [
    { slug: 'ai-rewrite-tool', label: 'Rewrite' },
    { slug: 'paraphrasing-tool', label: 'Paraphrase' },
  ],
  'ai-rewrite-tool': [
    { slug: 'paraphrasing-tool', label: 'Paraphrase' },
    { slug: 'ai-humanizer', label: 'Humanize' },
  ],
};

function countWords(t) {
  return String(t || '').trim().split(/\s+/).filter(Boolean).length;
}

function CopyBtn({ text, label = 'Copy' }) {
  const [ok, setOk] = useState(false);
  if (!text) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold cursor-pointer"
    >
      {ok ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {ok ? 'Copied' : label}
    </button>
  );
}

function DownloadBtn({ text, filename = 'output.txt' }) {
  if (!text) return null;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  return (
    <a
      href={href}
      download={filename}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold"
    >
      <Download className="w-3.5 h-3.5" />
      Download
    </a>
  );
}

function ScoreBar({ label, value, color = 'sky' }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  const colors = {
    sky: 'bg-sky-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>{label}</span>
        <span>{v}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className={`h-full ${colors[color] || colors.sky}`} style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

function ResultPanel({ toolSlug, data, rejectedIds, toggleReject }) {
  if (!data) return null;

  if (toolSlug === 'ai-humanizer') {
    return (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <ScoreBar label="Humanization Score" value={data.humanizationScore} color="emerald" />
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <ScoreBar label="Readability Score" value={data.readabilityScore} color="sky" />
          </div>
        </div>
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <h3 className="text-sm font-extrabold">Humanized Text</h3>
            <div className="flex gap-2">
              <CopyBtn text={data.humanizedText} />
              <DownloadBtn text={data.humanizedText} filename="humanized.txt" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500">
            {data.wordCount ?? countWords(data.humanizedText)} words · {data.characterCount ?? (data.humanizedText || '').length} characters
          </p>
          <pre className="text-sm whitespace-pre-wrap leading-relaxed">{data.humanizedText}</pre>
        </div>
      </div>
    );
  }

  if (toolSlug === 'ai-content-detector') {
    return (
      <div className="space-y-4">
        <p className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-3">
          {data.disclaimer || 'Estimates only — not forensic proof of authorship.'}
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <ScoreBar label="AI Estimate" value={data.aiPercentage} color="rose" />
          </div>
          <div className="p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <ScoreBar label="Human Estimate" value={data.humanPercentage} color="emerald" />
          </div>
          <div className="p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <ScoreBar label="Confidence" value={data.confidenceScore} color="amber" />
          </div>
        </div>
        {data.summary && <p className="text-xs text-slate-600 dark:text-slate-300">{data.summary}</p>}
        <div className="space-y-2">
          {(data.sentenceAnalysis || []).map((s, i) => (
            <div key={i} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                s.label === 'likely-ai' ? 'bg-rose-50 text-rose-600' : s.label === 'likely-human' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>{s.label}</span>
              <p className="text-slate-800 dark:text-slate-200">{s.sentence}</p>
              <p className="text-slate-500">{s.reason}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (toolSlug === 'plagiarism-checker') {
    return (
      <div className="space-y-4">
        <p className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-3">
          {data.disclaimer || 'Local/document similarity analysis — not internet-wide plagiarism detection.'}
        </p>
        <div className="p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <ScoreBar label="Similarity Estimate" value={data.similarityPercentage} color="amber" />
        </div>
        {data.summary && <p className="text-xs text-slate-600 dark:text-slate-300">{data.summary}</p>}
        {(data.highlightedSections || []).map((h, i) => (
          <div key={i} className="p-3 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10 text-xs space-y-1">
            <p className="font-bold text-amber-700 dark:text-amber-400">{h.issue}</p>
            <p className="text-slate-800 dark:text-slate-200">{h.excerpt}</p>
            <p className="text-slate-500">{h.note}</p>
          </div>
        ))}
        {(data.sourceMatches || []).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold">Source matches (local)</h4>
            {data.sourceMatches.map((m, i) => (
              <div key={i} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                <p className="font-bold">{m.label} · {m.overlapEstimate}</p>
                <p className="text-slate-500 mt-1">{m.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (toolSlug === 'grammar-checker') {
    const suggestions = (data.suggestions || []).filter((s) => !rejectedIds.has(s.id));
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <h3 className="text-sm font-extrabold">Corrected Text</h3>
            <div className="flex gap-2">
              <CopyBtn text={data.correctedText} />
              <DownloadBtn text={data.correctedText} filename="corrected.txt" />
            </div>
          </div>
          <pre className="text-sm whitespace-pre-wrap">{data.correctedText}</pre>
        </div>
        {data.summary && <p className="text-xs text-slate-500">{data.summary}</p>}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold">Suggestions (accept or reject)</h4>
          {suggestions.map((s) => (
            <div key={s.id} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between gap-2">
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{s.type}</span>
                <button type="button" onClick={() => toggleReject(s.id)} className="text-[10px] font-bold text-rose-500 cursor-pointer">Reject</button>
              </div>
              <p><span className="line-through text-slate-400">{s.original}</span> → <span className="font-bold text-emerald-600">{s.suggestion}</span></p>
              <p className="text-slate-500">{s.explanation}</p>
            </div>
          ))}
          {suggestions.length === 0 && <p className="text-xs text-slate-500">No open suggestions.</p>}
        </div>
      </div>
    );
  }

  if (toolSlug === 'paraphrasing-tool' || toolSlug === 'ai-rewrite-tool') {
    const body = data.paraphrasedText || data.rewrittenText;
    return (
      <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <h3 className="text-sm font-extrabold">{toolSlug === 'paraphrasing-tool' ? 'Paraphrased Text' : 'Rewritten Text'}</h3>
          <div className="flex gap-2">
            <CopyBtn text={body} />
            <DownloadBtn text={body} filename="rewrite.txt" />
          </div>
        </div>
        <p className="text-[10px] text-slate-500">
          Mode: {data.mode} · {data.wordCount ?? countWords(body)} words · {data.characterCount ?? (body || '').length} chars
        </p>
        <pre className="text-sm whitespace-pre-wrap">{body}</pre>
        {(data.changesOverview || data.notes) && (
          <p className="text-xs text-slate-500">{data.changesOverview || (Array.isArray(data.notes) ? data.notes.join(' · ') : data.notes)}</p>
        )}
      </div>
    );
  }

  if (toolSlug === 'roman-urdu-to-urdu') {
    return (
      <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <h3 className="text-sm font-extrabold">Urdu Script</h3>
          <div className="flex gap-2">
            <CopyBtn text={data.urduText} />
            <DownloadBtn text={data.urduText} filename="urdu.txt" />
          </div>
        </div>
        <p className="text-[10px] text-slate-500">{data.characterCount ?? (data.urduText || '').length} characters</p>
        <pre className="text-lg whitespace-pre-wrap leading-relaxed text-right" dir="rtl">{data.urduText}</pre>
      </div>
    );
  }

  if (toolSlug === 'urdu-to-roman-urdu') {
    return (
      <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <h3 className="text-sm font-extrabold">Roman Urdu</h3>
          <div className="flex flex-wrap gap-2">
            <CopyBtn text={data.romanUrduText} />
            <DownloadBtn text={data.romanUrduText} filename="roman-urdu.txt" />
          </div>
        </div>
        <p className="text-[10px] text-slate-500">Style: {data.style} · {data.characterCount ?? (data.romanUrduText || '').length} characters</p>
        <pre className="text-sm whitespace-pre-wrap">{data.romanUrduText}</pre>
      </div>
    );
  }

  if (toolSlug === 'roman-urdu-grammar') {
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Original</h3>
            <pre className="text-sm whitespace-pre-wrap">{data.originalText}</pre>
          </div>
          <div className="p-4 rounded-3xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 space-y-2">
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Corrected</h3>
              <CopyBtn text={data.correctedText} />
            </div>
            <pre className="text-sm whitespace-pre-wrap">{data.correctedText}</pre>
          </div>
        </div>
        {(data.suggestions || []).map((s, i) => (
          <div key={i} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <span className="line-through text-slate-400">{s.original}</span> → <span className="font-bold text-emerald-600">{s.corrected}</span>
            <p className="text-slate-500 mt-1">{s.reason}</p>
          </div>
        ))}
      </div>
    );
  }

  if (toolSlug === 'ai-text-summarizer') {
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="flex justify-between items-center gap-2">
            <h3 className="text-sm font-extrabold">Short Summary</h3>
            <CopyBtn text={data.shortSummary} />
          </div>
          <p className="text-sm">{data.shortSummary}</p>
        </div>
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h3 className="text-sm font-extrabold">Bullet Summary</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {(data.bulletSummary || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
        <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h3 className="text-sm font-extrabold">Key Points</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {(data.keyPoints || []).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <pre className="text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
  );
}

export default function WritingHost({ toolSlug }) {
  const tool = getWritingTool(toolSlug);
  const [text, setText] = useState('');
  const [referenceText, setReferenceText] = useState('');
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState(tool?.modes?.[0] || 'standard');
  const [style, setStyle] = useState(tool?.styles?.[0] || 'standard');
  const [length, setLength] = useState(tool?.lengths?.[0] || 'medium');
  const [securityToken, setSecurityToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [rejectedIds, setRejectedIds] = useState(new Set());

  if (!tool) return <p className="text-sm text-slate-500">Unknown writing tool.</p>;

  const words = countWords(text);
  const chars = text.length;
  const needsLang = Array.isArray(tool.languages);
  const turnstileRequired = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const onExtractFile = async (file) => {
    if (!file) return;
    if (turnstileRequired && !securityToken) {
      setError('Complete the security check before uploading a document.');
      return;
    }
    setExtracting(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('securityToken', securityToken || '');
      const res = await fetch('/api/writing/extract', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Extract failed.');
      setText(json.data.text || '');
      setSecurityToken('');
      setTurnstileResetKey((k) => k + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setExtracting(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setRejectedIds(new Set());
    try {
      const payload = { text };
      if (needsLang) payload.language = language;
      if (tool.modes) payload.mode = mode;
      if (tool.styles) payload.style = style;
      if (tool.lengths) payload.length = length;
      if (toolSlug === 'plagiarism-checker' && referenceText.trim()) {
        payload.referenceText = referenceText;
      }

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

  const toggleReject = (id) => {
    setRejectedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={onSubmit} className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <PenLine className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">{tool.name}</h2>
        </div>
        <p className="text-[11px] text-slate-500">{tool.desc}</p>

        {needsLang && (
          <div className="space-y-2">
            <label className={labelClasses}>Language</label>
            <select className={inputClasses} value={language} onChange={(e) => setLanguage(e.target.value)}>
              {tool.languages.map((l) => (
                <option key={l} value={l}>{LANG_LABELS[l] || l}</option>
              ))}
            </select>
          </div>
        )}

        {tool.modes && (
          <div className="space-y-2">
            <label className={labelClasses}>Mode</label>
            <select className={inputClasses} value={mode} onChange={(e) => setMode(e.target.value)}>
              {tool.modes.map((m) => (
                <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
              ))}
            </select>
          </div>
        )}

        {tool.styles && (
          <div className="space-y-2">
            <label className={labelClasses}>Transliteration Style</label>
            <select className={inputClasses} value={style} onChange={(e) => setStyle(e.target.value)}>
              {tool.styles.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        )}

        {tool.lengths && (
          <div className="space-y-2">
            <label className={labelClasses}>Summary Length</label>
            <select className={inputClasses} value={length} onChange={(e) => setLength(e.target.value)}>
              {tool.lengths.map((l) => (
                <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          <label className={labelClasses}>Input Text</label>
          <textarea
            className={`${inputClasses} min-h-[180px]`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here…"
            dir={toolSlug === 'urdu-to-roman-urdu' ? 'rtl' : 'ltr'}
          />
          <p className="text-[10px] text-slate-500">{words} words · {chars} characters</p>
        </div>

        <TurnstileWidget onTokenChange={setSecurityToken} resetKey={turnstileResetKey} />

        {tool.supportsUpload && (
          <div className="space-y-2">
            <label className={labelClasses}>Or upload PDF / DOCX / TXT</label>
            <p className="text-[10px] text-slate-500">Complete the security check above before uploading.</p>
            <label className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 cursor-pointer hover:border-sky-300 text-xs font-bold text-slate-600 dark:text-slate-300">
              <UploadCloud className="w-4 h-4 text-sky-500" />
              {extracting ? 'Extracting…' : 'Upload document'}
              <input
                type="file"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                className="hidden"
                onChange={(e) => onExtractFile(e.target.files?.[0])}
              />
            </label>
            <div className="space-y-2">
              <label className={labelClasses}>Optional reference text (local compare)</label>
              <textarea
                className={`${inputClasses} min-h-[100px]`}
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                placeholder="Paste a second document to compare against…"
              />
            </div>
            <p className="text-[10px] text-amber-600 dark:text-amber-400">
              Local/document similarity only — not a web-wide plagiarism search.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || extracting || (turnstileRequired && !securityToken)}
          className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-semibold text-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Generating…' : 'Run Tool'}
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
            <Loader2 className="w-10 h-10 animate-spin text-slate-800 dark:text-white" />
            <p className="text-xs text-slate-500">Running DeepSeek writing analysis…</p>
          </div>
        )}
        {!loading && result && (
          <>
            <ResultPanel
              toolSlug={toolSlug}
              data={result}
              rejectedIds={rejectedIds}
              toggleReject={toggleReject}
            />
            <div className="p-5 rounded-3xl bg-sky-50/50 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-900/30 space-y-3">
              <h4 className="text-xs font-extrabold">Recommended Next Steps</h4>
              <div className="flex flex-wrap gap-2">
                {(NEXT[toolSlug] || []).map((l) => (
                  <Link
                    key={l.slug}
                    href={getSeoPath('writing', l.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-sky-600"
                  >
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
            Enter text and run the tool to see AI writing results.
          </div>
        )}
      </div>
    </div>
  );
}

export const WRITING_HOST_SLUGS = WRITING_TOOL_SLUGS;
