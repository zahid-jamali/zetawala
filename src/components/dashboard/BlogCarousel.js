'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogCarousel({ category }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function loadCategoryBlogs() {
      try {
        const res = await fetch(`/api/blog?category=${category}&limit=10`);
        const json = await res.json();
        if (json.success && json.posts) {
          setPosts(json.posts);
        }
      } catch (err) {
        console.error('Failed to load category blogs for carousel:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryBlogs();
  }, [category]);

  const handleScroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmt = 320; // Card width + gap
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmt : scrollAmt,
        behavior: 'smooth'
      });
    }
  };

  if (loading || posts.length === 0) return null;

  const headerLabel =
    category === 'youtube'
      ? 'YouTube Growth Articles'
      : category === 'local-commerce'
        ? 'WhatsApp & Local Commerce Guides'
        : 'Daraz Sourcing & Ranking Slabs';

  const sectionTitle =
    category === 'youtube'
      ? 'Learn YouTube Growth Strategies'
      : category === 'local-commerce'
        ? 'Learn WhatsApp & Local Commerce Strategies'
        : 'Learn Sourcing & Ranking Strategies';

  return (
    <div className="space-y-6 pt-10 border-t border-slate-200 dark:border-slate-800">
      
      {/* Carousel Toolbar */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-sky-500" />
            {sectionTitle}
          </h3>
          <p className="text-[11px] text-slate-500">Related guides and latest trends matching the {headerLabel.toLowerCase()} category.</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => handleScroll('left')} 
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleScroll('right')} 
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Scroll list */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post) => (
          <div 
            key={post._id} 
            className="w-[280px] sm:w-[300px] shrink-0 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800/80 rounded-3xl p-5 space-y-4 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all snap-start flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Cover Image Placeholder or Actual */}
              <div className="aspect-[16/9] w-full rounded-2xl bg-slate-100 dark:bg-slate-950 overflow-hidden relative border border-slate-100 dark:border-slate-850">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-[10px] uppercase tracking-wider">No Cover Image</div>
                )}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[9px] font-extrabold uppercase bg-sky-500 text-white tracking-widest">{headerLabel}</span>
              </div>

              {/* Title & Excerpt */}
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-2 border-t border-slate-50 dark:border-slate-850 flex justify-between items-center">
              <span className="text-[9px] text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</span>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-[10px] font-extrabold text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-1"
              >
                Read Article
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
