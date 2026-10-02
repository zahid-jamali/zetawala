'use client';

import React, { useEffect, useRef } from 'react';
import { ADSTERRA_CONFIG } from '../../config/adsterra';

export default function AdsterraSlot({
  slotKey,
  className = '',
  label = null,
}) {
  const containerRef = useRef(null);
  const slot = ADSTERRA_CONFIG[slotKey];

  useEffect(() => {
    if (!ADSTERRA_CONFIG.enabled || !slot?.code || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    // Create an isolated friendly iframe to run Adsterra scripts safely.
    // This protects Next.js React hydration and prevents document.write()
    // or global window.atOptions collisions between multiple banners.
    const iframe = document.createElement('iframe');
    iframe.title = slot.label || 'Advertisement';
    iframe.width = slot.width ? `${slot.width}` : '100%';
    iframe.height = slot.height ? `${slot.height}` : `${slot.minHeight || 200}`;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    iframe.setAttribute('frameBorder', '0');

    container.appendChild(iframe);

    let intervalId = null;

    try {
      const doc = iframe.contentWindow || iframe.contentDocument;
      const iframeDoc = doc.document || doc;
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              html, body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
                overflow: hidden;
                width: 100%;
              }
            </style>
          </head>
          <body>
            ${slot.code}
          </body>
        </html>
      `);
      iframeDoc.close();

      // For dynamic height slots (like Native Banner 2:1), auto-fit height
      if (!slot.height) {
        const updateHeight = () => {
          try {
            const body = iframe.contentDocument?.body;
            if (body && body.scrollHeight > 40) {
              iframe.style.height = `${body.scrollHeight}px`;
            }
          } catch (e) {}
        };
        intervalId = setInterval(updateHeight, 800);
        setTimeout(() => {
          if (intervalId) clearInterval(intervalId);
        }, 10000);
      }
    } catch (err) {
      console.warn('Adsterra slot render error:', err);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [slotKey, slot?.code, slot?.width, slot?.height, slot?.minHeight, slot?.label]);

  if (!ADSTERRA_CONFIG.enabled || !slot) return null;

  const isConfigured = Boolean(slot.code);
  const minH = slot.minHeight || (slot.height || 60);

  return (
    <div className={`w-full flex flex-col items-center justify-center my-4 ${className}`}>
      {/* Subtle Advertisement Disclosure Tag */}
      <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1 select-none">
        Advertisement
      </span>

      {isConfigured ? (
        <div
          ref={containerRef}
          className="flex items-center justify-center max-w-full overflow-hidden"
          style={{
            minHeight: `${minH}px`,
            width: slot.width ? `${slot.width}px` : '100%',
          }}
        />
      ) : (
        /* Visual Placement Placeholder when script is awaiting user input */
        <div
          className="w-full flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 p-3 transition-colors text-center"
          style={{
            minHeight: `${minH}px`,
            maxWidth: slot.width ? `${slot.width}px` : '100%',
          }}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{label || slot.label}</span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            Placement Active · Ready for Adsterra Script
          </span>
        </div>
      )}
    </div>
  );
}
