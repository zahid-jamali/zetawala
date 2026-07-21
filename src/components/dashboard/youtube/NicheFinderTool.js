'use client';

import React, { useState } from 'react';
import TurnstileWidget from '../TurnstileWidget';
import {
  inputClasses,
  labelClasses,
  ScoreRing,
  MetricCard,
  StageLoader,
  ErrorBanner,
  InsightBlock,
  NextSteps,
  formatNumber,
  ListOrText,
} from './YoutubeShared';

const STAGES = [
  'Generating niche candidates...',
  'Collecting YouTube sample data...',
  'Calculating opportunity scores...',
  'Generating personalized insights...',
];

export default function NicheFinderTool() {
  const [form, setForm] = useState({
    interests: '',
    skills: '',
    targetAudienceCountry: 'Pakistan',
    contentLanguage: 'English',
    channelType: 'Both',
    mainGoal: 'Make money',
    experienceLevel: 'Beginner',
    weeklyTime: '',
    budget: '',
    contentFormat: 'Both',
    monetizationPreference: 'Multiple',
    topicsToAvoid: '',
  });
  const [securityToken, setSecurityToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [stageIdx, setStageIdx] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setStageIdx(0);
    const timer = setInterval(() => setStageIdx((i) => Math.min(i + 1, STAGES.length - 1)), 3500);

    try {
      const res = await fetch('/api/youtube/niche-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, securityToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Niche finder failed.');
      setResult(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const aiByNiche = {};
  (result?.ai?.niches || []).forEach((n) => {
    if (n?.niche) aiByNiche[n.niche] = n;
  });

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={onSubmit} className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <h2 className="text-sm font-black text-slate-900 dark:text-white">Creator Profile</h2>

        {[
          ['interests', 'Interests / Topics *', 'text', 'e.g. personal finance, history, AI tools'],
          ['skills', 'Skills / Expertise *', 'text', 'e.g. research, editing, storytelling'],
          ['targetAudienceCountry', 'Target Audience Country *', 'text', 'e.g. Pakistan, United States'],
          ['contentLanguage', 'Content Language *', 'text', 'e.g. English, Urdu, Hindi'],
        ].map(([field, label, type, ph]) => (
          <div key={field} className="space-y-2">
            <label className={labelClasses}>{label}</label>
            <input required type={type} className={inputClasses} value={form[field]} onChange={(e) => set(field, e.target.value)} placeholder={ph} />
          </div>
        ))}

        <div className="space-y-2">
          <label className={labelClasses}>Channel Type *</label>
          <select className={inputClasses} value={form.channelType} onChange={(e) => set('channelType', e.target.value)}>
            <option>Faceless</option>
            <option>Personal Brand</option>
            <option>Both</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Main Goal *</label>
          <select className={inputClasses} value={form.mainGoal} onChange={(e) => set('mainGoal', e.target.value)}>
            <option>Make money</option>
            <option>Build a personal brand</option>
            <option>Grow an audience</option>
            <option>Sell products/services</option>
            <option>Affiliate marketing</option>
            <option>Build a long-term media business</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className={labelClasses}>Experience</label>
            <select className={inputClasses} value={form.experienceLevel} onChange={(e) => set('experienceLevel', e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Format</label>
            <select className={inputClasses} value={form.contentFormat} onChange={(e) => set('contentFormat', e.target.value)}>
              <option>Shorts</option>
              <option>Long-form</option>
              <option>Both</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Monetization Preference</label>
          <select className={inputClasses} value={form.monetizationPreference} onChange={(e) => set('monetizationPreference', e.target.value)}>
            <option>Ad revenue</option>
            <option>Sponsorships</option>
            <option>Affiliate marketing</option>
            <option>Digital products</option>
            <option>Services</option>
            <option>Multiple</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className={labelClasses}>Weekly Time Available</label>
          <input className={inputClasses} value={form.weeklyTime} onChange={(e) => set('weeklyTime', e.target.value)} placeholder="e.g. 8 hours" />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Budget</label>
          <input className={inputClasses} value={form.budget} onChange={(e) => set('budget', e.target.value)} placeholder="e.g. low / $50/mo" />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Topics to Avoid</label>
          <input className={inputClasses} value={form.topicsToAvoid} onChange={(e) => set('topicsToAvoid', e.target.value)} placeholder="e.g. crypto trading, politics" />
        </div>

        <TurnstileWidget onTokenChange={setSecurityToken} />
        <button
          type="submit"
          disabled={loading || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !securityToken)}
          className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 font-semibold text-white text-sm disabled:opacity-50"
        >
          {loading ? 'Analyzing Niches...' : 'Find Recommended Niches'}
        </button>
      </form>

      <div className="lg:col-span-8 space-y-5">
        <ErrorBanner message={error} />
        {loading && <StageLoader stage={STAGES[stageIdx]} />}

        {!loading && result && (
          <>
            <div className="space-y-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Recommended YouTube Niches</h2>
              <p className="text-[11px] text-slate-500">Scores are Zetawala Calculations from sampled public YouTube data. Search volume is N/A (not provided by YouTube Data API).</p>
            </div>

            {result.recommendations.map((rec) => {
              const insight = aiByNiche[rec.niche];
              return (
                <div key={rec.niche} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">{rec.niche}</h3>
                      <p className="text-[10px] text-slate-500 mt-1">Confidence: {rec.confidence} · Opportunity {rec.opportunityScore}/100</p>
                    </div>
                    <ScoreRing score={rec.finalScore} label="Zetawala Fit Score" />
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <MetricCard title="Demand" value={rec.demand} badge="Proxy" />
                    <MetricCard title="Competition" value={rec.competition} />
                    <MetricCard title="Content Opportunity" value={rec.contentOpportunity} />
                    <MetricCard title="User Fit" value={rec.userFit} />
                    <MetricCard title="Monetization" value={rec.monetizationPotential} badge="Estimated" />
                    <MetricCard title="Faceless Suitability" value={rec.facelessSuitability} />
                    <MetricCard title="Difficulty" value={rec.difficulty} />
                    <MetricCard title="Median Views (sample)" value={formatNumber(rec.metrics?.medianViews)} badge="Observed Data" />
                  </div>

                  {insight && (
                    <div className="grid md:grid-cols-2 gap-3">
                      <InsightBlock title="Why This Niche?"><ListOrText value={insight.whyThisNiche} /></InsightBlock>
                      <InsightBlock title="Why It Fits You"><ListOrText value={insight.whyItFitsYou} /></InsightBlock>
                      <InsightBlock title="Target Audience"><ListOrText value={insight.targetAudience} /></InsightBlock>
                      <InsightBlock title="Recommended Format"><ListOrText value={insight.recommendedFormat} /></InsightBlock>
                      <InsightBlock title="Content Opportunities"><ListOrText value={insight.contentOpportunities} /></InsightBlock>
                      <InsightBlock title="Monetization Opportunities"><ListOrText value={insight.monetizationOpportunities} /></InsightBlock>
                      <InsightBlock title="Suggested Sub-Niches"><ListOrText value={insight.subNiches} /></InsightBlock>
                      <InsightBlock title="Main Risks"><ListOrText value={insight.mainRisks} /></InsightBlock>
                      <div className="md:col-span-2">
                        <InsightBlock title="First 10 Video Ideas"><ListOrText value={insight.first10VideoIdeas} /></InsightBlock>
                      </div>
                      <div className="md:col-span-2">
                        <InsightBlock title="Channel Positioning & Final Recommendation">
                          <p className="mb-2">{insight.channelPositioning}</p>
                          <p>{insight.finalRecommendation}</p>
                        </InsightBlock>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {result.aiError && <ErrorBanner message={result.aiError} />}
            {result.ai?.overallAdvice && <InsightBlock title="Overall Advice">{result.ai.overallAdvice}</InsightBlock>}

            <NextSteps
              links={[
                { slug: 'niche-opportunity', label: 'Validate with Niche Opportunity Analyzer' },
                { slug: 'revenue-calculator', label: 'Estimate Revenue Potential' },
                { slug: 'video-ideas', label: 'Generate Video Ideas' },
              ]}
            />
          </>
        )}

        {!loading && !result && !error && (
          <div className="p-10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            Enter your creator profile to receive data-validated niche recommendations.
          </div>
        )}
      </div>
    </div>
  );
}
