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

export default function VideoPerformanceTool() {
  const [videoInput, setVideoInput] = useState('');
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
      const res = await fetch('/api/youtube/video-performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoInput, securityToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Video analysis failed.');
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
        <h2 className="text-sm font-black text-slate-900 dark:text-white">Video Input</h2>
        <div className="space-y-2">
          <label className={labelClasses}>YouTube Video URL / ID *</label>
          <input
            required
            className={inputClasses}
            value={videoInput}
            onChange={(e) => setVideoInput(e.target.value)}
            placeholder="youtube.com/watch?v=... or shorts URL"
          />
        </div>
        <TurnstileWidget onTokenChange={setSecurityToken} />
        <button type="submit" disabled={loading || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !securityToken)} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-semibold text-sm disabled:opacity-50">
          {loading ? 'Analyzing Video...' : 'Analyze Video Performance'}
        </button>
      </form>

      <div className="lg:col-span-8 space-y-5">
        <ErrorBanner message={error} />
        {loading && <StageLoader stage="Fetching video stats & comparing to channel baseline..." />}

        {result && (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              <ScoreRing score={result.performance.score} label="Video Performance Score" disclaimer={result.disclaimer} />
              <div className="md:col-span-2 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Video Snapshot</p>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{result.video.title}</h3>
                <p className="text-xs text-slate-500">
                  {formatNumber(result.video.views)} views · {formatNumber(result.video.likes)} likes · {result.channel.title}
                </p>
                {result.caveats?.map((c) => (
                  <p key={c} className="text-[11px] text-amber-600 dark:text-amber-400">{c}</p>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <MetricCard title="vs Channel Average" value={result.performance.ratios.vsChannelAverage != null ? `${result.performance.ratios.vsChannelAverage}×` : 'N/A'} />
              <MetricCard title="vs Channel Median" value={result.performance.ratios.vsChannelMedian != null ? `${result.performance.ratios.vsChannelMedian}×` : 'N/A'} />
              <MetricCard title="Views / Subscriber" value={result.performance.ratios.viewsPerSubscriber ?? 'N/A'} />
              <MetricCard title="Engagement Rate" value={result.performance.ratios.engagementRate ?? 'N/A'} />
              <MetricCard title="Views / Day" value={formatNumber(result.viewsPerDay)} badge="Zetawala Calculation" />
              <MetricCard title="Channel Median Views" value={formatNumber(result.channelBaseline.medianViews)} badge="Observed Data" />
            </div>

            {result.ai && (
              <div className="grid md:grid-cols-2 gap-3">
                <InsightBlock title="What Worked"><ListOrText value={result.ai.whatWorked} /></InsightBlock>
                <InsightBlock title="Potential Weaknesses"><ListOrText value={result.ai.potentialWeaknesses} /></InsightBlock>
                <InsightBlock title="Content Pattern Analysis"><ListOrText value={result.ai.contentPatternAnalysis} /></InsightBlock>
                <InsightBlock title="AI Performance Diagnosis"><ListOrText value={result.ai.diagnosis} /></InsightBlock>
                <div className="md:col-span-2">
                  <InsightBlock title="Next Video Opportunities">
                    <ul className="list-disc pl-4 space-y-2">
                      {(result.ai.nextVideoOpportunities || []).map((item, i) => (
                        <li key={i}>
                          <span className="font-bold">{item.idea || item}</span>
                          {item.why && <span className="block text-slate-500 mt-0.5">{item.why}</span>}
                        </li>
                      ))}
                    </ul>
                  </InsightBlock>
                </div>
              </div>
            )}
            {result.aiError && <ErrorBanner message={result.aiError} />}

            <NextSteps
              links={[
                { slug: 'video-ideas', label: 'Video Idea Generator' },
                { slug: 'title-generator', label: 'Title Copywriter' },
                { slug: 'hook-architect', label: 'Retention Hook' },
                { slug: 'script-master', label: 'Script Writer' },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}
