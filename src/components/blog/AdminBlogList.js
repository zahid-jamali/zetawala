'use client';

import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminBlogList({ posts, onEdit, onDelete }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <p className="text-xs text-slate-500 dark:text-slate-400">No blog posts found. Click the button above to publish your first post!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono">
                  {post.slug}
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                      title="Edit Post"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(post.slug)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-405 transition-all cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
