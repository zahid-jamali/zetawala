'use client';

import React, { useEffect, useState } from 'react';
import { UserRound, Save, Check } from 'lucide-react';
import {
  EMPTY_PROFILE,
  loadFreelancerProfile,
  saveFreelancerProfile,
} from '../../../lib/freelancer/profile';

const inputClasses =
  'w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';
const labelClasses =
  'text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1';

export default function FreelancerProfilePanel({ onApplied }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadFreelancerProfile());
  }, []);

  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  const save = () => {
    const next = saveFreelancerProfile(profile);
    setProfile(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    onApplied?.(next);
  };

  return (
    <div className="mb-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer"
      >
        <span className="flex items-center gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-200">
          <UserRound className="w-3.5 h-3.5 text-emerald-500" />
          Freelancer Profile (optional)
        </span>
        <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
          {open ? 'Hide' : 'Edit / Prefill'}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 grid sm:grid-cols-2 gap-3 border-t border-slate-200 dark:border-slate-800 pt-3">
          {[
            ['name', 'Name'],
            ['profession', 'Profession'],
            ['skills', 'Skills'],
            ['yearsExperience', 'Years of Experience'],
            ['portfolioLinks', 'Portfolio Links'],
            ['certifications', 'Certifications'],
            ['industries', 'Industries'],
            ['hourlyRate', 'Hourly Rate'],
          ].map(([k, label]) => (
            <div key={k}>
              <label className={labelClasses}>{label}</label>
              <input
                className={inputClasses}
                value={profile[k] || ''}
                onChange={(e) => set(k, e.target.value)}
                placeholder={label}
              />
            </div>
          ))}
          <div>
            <label className={labelClasses}>Writing Tone</label>
            <select
              className={inputClasses}
              value={profile.writingTone || 'professional'}
              onChange={(e) => set('writingTone', e.target.value)}
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="confident">Confident</option>
              <option value="formal">Formal</option>
            </select>
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="button"
              onClick={save}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-[11px] font-bold cursor-pointer"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saved ? 'Saved & Applied' : 'Save & Prefill Forms'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
