'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Download,
} from 'lucide-react';
import TurnstileWidget from '../TurnstileWidget';
import FreelancerProfilePanel from './FreelancerProfilePanel';
import { getFreelancerTool } from '../../../config/freelancer/tools';
import { getSeoPath } from '../../../config/routes';
import {
  loadFreelancerProfile,
  profilePrefillForTool,
} from '../../../lib/freelancer/profile';
import { calculateFiverrPackages } from '../../../lib/freelancer/pricing';
import { downloadTextAsPdf, downloadDocxLike } from '../../../lib/study/certificates';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';
const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

const FIELDS = {
  'upwork-proposal-generator': [
    { key: 'jobDescription', label: 'Job Description', type: 'textarea', required: true },
    { key: 'experienceLevel', label: 'Experience Level', type: 'select', options: ['entry', 'intermediate', 'expert'] },
    { key: 'skills', label: 'Skills', type: 'text' },
    { key: 'portfolioLinks', label: 'Portfolio Links', type: 'text' },
    { key: 'preferredTone', label: 'Preferred Tone', type: 'select', options: ['professional', 'friendly', 'confident', 'formal'] },
  ],
  'upwork-proposal-analyzer': [
    { key: 'proposal', label: 'Proposal', type: 'textarea', required: true },
  ],
  'upwork-job-match-analyzer': [
    { key: 'jobDescription', label: 'Job Description', type: 'textarea', required: true },
    { key: 'resumeOrProfile', label: 'Resume / Profile', type: 'textarea', required: true },
  ],
  'upwork-profile-optimizer': [
    { key: 'headline', label: 'Headline', type: 'text', required: true },
    { key: 'bio', label: 'Bio', type: 'textarea', required: true },
    { key: 'skills', label: 'Skills', type: 'text' },
    { key: 'portfolio', label: 'Portfolio', type: 'text' },
    { key: 'experience', label: 'Experience', type: 'text' },
  ],
  'upwork-cover-letter-generator': [
    { key: 'jobDescription', label: 'Job Description', type: 'textarea', required: true },
    { key: 'skills', label: 'Skills', type: 'text' },
    { key: 'experience', label: 'Experience', type: 'text' },
  ],
  'upwork-interview-answer-generator': [
    { key: 'clientQuestion', label: 'Client Question', type: 'textarea', required: true },
    { key: 'jobType', label: 'Job Type', type: 'text' },
    { key: 'experienceLevel', label: 'Experience Level', type: 'select', options: ['entry', 'intermediate', 'expert'] },
  ],
  'upwork-contract-generator': [
    { key: 'clientName', label: 'Client Name', type: 'text', required: true },
    { key: 'projectScope', label: 'Project Scope', type: 'textarea', required: true },
    { key: 'timeline', label: 'Timeline', type: 'text' },
    { key: 'budget', label: 'Budget', type: 'text' },
    { key: 'paymentTerms', label: 'Payment Terms', type: 'text' },
  ],
  'upwork-portfolio-description-generator': [
    { key: 'projectDetails', label: 'Project Details', type: 'textarea', required: true },
    { key: 'technologies', label: 'Technologies', type: 'text' },
    { key: 'results', label: 'Results', type: 'text' },
  ],
  'upwork-client-followup-generator': [
    { key: 'proposalContext', label: 'Proposal Context', type: 'textarea', required: true },
    { key: 'daysSinceSubmission', label: 'Days Since Submission', type: 'number' },
    { key: 'followUpGoal', label: 'Follow-up Goal', type: 'text' },
  ],
  'fiverr-gig-title-generator': [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'keywords', label: 'Keywords', type: 'text' },
  ],
  'fiverr-gig-description-generator': [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'features', label: 'Features', type: 'textarea' },
    { key: 'deliveryTime', label: 'Delivery Time', type: 'text' },
  ],
  'fiverr-gig-seo-analyzer': [
    { key: 'gigTitle', label: 'Gig Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'tags', label: 'Tags', type: 'text' },
  ],
  'fiverr-tag-generator': [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'niche', label: 'Niche', type: 'text' },
  ],
  'fiverr-faq-generator': [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'targetAudience', label: 'Target Audience', type: 'text' },
  ],
  'fiverr-pricing-generator': [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'estimatedHours', label: 'Estimated Hours', type: 'number', required: true },
    { key: 'experienceLevel', label: 'Experience Level', type: 'select', options: ['entry', 'intermediate', 'expert'] },
    { key: 'baseHourly', label: 'Base Hourly ($)', type: 'number' },
  ],
  'fiverr-gig-image-text-generator': [
    { key: 'service', label: 'Service', type: 'text', required: true },
    { key: 'keySellingPoints', label: 'Key Selling Points', type: 'textarea' },
  ],
  'fiverr-buyer-request-reply-generator': [
    { key: 'buyerRequest', label: 'Buyer Request', type: 'textarea', required: true },
    { key: 'skills', label: 'Skills', type: 'text' },
    { key: 'experience', label: 'Experience', type: 'text' },
  ],
  'fiverr-profile-bio-generator': [
    { key: 'skills', label: 'Skills', type: 'text', required: true },
    { key: 'experience', label: 'Experience', type: 'text' },
    { key: 'services', label: 'Services', type: 'textarea' },
  ],
  'fiverr-review-response-generator': [
    { key: 'customerReview', label: 'Customer Review', type: 'textarea', required: true },
    { key: 'tone', label: 'Tone', type: 'select', options: ['professional', 'friendly', 'formal'] },
  ],
};

