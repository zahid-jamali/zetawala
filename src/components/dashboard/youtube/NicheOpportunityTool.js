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

export default function NicheOpportunityTool() {
  const [niche, setNiche] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [contentFormat, setContentFormat] = useState('Both');
  const [securityToken, setSecurityToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/youtube/niche-opportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, country, language, contentFormat, securityToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Analysis failed.');
      setResult(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const b = result?.opportunity?.breakdown || {};

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={onSubmit} className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <h2 className="text-sm font-black text-slate-900 dark:text-white">Niche to Validate</h2>
        <div className="space-y-2">
          <label className={labelClasses}>Niche *</label>
          <input required className={inputClasses} value={niche} onChange={(e) => setNiche(e.target.value)} placeholder='e.g. Faceless History Documentaries' />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Target Country (optional)</label>
          <input className={inputClasses} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Pakistan" />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Language (optional)</label>
          <input className={inputClasses} value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="e.g. en" />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Content Format</label>
          <select className={inputClasses} value={contentFormat} onChange={(e) => setContentFormat(e.target.value)}>
            <option>Both</option>
            <option>Shorts</option>
            <option>Long-form</option>
          </select>
        </div>
        <TurnstileWidget onTokenChange={setSecurityToken} />
        <button type="submit" disabled={loading || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !securityToken)} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold text-sm disabled:opacity-50">
          {loading ? 'Analyzing Market...' : 'Analyze Niche Opportunity'}
        </button>
      </form>

      <div className="lg:col-span-8 space-y-5">
        <ErrorBanner message={error} />
        {loading && <StageLoader stage="Searching YouTube & calculating opportunity score..." />}

        {result && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <ScoreRing
                score={result.opportunity.score}
                label="Niche Opportunity Score"
                disclaimer="Zetawala Score — not an official YouTube metric"
              />
              <div className="md:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Final Verdict</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{result.opportunity.verdict}</p>
                <p className="text-[11px] text-slate-500 mt-2">{result.labels?.searchVolume}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <MetricCard title="Demand" value={b.demand?.score} badge={b.demand?.label} subtitle={b.demand?.note} />
              <MetricCard title="Competition" value={b.competition?.score} badge={b.competition?.label} />
              <MetricCard title="Content Gap" value={b.contentGap?.score} />
              <MetricCard title="Monetization Potential" value={b.monetization?.score} badge="Estimated" />
              <MetricCard title="Growth Potential" value={b.growth?.score} />
              <MetricCard title="Entry Difficulty" value={b.entryDifficulty?.score} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <MetricCard title="Videos Analyzed" value={result.metrics.videosAnalyzed} badge="Observed Data" />
              <MetricCard title="Channels Sampled" value={result.metrics.channelsAnalyzed} badge="Observed Data" />
              <MetricCard title="Median Views" value={formatNumber(result.metrics.medianViews)} badge="Observed Data" />
              <MetricCard title="Avg Views" value={formatNumber(result.metrics.avgViews)} badge="Observed Data" />
            </div>

            {result.ai && (
              <div className="grid md:grid-cols-2 gap-3">
                <InsightBlock title="Market Snapshot"><ListOrText value={result.ai.marketSnapshot} /></InsightBlock>
                <InsightBlock title="Top Performing Content Patterns"><ListOrText value={result.ai.topPerformingPatterns} /></InsightBlock>
                <InsightBlock title="Content Gaps"><ListOrText value={result.ai.contentGaps} /></InsightBlock>
                <InsightBlock title="Risks"><ListOrText value={result.ai.risks} /></InsightBlock>
                <div className="md:col-span-2">
                  <InsightBlock title="Verdict Narrative"><ListOrText value={result.ai.finalVerdictNarrative} /></InsightBlock>
                </div>
              </div>
            )}
            {result.aiError && <ErrorBanner message={result.aiError} />}

            <NextSteps
              links={[
                { slug: 'revenue-calculator', label: 'Estimate Earnings' },
                { slug: 'channel-health', label: 'Analyze a Competitor Channel' },
                { slug: 'video-ideas', label: 'Generate Video Ideas' },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
