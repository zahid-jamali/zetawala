'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { getHomePath } from '../../i18n/paths';

export default function LocalizedContact({ locale, dict }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const next = {};
    if (!formData.name.trim()) next.name = dict.errors?.name || 'Required';
    if (!formData.email.trim()) next.email = dict.errors?.email || 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = dict.errors?.emailInvalid || 'Invalid email';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      next.message = dict.errors?.message || 'Required';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || dict.errors?.send);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20';

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 py-16 px-6">
      <div className="max-w-xl mx-auto">
        <Link href={getHomePath(locale)} className="inline-flex items-center gap-2 text-sm text-slate-500 mb-8">
          <ArrowLeft className="w-4 h-4" />
          {dict.back}
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Mail className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">{dict.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{dict.subtitle}</p>
          </div>
        </div>
        {status === 'success' ? (
          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 border text-center space-y-4">
            <CheckCircle2 className="w-8 h-8 text-indigo-600 mx-auto" />
            <h2 className="text-xl font-bold">{dict.successTitle}</h2>
            <p className="text-sm text-slate-600">{dict.successBody}</p>
            <button type="button" onClick={() => setStatus('idle')} className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold">
              {dict.successCta}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border">
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs flex gap-2">
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider">{dict.nameLabel}</label>
              <input className={`${inputClasses} border-slate-200`} name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={dict.namePlaceholder} />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider">{dict.emailLabel}</label>
              <input className={`${inputClasses} border-slate-200`} name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={dict.emailPlaceholder} />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider">{dict.messageLabel}</label>
              <textarea className={`${inputClasses} border-slate-200`} rows={5} name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={dict.messagePlaceholder} />
              {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
            </div>
            <button type="submit" disabled={status === 'loading'} className="w-full py-4 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2">
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {status === 'loading' ? dict.sending : dict.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
