'use client';

import React, { useState } from 'react';
import { MessageSquare, User, Send } from 'lucide-react';

export default function CommentSection({ slug, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${slug}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment: commentText })
      });
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
        setName('');
        setCommentText('');
      } else {
        alert(data.error || 'Failed to submit comment.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to servers.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";

  return (
    <div className="space-y-6 pt-10 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-sky-600" />
        Discussion ({comments.length})
      </h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              placeholder="e.g. John Doe"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Comment Message</label>
          <textarea
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={inputClasses}
            placeholder="Type your thoughts about this post..."
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">No comments yet. Start the conversation!</p>
        ) : (
          comments.map((c, idx) => (
            <div key={idx} className="p-4 bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-start gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">
                    {new Date(c.createdAt || c.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                  {c.comment}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
