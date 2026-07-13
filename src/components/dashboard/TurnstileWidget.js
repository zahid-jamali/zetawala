"use client";

import React, { useEffect, useRef } from "react";

export default function TurnstileWidget({ onTokenChange }) {
  const widgetRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !widgetRef.current) return;

    const renderWidget = () => {
      if (window.turnstile) {
        try {
          window.turnstile.render(widgetRef.current, {
            sitekey: siteKey,
            callback: (token) => {
              onTokenChange(token);
            },
            "expired-callback": () => {
              onTokenChange("");
            },
            "error-callback": () => {
              onTokenChange("");
            },
          });
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [siteKey, onTokenChange]);

  if (!siteKey) return null;

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
        Security Verification
      </label>
      <div
        ref={widgetRef}
        className="w-full bg-slate-50 dark:bg-slate-650 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-center"
      />
    </div>
  );
}
