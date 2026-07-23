import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Zetawala',
  description: 'Understand how Zetawala handles user data and maintains privacy standards across free SEO and creator tools.',
  alternates: { canonical: 'https://zetawala.com/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | Zetawala',
    description: 'Understand how Zetawala handles user data and maintains privacy standards across free SEO and creator tools.',
    url: 'https://zetawala.com/privacy-policy',
    siteName: 'Zetawala',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 py-16 px-6 md:px-12 text-slate-800 dark:text-slate-200 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/15">
            <Shield className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
        </div>
        
        <p className="text-xs text-slate-500 mb-8">Last updated: July 3, 2026</p>

        <div className="space-y-8 text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Scope of Data Collection</h2>
            <p>
              ZetaWala gathers user data to operate, improve, and secure our automated SEO pipelines. The scope of collection encompasses account registration information, active API usage parameters, and generation query history. We do not gather or log user data that falls outside the specific usage configurations of the video and e-commerce tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Utilization of Information</h2>
            <p>
              All gathered telemetry and payload values are processed strictly to generate relevant metadata responses (e.g. YouTube tag configurations, Daraz product descriptions, WhatsApp broadcast copy, and Local Social Commerce & WhatsApp Suite outputs) utilizing secure connections to the underlying LLM processing engines. We enforce strict data separation: user history logs are locked to individual accounts and never cross-pollinated or shared.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Third-Party Integrations & Generative AI</h2>
            <p>
              By utilizing our generators, payload parameters (such as search queries, niche descriptions, and titles) are forwarded to secure cloud processing environments including Google Gemini API endpoints. These data transmittals are covered under strict corporate API confidentiality standards: they are not used to train public base models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. User Rights & Data Deletion</h2>
            <p>
              Users hold absolute rights to inspect, download, or purge their generation history and store states. Standard requests for complete profile and history erasure are executed immediately upon request via our support channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Security Standards</h2>
            <p>
              All connections to our servers, databases, and third-party models are encrypted utilizing modern Transport Layer Security (TLS 1.3) protocols. Database assets are protected with rigorous role-based access control and connection pooling firewalls to guarantee absolute security.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
