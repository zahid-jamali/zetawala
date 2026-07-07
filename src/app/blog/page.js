'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, BookOpen, AlertTriangle } from 'lucide-react';
import BlogCard from '../../components/blog/BlogCard';

export default function BlogListingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        } else {
          setError(data.error || 'Failed to retrieve blog posts.');
        }
      } catch (err) {
        console.error(err);
        setError('Error connecting to backend servers.');
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Blog Hero Section */}
      <section className="relative px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0">
          <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          ZetaWala Blog & SEO Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
          Get the latest optimization guides, e-commerce growth metrics, local product sourcing case studies, and YouTube automation secrets.
        </p>
      </section>

      {/* Blog Cards Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg mx-auto">
            <p className="text-xs text-slate-500 dark:text-slate-400">No guides have been published yet. Please check back later!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
