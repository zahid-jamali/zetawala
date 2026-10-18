'use client';

import React from 'react';
import AdsterraSlot from './AdsterraSlot';

/**
 * 1. Top Header Banner: Responsive wrapper
 * Desktop / Tablet (>=640px): 468x60 Banner
 * Mobile (<640px): 320x50 Banner
 */
export function AdsterraTopBanner({ className = '' }) {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      {/* Desktop & Tablet: 468x60 */}
      <div className="hidden sm:flex w-full justify-center">
        <AdsterraSlot slotKey="banner468x60" />
      </div>

      {/* Mobile: 320x50 */}
      <div className="flex sm:hidden w-full justify-center">
        <AdsterraSlot slotKey="banner320x50" />
      </div>
    </div>
  );
}

/**
 * 2. Banner 468x60 (Header / Mid-Section)
 */
export function AdsterraBanner468x60({ className = '' }) {
  return <AdsterraSlot slotKey="banner468x60" className={className} />;
}

/**
 * 3. Banner 320x50 (Mobile Leaderboard)
 */
export function AdsterraBanner320x50({ className = '' }) {
  return <AdsterraSlot slotKey="banner320x50" className={className} />;
}

/**
 * 4. Banner 300x250 (Medium Rectangle — Below Output Sandbox / In-Content)
 */
export function AdsterraBanner300x250({ className = '' }) {
  return <AdsterraSlot slotKey="banner300x250" className={className} />;
}

/**
 * 5. Banner 160x300 (Skyscraper — Sidebar / Wide Screen Gutter)
 */
export function AdsterraBanner160x300({ className = '' }) {
  return <AdsterraSlot slotKey="banner160x300" className={className} />;
}

/**
 * 6. Native Banner 2:1 (Widget layout)
 */
export function AdsterraNativeBanner({ className = '' }) {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <AdsterraSlot slotKey="native2x1" label="Native Banner (Widget 2:1)" />
    </div>
  );
}

/**
 * 7. Social Bar (Floating Push / Dialogue / In-Page Notification Bar)
 */
export { default as AdsterraSocialBar } from './AdsterraSocialBar';

