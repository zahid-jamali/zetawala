'use client';

import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection to upload server failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setError(null);
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Cover Image</label>

      {value ? (
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center group shadow-sm">
          <img src={value} alt="Cover preview" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="p-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-slate-350 dark:hover:border-slate-700 transition-colors bg-white dark:bg-slate-900">
          <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {uploading ? 'Uploading image...' : 'Click to upload image'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 text-red-650 dark:text-red-400 text-[10px] font-semibold flex items-center gap-1.5 animate-pulse">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Fallback Text Input Field */}
      <div className="space-y-1">
        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold block">
          * Or paste a direct image URL if Cloudinary upload is unconfigured:
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          placeholder="e.g. https://images.unsplash.com/photo-1234567"
        />
      </div>

    </div>
  );
}
