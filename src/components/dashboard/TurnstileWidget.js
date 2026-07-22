"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

/**
 * Cloudflare Turnstile widget.
 * Tokens are single-use — call reset() or bump `resetKey` after every API request.
 */
const TurnstileWidget = forwardRef(function TurnstileWidget(
  { onTokenChange, resetKey = 0 },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const skipFirstReset = useRef(true);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  onTokenChangeRef.current = onTokenChange;

  const reset = () => {
    onTokenChangeRef.current?.("");
    if (widgetIdRef.current != null && typeof window !== "undefined" && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch (e) {
        console.error("Turnstile reset error:", e);
      }
    }
  };

  useImperativeHandle(ref, () => ({ reset }), []);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;
    let pollId;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current != null) return;
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => onTokenChangeRef.current?.(token),
          "expired-callback": () => onTokenChangeRef.current?.(""),
          "error-callback": () => onTokenChangeRef.current?.(""),
        });
      } catch (e) {
        console.error("Turnstile render error:", e);
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      pollId = setInterval(() => {
        if (window.turnstile) {
          clearInterval(pollId);
          pollId = null;
          renderWidget();
        }
      }, 300);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
      if (widgetIdRef.current != null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  useEffect(() => {
    if (skipFirstReset.current) {
      skipFirstReset.current = false;
      return;
    }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset when parent bumps resetKey
  }, [resetKey]);

  if (!siteKey) return null;

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
        Security Verification
      </label>
      <div
        ref={containerRef}
        className="w-full bg-slate-50 dark:bg-slate-650 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-center"
      />
    </div>
  );
});

export default TurnstileWidget;
