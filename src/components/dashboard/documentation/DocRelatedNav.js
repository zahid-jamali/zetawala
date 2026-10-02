'use client';

import React from 'react';
import Link from 'next/link';
import { Network, BookOpen, ArrowUpRight } from 'lucide-react';

export default function DocRelatedNav({ guide }) {
  if (!guide) return null;

  return (
    <div className="space-y-10">
      {/* Section N: Related Tools */}
      {guide.relatedTools?.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Network className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Related tools
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {guide.relatedTools.map((rel, idx) => (
              <Link
                key={idx}
                href={rel.path}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all space-y-2 shadow-2xs hover:shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {rel.name}
                    </h3>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {rel.reason}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Section O: Related Educational Guides */}
      {guide.relatedGuides?.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Related educational guides
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {guide.relatedGuides.map((g, idx) => (
              <Link
                key={idx}
                href={g.href}
                className="group p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/50 transition-all flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-2xs"
              >
                <span>{g.title}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
