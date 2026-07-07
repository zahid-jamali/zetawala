'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if admin is already authenticated
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (data.authenticated) {
          router.replace('/blog/admin');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/blog/admin');
      } else {
        alert(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to authentication servers.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";

  if (checking) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center py-24 px-6 bg-slate-50 dark:bg-slate-955">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md">
        
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-sky-600 dark:text-sky-400" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Admin Authentication</h2>
          <p className="text-xs text-slate-550 dark:text-slate-400 font-medium">Verify credentials to manage published blog posts</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1 relative">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClasses}
                placeholder="Admin username"
              />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-sky-500/10 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
}
