'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
      <div className="space-y-4">
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-405" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-405" />
            {post.author}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {post.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
