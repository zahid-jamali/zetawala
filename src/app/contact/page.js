'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Transmission failed.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit form.');
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 py-16 px-6 md:px-12 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-600/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/15 shadow-sm">
            <Mail className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Contact Support</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">Get in touch with our enterprise systems and support engineers.</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-950/20 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 dark:bg-indigo-600/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-405" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Message Transmitted</h2>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-sm mx-auto font-medium">
              Your inquiry has been successfully logged into our secure databases. An automation engineer will review and follow up shortly.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-2 px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-xs font-semibold text-white transition-all cursor-pointer border border-transparent dark:border-slate-200"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 flex items-start gap-3 text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold">Transmission Error</p>
                  <p className="mt-1">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${inputClasses} ${
                  errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-xs text-red-500 font-semibold">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${inputClasses} ${
                  errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="you@domain.com"
              />
              {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">Message Details</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`${inputClasses} ${
                  errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
                placeholder="Explain the details of your inquiry..."
              />
              {errors.message && <p className="text-xs text-red-500 font-semibold">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-transparent dark:border-slate-200 shadow-sm"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
