'use client';

import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, Bold, Italic, Heading2, Heading3, Link2, Quote, Code, Eye, Edit3, Columns } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function AdminBlogForm({ post, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('youtube');
  const [saving, setSaving] = useState(false);
  const [editorTab, setEditorTab] = useState('split'); // 'edit', 'preview', or 'split'

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setExcerpt(post.excerpt || '');
      setCoverImage(post.coverImage || '');
      setContent(post.content || '');
      setTags(post.tags ? post.tags.join(', ') : '');
      setCategory(post.category || 'youtube');
    } else {
      setTitle('');
      setExcerpt('');
      setCoverImage('');
      setContent('');
      setTags('');
      setCategory('youtube');
    }
  }, [post]);

  const insertTag = (tagOpen, tagClose = '') => {
    const textarea = document.getElementById('blog-editor-content-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + (selected || '') + tagClose;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tagOpen.length, 
        start + tagOpen.length + (selected ? selected.length : 0)
      );
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    setSaving(true);
    const postData = {
      title,
      excerpt,
      coverImage,
      content,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      await onSave(postData);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const labelClasses = "text-[10px] font-bold text-slate-500 uppercase tracking-wider block";
  const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";
  
  const toolbarBtn = "p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors";
  const tabBtn = (tab) => `px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
    editorTab === tab 
      ? 'bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/30 text-sky-600 dark:text-sky-400' 
      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-350'
  }`;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {post ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-955 dark:hover:text-white cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className={labelClasses}>Article Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClasses}
            placeholder="e.g. 5 SEO Strategies for Daraz in 2026"
          />
        </div>
        <ImageUploader value={coverImage} onChange={setCoverImage} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className={labelClasses}>Short Excerpt *</label>
          <input
            type="text"
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={inputClasses}
            placeholder="A brief summary for cards and search snippets..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={labelClasses}>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClasses}
            >
              <option value="youtube">YouTube</option>
              <option value="daraz">Daraz</option>
              <option value="local-commerce">Local Social Commerce & WhatsApp Suite</option>
              <option value="seo-webmaster">SEO & Webmaster Intelligence</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className={labelClasses}>Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={inputClasses}
              placeholder="e.g. SEO, E-Commerce, Daraz"
            />
          </div>
        </div>
      </div>

      {/* Visual Workspace Tab Switcher */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <label className={labelClasses}>Article Content *</label>
        <div className="flex gap-2">
          <button type="button" onClick={() => setEditorTab('edit')} className={tabBtn('edit')} title="Write mode">
            <Edit3 className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button type="button" onClick={() => setEditorTab('preview')} className={tabBtn('preview')} title="Preview mode">
            <Eye className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button type="button" onClick={() => setEditorTab('split')} className={tabBtn('split')} title="Split mode">
            <Columns className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden sm:inline">Split Screen</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className={`grid gap-6 ${editorTab === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* EDIT PANE */}
        {(editorTab === 'edit' || editorTab === 'split') && (
          <div className="space-y-3">
            {/* Formatting Toolbar */}
            <div className="flex flex-wrap gap-1.5 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <button type="button" onClick={() => insertTag('<strong>', '</strong>')} className={toolbarBtn} title="Bold text">
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => insertTag('<em>', '</em>')} className={toolbarBtn} title="Italic text">
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => insertTag('<h2 class="text-lg font-bold mt-4 mb-2 text-slate-900 dark:text-white">', '</h2>')} className={toolbarBtn} title="Heading 2">
                <Heading2 className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => insertTag('<h3 class="text-md font-bold mt-3 mb-1 text-slate-800 dark:text-white">', '</h3>')} className={toolbarBtn} title="Heading 3">
                <Heading3 className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => insertTag('<a href="#" class="text-sky-600 font-bold hover:underline">', '</a>')} className={toolbarBtn} title="Link URL">
                <Link2 className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => insertTag('<blockquote class="border-l-4 border-sky-500 pl-3 italic text-slate-650 my-3">', '</blockquote>')} className={toolbarBtn} title="Quote block">
                <Quote className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => insertTag('<pre class="bg-slate-100 dark:bg-slate-805 p-3.5 rounded-xl font-mono text-xs my-3 overflow-x-auto">', '</pre>')} className={toolbarBtn} title="Code block">
                <Code className="w-3.5 h-3.5" />
              </button>
            </div>

            <textarea
              id="blog-editor-content-textarea"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${inputClasses} font-mono`}
              placeholder="Write or paste raw HTML code generated from wordtohtml.net here..."
              rows={15}
            />
          </div>
        )}

        {/* PREVIEW PANE */}
        {(editorTab === 'preview' || editorTab === 'split') && (
          <div className="border border-slate-202 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-950/40 min-h-[300px] overflow-y-auto max-h-[480px]">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-4 border-b border-slate-200 dark:border-slate-800 pb-1">
              Live Responsive Preview
            </span>
            <div 
              className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-850 dark:text-slate-300 font-medium space-y-4"
              dangerouslySetInnerHTML={{ __html: content || '<p class="text-slate-400 italic">No content written yet. Preview will appear here...</p>' }}
            />
          </div>
        )}

      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-850 dark:hover:text-white font-bold text-xs cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? 'Saving...' : 'Save Post'}
        </button>
      </div>

    </form>
  );
}
