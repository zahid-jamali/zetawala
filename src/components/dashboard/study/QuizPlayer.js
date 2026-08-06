'use client';

import React, { useMemo, useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';

export default function QuizPlayer({ questions = [], title = 'Quiz' }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct += 1;
    });
    const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    return { correct, total: questions.length, pct };
  }, [submitted, answers, questions]);

  if (!questions.length) {
    return <p className="text-xs text-slate-500">No questions available.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{title}</h3>
        {submitted && score && (
          <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
            Score {score.correct}/{score.total} · {score.pct}%
          </p>
        )}
      </div>

      {questions.map((q, idx) => {
        const selected = answers[q.id];
        const showReview = submitted && review;
        return (
          <div key={q.id || idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {idx + 1}. {q.question}
            </p>
            <div className="space-y-1.5">
              {(q.options || []).map((opt, oi) => {
                const isCorrect = oi === q.correctIndex;
                const isSelected = selected === oi;
                let cls = 'border-slate-200 dark:border-slate-800';
                if (showReview && isCorrect) cls = 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20';
                else if (showReview && isSelected && !isCorrect) cls = 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/20';
                else if (!submitted && isSelected) cls = 'border-sky-400 bg-sky-50/40 dark:bg-sky-950/20';

                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((p) => ({ ...p, [q.id]: oi }))}
                    className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer disabled:cursor-default ${cls}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {showReview && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      {showReview && isSelected && !isCorrect && <X className="w-3.5 h-3.5 text-rose-500" />}
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
            {showReview && q.explanation && (
              <p className="text-[11px] text-slate-500">Explanation: {q.explanation}</p>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap gap-2">
        {!submitted ? (
          <button
            type="button"
            onClick={() => {
              setSubmitted(true);
              setReview(true);
            }}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold cursor-pointer"
          >
            Submit Quiz
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setReview((v) => !v)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold cursor-pointer"
            >
              {review ? 'Hide Review' : 'Review Mode'}
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setReview(false);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}
