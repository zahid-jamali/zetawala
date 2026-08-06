'use client';

import React, { useCallback, useRef, useState } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

export default function FileDropzone({
  accept,
  maxMb = 10,
  file,
  onFile,
  label = 'Drop a file here or click to browse',
  hint,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  const pick = useCallback(
    (f) => {
      if (!f) return;
      if (f.size > maxMb * 1024 * 1024) {
        setError(`File must be under ${maxMb}MB.`);
        return;
      }
      setError(null);
      onFile(f);
    },
    [maxMb, onFile]
  );

  return (
    <div className="space-y-2">
      {file ? (
        <div className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileIcon className="w-4 h-4 text-sky-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
              <p className="text-[10px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onFile(null)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer ${
            dragging
              ? 'border-sky-400 bg-sky-50/50 dark:bg-sky-950/20'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-700'
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => pick(e.target.files?.[0])}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{label}</p>
            {hint && <p className="text-[10px] text-slate-500">{hint}</p>}
          </div>
        </div>
      )}
      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}
