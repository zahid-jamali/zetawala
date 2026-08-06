'use client';

import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

export default function FlashcardPlayer({ cards = [] }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const list = useMemo(() => order.map((i) => cards[i]).filter(Boolean), [order, cards]);
  const card = list[index];

  if (!cards.length) return <p className="text-xs text-slate-500">No flashcards available.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
        <span>Card {index + 1} / {list.length}</span>
        <button
          type="button"
          onClick={() => {
            const next = [...order].sort(() => Math.random() - 0.5);
            setOrder(next);
            setIndex(0);
            setFlipped(false);
          }}
          className="inline-flex items-center gap-1 text-sky-600 cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" /> Shuffle
        </button>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[200px] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-center cursor-pointer transition-transform"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
          {flipped ? 'Answer' : 'Question'} · click to flip
        </p>
        <p className="text-base font-bold text-slate-900 dark:text-white whitespace-pre-wrap">
          {flipped ? card?.back : card?.front}
        </p>
      </button>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => {
            setIndex((i) => Math.max(0, i - 1));
            setFlipped(false);
          }}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          disabled={index >= list.length - 1}
          onClick={() => {
            setIndex((i) => Math.min(list.length - 1, i + 1));
            setFlipped(false);
          }}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
