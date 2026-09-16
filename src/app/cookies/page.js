import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy | Zetawala',
  description: 'Learn how cookies are used on Zetawala to secure sessions and improve free SEO and creator tool experiences.',
  alternates: { canonical: 'https://www.zetawala.com/cookies' },
  openGraph: {
    title: 'Cookie Policy | Zetawala',
    description: 'Learn how cookies are used on Zetawala to secure sessions and improve free SEO and creator tool experiences.',
    url: 'https://www.zetawala.com/cookies',
    siteName: 'Zetawala',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 py-16 px-6 md:px-12 text-slate-800 dark:text-slate-200 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-855 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/15">
            <ShieldCheck className="w-6 h-6 text-indigo-655 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Cookie Policy</h1>
        </div>
        
        <p className="text-xs text-slate-500 mb-8">Last updated: July 3, 2026</p>

        <div className="space-y-8 text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Use of Cookies</h2>
            <p>
              Cookies are small text files stored locally on your device by your web browser. ZetaWala utilizes cookies to identify user sessions, preserve UI preferences (e.g. sidebar toggle status and active tabs), and maintain authentication tokens.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Essential Cookies</h2>
            <p>
              These cookies are critical to navigating and accessing the secure dashboard areas of the platform. Disabling these cookies will result in service degradation and inability to hold a session or configure active tool inputs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Analytical & Performance Settings</h2>
            <p>
              We utilize minor tracking tokens to measure platform latency, identify route load issues, and optimize database pooling workloads. All analytical telemetry gathered is anonymized and processed solely for server performance optimization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Control & Management</h2>
            <p>
              You hold the right to block or delete cookies via your browser's security settings. Please note that blocking essential cookies will restrict access to the metadata generator dashboards.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