const NEXT = {
  'upwork-proposal-generator': [
    { slug: 'upwork-proposal-analyzer', label: 'Analyze Proposal' },
    { slug: 'upwork-job-match-analyzer', label: 'Job Match' },
  ],
  'upwork-proposal-analyzer': [
    { slug: 'upwork-proposal-generator', label: 'Rewrite Proposal' },
    { slug: 'upwork-cover-letter-generator', label: 'Cover Letter' },
  ],
  'upwork-job-match-analyzer': [
    { slug: 'upwork-proposal-generator', label: 'Write Proposal' },
    { slug: 'upwork-profile-optimizer', label: 'Optimize Profile' },
  ],
  'upwork-profile-optimizer': [
    { slug: 'upwork-portfolio-description-generator', label: 'Portfolio Copy' },
    { slug: 'upwork-hourly-rate-calculator', label: 'Hourly Rate' },
  ],
  'upwork-cover-letter-generator': [
    { slug: 'upwork-proposal-generator', label: 'Proposal' },
    { slug: 'upwork-interview-answer-generator', label: 'Interview Answers' },
  ],
  'upwork-interview-answer-generator': [
    { slug: 'upwork-client-followup-generator', label: 'Follow-up' },
    { slug: 'upwork-cover-letter-generator', label: 'Cover Letter' },
  ],
  'upwork-contract-generator': [
    { slug: 'upwork-client-followup-generator', label: 'Follow-up' },
    { slug: 'upwork-hourly-rate-calculator', label: 'Rate Calculator' },
  ],
  'upwork-portfolio-description-generator': [
    { slug: 'upwork-profile-optimizer', label: 'Profile Optimizer' },
    { slug: 'upwork-proposal-generator', label: 'Proposal' },
  ],
  'upwork-client-followup-generator': [
    { slug: 'upwork-interview-answer-generator', label: 'Interview Answers' },
    { slug: 'upwork-proposal-analyzer', label: 'Proposal Analyzer' },
  ],
  'fiverr-gig-title-generator': [
    { slug: 'fiverr-gig-description-generator', label: 'Gig Description' },
    { slug: 'fiverr-tag-generator', label: 'Tags' },
  ],
  'fiverr-gig-description-generator': [
    { slug: 'fiverr-gig-seo-analyzer', label: 'SEO Analyzer' },
    { slug: 'fiverr-faq-generator', label: 'FAQ Generator' },
  ],
  'fiverr-gig-seo-analyzer': [
    { slug: 'fiverr-tag-generator', label: 'Tags' },
    { slug: 'fiverr-gig-title-generator', label: 'Titles' },
  ],
  'fiverr-tag-generator': [
    { slug: 'fiverr-gig-seo-analyzer', label: 'SEO Analyzer' },
    { slug: 'fiverr-gig-image-text-generator', label: 'Image Text' },
  ],
  'fiverr-faq-generator': [
    { slug: 'fiverr-gig-description-generator', label: 'Description' },
    { slug: 'fiverr-pricing-generator', label: 'Pricing' },
  ],
  'fiverr-pricing-generator': [
    { slug: 'fiverr-gig-description-generator', label: 'Description' },
    { slug: 'fiverr-buyer-request-reply-generator', label: 'Buyer Reply' },
  ],
  'fiverr-gig-image-text-generator': [
    { slug: 'fiverr-gig-title-generator', label: 'Titles' },
    { slug: 'fiverr-tag-generator', label: 'Tags' },
  ],
  'fiverr-buyer-request-reply-generator': [
    { slug: 'fiverr-review-response-generator', label: 'Review Response' },
    { slug: 'fiverr-profile-bio-generator', label: 'Profile Bio' },
  ],
  'fiverr-profile-bio-generator': [
    { slug: 'fiverr-gig-title-generator', label: 'Gig Titles' },
    { slug: 'fiverr-pricing-generator', label: 'Pricing' },
  ],
  'fiverr-review-response-generator': [
    { slug: 'fiverr-buyer-request-reply-generator', label: 'Buyer Reply' },
    { slug: 'fiverr-profile-bio-generator', label: 'Profile Bio' },
  ],
};

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  if (!text) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold cursor-pointer"
    >
      {ok ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {ok ? 'Copied' : 'Copy'}
    </button>
  );
}

