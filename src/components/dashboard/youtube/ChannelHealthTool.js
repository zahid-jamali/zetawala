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

export default function ChannelHealthTool() {
  const [channelInput, setChannelInput] = useState('');
  const [videoLimit, setVideoLimit] = useState(20);
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
      const res = await fetch('/api/youtube/channel-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelInput, videoLimit, securityToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Channel analysis failed.');
      setResult(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={onSubmit} className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <h2 className="text-sm font-black text-slate-900 dark:text-white">Channel Input</h2>
        <div className="space-y-2">
          <label className={labelClasses}>Channel URL / @Handle / ID *</label>
          <input
            required
            className={inputClasses}
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
            placeholder="youtube.com/@handle or UC..."
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses}>Analyze Last N Videos</label>
          <select className={inputClasses} value={videoLimit} onChange={(e) => setVideoLimit(Number(e.target.value))}>
            <option value={10}>Last 10 videos</option>
            <option value={20}>Last 20 videos</option>
            <option value={30}>Last 30 videos</option>
          </select>
        </div>
        <TurnstileWidget onTokenChange={setSecurityToken} />
        <button type="submit" disabled={loading || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !securityToken)} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold text-sm disabled:opacity-50">
          {loading ? 'Analyzing Channel...' : 'Analyze Channel Health'}
        </button>
      </form>

      <div className="lg:col-span-8 space-y-5">
        <ErrorBanner message={error} />
        {loading && <StageLoader stage="Resolving channel & analyzing recent uploads..." />}

        {result && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <ScoreRing score={result.health.score} label="Channel Health Score" disclaimer={result.disclaimer} />
              <div className="md:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Channel Overview</p>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{result.channel.title}</h3>
                <p className="text-xs text-slate-500">
                  Subscribers: {result.channel.subscribersHidden ? 'Hidden' : formatNumber(result.channel.subscribers)} · Total views: {formatNumber(result.channel.totalViews)} · Videos: {formatNumber(result.channel.videoCount)}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(result.health.dimensions || {}).map(([key, dim]) => (
                <MetricCard key={key} title={key} value={dim.score} badge={dim.label} />
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <MetricCard title="Median Views" value={formatNumber(result.summary.medianViews)} badge="Observed Data" />
              <MetricCard title="Avg Views" value={formatNumber(result.summary.avgViews)} badge="Observed Data" />
              <MetricCard title="Uploads / Week" value={result.summary.uploadFrequencyPerWeek ?? 'N/A'} />
              <MetricCard title="Engagement Rate" value={result.summary.avgEngagementRate ?? 'N/A'} />
              <MetricCard title="Momentum Ratio" value={result.momentum?.momentumRatio ?? 'N/A'} subtitle="Recent vs older median views" />
              <MetricCard title="Videos Analyzed" value={result.analysisWindow.videosAnalyzed} badge="Observed Data" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h4 className="text-xs font-extrabold">Top Performing Videos</h4>
                {result.topVideos.map((v) => (
                  <p key={v.id} className="text-[11px] text-slate-600 dark:text-slate-300">{v.title} · {formatNumber(v.views)} views</p>
                ))}
              </div>
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <h4 className="text-xs font-extrabold">Underperforming Videos</h4>
                {result.underperformingVideos.map((v) => (
                  <p key={v.id} className="text-[11px] text-slate-600 dark:text-slate-300">{v.title} · {formatNumber(v.views)} views</p>
                ))}
              </div>
            </div>

            {result.ai && (
              <div className="grid md:grid-cols-2 gap-3">
                <InsightBlock title="AI Diagnosis"><ListOrText value={result.ai.diagnosis} /></InsightBlock>
                <InsightBlock title="Strengths"><ListOrText value={result.ai.strengths} /></InsightBlock>
                <InsightBlock title="Weaknesses"><ListOrText value={result.ai.weaknesses} /></InsightBlock>
                <InsightBlock title="Actionable Recommendations"><ListOrText value={result.ai.recommendations} /></InsightBlock>
              </div>
            )}
            {result.aiError && <ErrorBanner message={result.aiError} />}

            <NextSteps
              links={[
                { slug: 'video-performance', label: 'Analyze a Specific Video' },
                { slug: 'video-ideas', label: 'Generate Video Ideas' },
                { slug: 'title-generator', label: 'Improve Titles' },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
