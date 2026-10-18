'use client';

import React from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { ADSTERRA_CONFIG } from '../../config/adsterra';

/**
 * Adsterra Social Bar Component
 *
 * Adsterra Social Bar is a dynamic floating/overlay format (in-page push, floating widgets).
 * Unlike static inline banners, it must not be confined inside an iframe.
 *
 * UX & Performance Guarantees:
 * - strategy="lazyOnload": loads during browser idle time, ensuring 0 impact on LCP, FCP, or hydration.
 * - Suppressed on admin routes (e.g., /blog/admin) so content editing & administration is never disturbed.
 * - data-cfasync="false": prevents Cloudflare Rocket Loader from deferring or breaking the script execution.
 * - Centralized toggle: easily enabled/disabled in ADSTERRA_CONFIG.
 */
export default function AdsterraSocialBar() {
  const pathname = usePathname();

  // Guard: global ads toggle & socialBar toggle
  if (!ADSTERRA_CONFIG.enabled || !ADSTERRA_CONFIG.socialBar?.enabled || !ADSTERRA_CONFIG.socialBar?.src) {
    return null;
  }

  // Guard: Exclude admin routes to preserve UX and workflow
  if (pathname && (pathname.startsWith('/blog/admin') || pathname.startsWith('/admin'))) {
    return null;
  }

  return (
    <Script
      id="adsterra-social-bar"
      src={ADSTERRA_CONFIG.socialBar.src}
      strategy="lazyOnload"
      data-cfasync="false"
    />
  );
}