function ScoreBar({ label, value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>{label}</span>
        <span>{v}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

function TextBlock({ title, text }) {
  if (!text) return null;
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-extrabold">{title}</h4>
        <CopyBtn text={text} />
      </div>
      <pre className="text-sm whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-200">{text}</pre>
    </div>
  );
}

function ListBlock({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <h4 className="text-xs font-extrabold mb-2">{title}</h4>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {items.map((item, i) => (
          <li key={i}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

function ResultView({ toolSlug, data }) {
  if (!data) return null;

  if (toolSlug === 'upwork-proposal-analyzer') {
    return (
      <div className="space-y-4">
        <ScoreBar label="Proposal Score" value={data.score} />
        <ScoreBar label="Readability" value={data.readability?.score} />
        {data.readability?.notes && <p className="text-xs text-slate-500">{data.readability.notes}</p>}
        <ListBlock title="Strengths" items={data.strengths} />
        <ListBlock title="Weaknesses" items={data.weaknesses} />
        <ListBlock title="Missing Keywords" items={data.missingKeywords} />
        <ListBlock title="Improvements" items={data.improvementSuggestions} />
      </div>
    );
  }

  if (toolSlug === 'upwork-job-match-analyzer') {
    return (
      <div className="space-y-4">
        <ScoreBar label="Match %" value={data.matchPercentage} />
        <ScoreBar label="Win Probability" value={data.winProbability} />
        <ListBlock title="Missing Skills" items={data.missingSkills} />
        <ListBlock title="Strengths" items={data.strengths} />
        <ListBlock title="Weaknesses" items={data.weaknesses} />
        <ListBlock title="Suggested Improvements" items={data.suggestedImprovements} />
      </div>
    );
  }

  if (toolSlug === 'upwork-profile-optimizer') {
    return (
      <div className="space-y-4">
        <ScoreBar label="Completeness" value={data.completenessScore} />
        <TextBlock title="Optimized Headline" text={data.optimizedHeadline} />
        <TextBlock title="Optimized Bio" text={data.optimizedBio} />
        <ListBlock title="Skill Suggestions" items={data.skillSuggestions} />
        <ListBlock title="Checklist" items={data.improvementChecklist} />
      </div>
    );
  }

  if (toolSlug === 'fiverr-gig-seo-analyzer') {
    return (
      <div className="space-y-4">
        <ScoreBar label="SEO Score" value={data.seoScore} />
        <ScoreBar label="Readability" value={data.readabilityScore} />
        <ListBlock title="Missing Keywords" items={data.missingKeywords} />
        <ListBlock title="Suggestions" items={data.optimizationSuggestions} />
      </div>
    );
  }

  if (toolSlug === 'fiverr-pricing-generator') {
    const pkgs = [data.basicPackage, data.standardPackage, data.premiumPackage].filter(Boolean);
    return (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          {pkgs.map((p) => (
            <div key={p.name} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <p className="text-[10px] font-bold uppercase text-slate-400">{p.name}</p>
              <p className="text-xl font-black">${p.price}</p>
              <p className="text-[11px] text-slate-500 mt-1">{p.hours}h · {p.deliveryDays}d · {p.revisions} rev</p>
            </div>
          ))}
        </div>
        {data.effectiveHourly != null && (
          <p className="text-xs text-slate-500">Effective hourly used: ${data.effectiveHourly}</p>
        )}
        <ListBlock title="Pricing Suggestions" items={data.pricingSuggestions} />
        {data.packageTips && (
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            {Object.entries(data.packageTips).map(([k, v]) => (
              <div key={k} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="font-bold capitalize mb-1">{k}</p>
                <p className="text-slate-500">{v}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (toolSlug === 'fiverr-faq-generator' && data.faqs) {
    return (
      <div className="space-y-3">
        {data.faqs.map((f, i) => (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-extrabold mb-1">{f.question}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{f.answer}</p>
          </div>
        ))}
      </div>
    );
  }

  if (toolSlug === 'upwork-contract-generator') {
    const text = data.contract || '';
    return (
      <div className="space-y-4">
        <TextBlock title={data.contractTitle || 'Contract'} text={text} />
        {data.disclaimer && <p className="text-[11px] text-amber-600 dark:text-amber-400">{data.disclaimer}</p>}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => downloadTextAsPdf(data.contractTitle || 'Contract', text, 'upwork-contract.pdf')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white text-[11px] font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </button>
          <button
            type="button"
            onClick={() => downloadDocxLike('upwork-contract.doc', data.contractTitle || 'Contract', text)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> DOCX
          </button>
        </div>
      </div>
    );
  }

  const textKeys = [
    'personalizedProposal', 'shortVersion', 'detailedVersion', 'coverLetter',
    'suggestedAnswer', 'professionalAlternative', 'portfolioDescription',
    'professionalMessage', 'friendlyVersion', 'formalVersion', 'description',
    'callToAction', 'personalizedReply', 'professionalBio', 'seoOptimizedVersion',
    'professionalResponse', 'friendlyResponse', 'formalResponse', 'optimizedHeadline', 'optimizedBio',
  ];

  return (
    <div className="space-y-4">
      {textKeys.map((k) => (data[k] ? <TextBlock key={k} title={k.replace(/([A-Z])/g, ' $1')} text={data[k]} /> : null))}
      {data.titles && <ListBlock title="Titles" items={data.titles} />}
      {data.tags && <ListBlock title="Tags" items={data.tags} />}
      {data.longTailKeywords && <ListBlock title="Long-tail Keywords" items={data.longTailKeywords} />}
      {data.thumbnailHeadlines && <ListBlock title="Thumbnail Headlines" items={data.thumbnailHeadlines} />}
      {data.badgeText && <ListBlock title="Badge Text" items={data.badgeText} />}
      {data.callToActionText && <ListBlock title="CTA Text" items={data.callToActionText} />}
      {data.tips && <ListBlock title="Tips" items={data.tips} />}
      {data.seoNotes && <p className="text-xs text-slate-500">{data.seoNotes}</p>}
      {!textKeys.some((k) => data[k]) && !data.titles && !data.tags && (
        <pre className="text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

function emptyForm(fields) {
  const o = {};
  fields.forEach((f) => {
    o[f.key] = f.type === 'number' ? (f.key === 'daysSinceSubmission' ? '3' : f.key === 'baseHourly' ? '25' : f.key === 'estimatedHours' ? '8' : '') : f.options?.[1] || f.options?.[0] || '';
  });
  return o;
}

export default function FreelancerAiHost({ toolSlug }) {
  const tool = getFreelancerTool(toolSlug);
  const fields = FIELDS[toolSlug] || [];
  const [form, setForm] = useState(() => emptyForm(fields));
  const [securityToken, setSecurityToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fieldsFor = FIELDS[toolSlug] || [];
    const base = emptyForm(fieldsFor);
    const prefill = profilePrefillForTool(toolSlug, loadFreelancerProfile());
    const merged = { ...base };
    fieldsFor.forEach((f) => {
      if (prefill[f.key]) merged[f.key] = prefill[f.key];
    });
    // map common aliases
    if (fieldsFor.some((f) => f.key === 'resumeOrProfile') && prefill.skills) {
      merged.resumeOrProfile = [
        prefill.name,
        prefill.profession,
        prefill.skills,
        prefill.experience && `${prefill.experience} years experience`,
        prefill.portfolioLinks,
      ]
        .filter(Boolean)
        .join('\n');
    }
    setForm(merged);
    setResult(null);
    setError(null);
  }, [toolSlug]);

  const applyProfile = (profile) => {
    const prefill = profilePrefillForTool(toolSlug, profile);
    setForm((prev) => {
      const next = { ...prev };
      (FIELDS[toolSlug] || []).forEach((f) => {
        if (prefill[f.key]) next[f.key] = prefill[f.key];
      });
      return next;
    });
  };

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const turnstileRequired = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const related = NEXT[toolSlug] || [];

  const charCount = useMemo(() => {
    const long = form.jobDescription || form.proposal || form.description || form.buyerRequest || form.customerReview || form.projectScope || '';
    return String(long).length;
  }, [form]);

  if (!tool) return <p className="text-sm text-slate-500">Unknown freelancer tool.</p>;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      let payload = { ...form };

      if (toolSlug === 'fiverr-pricing-generator') {
        const packages = calculateFiverrPackages({
          estimatedHours: form.estimatedHours,
          experienceLevel: form.experienceLevel,
          baseHourly: form.baseHourly || loadFreelancerProfile().hourlyRate || 25,
        });
        payload = { ...payload, packages };
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: toolSlug, payload, securityToken }),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || 'Generation failed.');
        setResult({ ...packages, ...json.data });
      } else {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: toolSlug, payload, securityToken }),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || 'Generation failed.');
        setResult(json.data);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setSecurityToken('');
      setTurnstileResetKey((k) => k + 1);
    }
  };

  return (
    <div>
      <FreelancerProfilePanel onApplied={applyProfile} />
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={onSubmit}
          className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-black text-slate-900 dark:text-white">{tool.name}</h2>
          </div>
          <p className="text-[11px] text-slate-500">{tool.desc}</p>

          {fields.map((f) => (
            <div key={f.key} className="space-y-2">
              <label className={labelClasses}>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  className={`${inputClasses} min-h-[120px]`}
                  value={form[f.key] || ''}
                  onChange={(e) => set(f.key, e.target.value)}
                  required={f.required}
                  placeholder={f.label}
                />
              ) : f.type === 'select' ? (
                <select
                  className={inputClasses}
                  value={form[f.key] || f.options[0]}
                  onChange={(e) => set(f.key, e.target.value)}
                >
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  className={inputClasses}
                  value={form[f.key] || ''}
                  onChange={(e) => set(f.key, e.target.value)}
                  required={f.required}
                  placeholder={f.label}
                  min={f.type === 'number' ? '0' : undefined}
                />
              )}
            </div>
          ))}

          {charCount > 0 && (
            <p className="text-[10px] text-slate-400">{charCount.toLocaleString()} characters</p>
          )}

          <TurnstileWidget
            onTokenChange={setSecurityToken}
            resetKey={turnstileResetKey}
          />

          <button
            type="submit"
            disabled={loading || (turnstileRequired && !securityToken)}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer inline-flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Generating…' : 'Generate'}
          </button>
        </form>

        <div className="lg:col-span-8 space-y-4">
          {error && (
            <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-sm text-rose-700 dark:text-rose-300 flex gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}
          {loading && (
            <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-sm text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              Running DeepSeek freelancer analysis…
            </div>
          )}
          {!loading && result && <ResultView toolSlug={toolSlug} data={result} />}
          {!loading && !result && !error && (
            <div className="p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-sm text-slate-400">
              Fill the form and generate to see results here.
            </div>
          )}
          {related.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={getSeoPath('freelancer', r.slug)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-sky-600 dark:text-sky-400"
                >
                  {r.label} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
