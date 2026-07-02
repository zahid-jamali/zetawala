'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 py-12 px-6 md:px-8 text-slate-500 dark:text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <span className="font-bold text-slate-900 dark:text-white text-lg">ZetaWala</span>
          <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
            High-converting e-commerce analysis and viral content automation suites designed for growth and financial stability.
          </p>
        </div>

        {/* Column 2: Workspace Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Workspace Pages</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/dashboard/youtube/video-ideas" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                YouTube Automation
              </Link>
            </li>
            <li>
              <Link href="/dashboard/daraz/product-hunting" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Daraz SEO Suite
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Platform Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Platform Info</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact Support
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Main Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Compliance Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Compliance & Legal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500">
        <p>&copy; 2026 zetawala.com. All rights reserved.</p>
        <p className="flex gap-4">
          <span>Authority SEO Platform</span>
          <span>&middot;</span>
          <span>Built for Growth</span>
        </p>
      </div>
    </footer>
  );
}
