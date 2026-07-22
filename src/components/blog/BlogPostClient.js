'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, AlertTriangle } from 'lucide-react';
import CommentSection from './CommentSection';

export default function BlogPostClient({ post, error }) {
  if (error || !post) {
    return (
      <div className="flex-1 bg-slate-50 dark:bg-slate-950 py-20 px-6">
        <div className="max-w-md mx-auto p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm text-center">
          <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Article Error</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{error || 'Article details unavailable.'}</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog catalog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-24 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <article className="max-w-3xl mx-auto px-6 pt-12 space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-405 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all guides
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              {post.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium italic border-l-2 border-sky-500 pl-3">
            {post.excerpt}
          </p>
        </div>

        {post.coverImage && (
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div
          className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-300 font-medium space-y-4 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <CommentSection slug={post.slug} initialComments={post.comments || []} />
      </article>
    </div>
  );
}
