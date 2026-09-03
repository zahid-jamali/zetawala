import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { getHomePath } from '../../i18n/paths';

export default function LocalizedLegalPage({ locale, dict }) {
  const sections = dict.sections || [];
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 py-16 px-6 md:px-12 text-slate-800 dark:text-slate-200">
      <div className="max-w-3xl mx-auto">
        <Link href={getHomePath(locale)} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          {dict.back || 'Home'}
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 flex items-center justify-center border border-indigo-100">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{dict.title}</h1>
        </div>
        {dict.updated && <p className="text-xs text-slate-500 mb-8">{dict.updated}</p>}
        <div className="space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{section.title}</h2>
              {(section.paragraphs || []).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
