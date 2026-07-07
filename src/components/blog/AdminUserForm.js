'use client';

import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';

export default function AdminUserForm({ user, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setUsername(user.username || '');
      setRole(user.role || 'user');
      setPassword(''); // Password empty by default during edits
    } else {
      setName('');
      setUsername('');
      setRole('user');
      setPassword('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    if (!user && !password.trim()) {
      alert('Password is required for new user creation.');
      return;
    }

    setSaving(true);
    const userData = {
      name,
      username,
      role,
      ...(password.trim() && { password })
    };

    try {
      await onSave(userData);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const labelClasses = "text-[10px] font-bold text-slate-500 uppercase tracking-wider block";
  const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {user ? `Edit Credentials: ${user.username}` : 'Register New User'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-950 dark:hover:text-white cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className={labelClasses}>Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            placeholder="e.g. Ali Khan"
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClasses}>Username *</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClasses}
            placeholder="e.g. alikhan99"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className={labelClasses}>
            {user ? 'Reset Password (leave blank to keep current)' : 'Password *'}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClasses}
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClasses}>User Role *</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClasses}
          >
            <option value="user">User (Reader & logger)</option>
            <option value="admin">Administrator (Full Access)</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 font-bold text-xs cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? 'Saving...' : 'Save User'}
        </button>
      </div>

    </form>
  );
}
