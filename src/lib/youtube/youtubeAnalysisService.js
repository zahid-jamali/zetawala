import {
  searchList,
  getChannelsByIds,
  getVideosByIds,
  getRecentUploads,
  resolveChannel,
  resolveVideo,
  normalizeChannel,
  normalizeVideo,
} from './youtubeClient';
import {
  summarizeVideoSet,
  recentVsOlderMomentum,
  extractTitlePatterns,
  topAndBottomVideos,
  safeRatio,
  round,
  viewsPerDay,
} from './youtubeAnalytics';
import { scoreNicheOpportunity, scoreChannelHealth, scoreVideoPerformance } from './youtubeScoring';
import { cacheGet, cacheSet, cacheKey, getCacheTtl } from './youtubeCache';

/**
 * Collect YouTube samples for a niche query and return metrics + opportunity score.
 */
export async function analyzeNicheOpportunity({
  niche,
  regionCode,
  language,
  contentFormat = 'Both',
  maxChannels = 8,
  maxVideos = 20,
}) {
  const q = niche.trim();
  if (!q) throw new Error('Please enter a niche to analyze.');

  const ck = cacheKey(['niche-opp', q, regionCode, language, contentFormat, maxChannels, maxVideos]);
  const hit = cacheGet(ck);
  if (hit) return { ...hit, fromCache: true };

  const search = await searchList({
    q,
    type: 'video',
    maxResults: Math.min(maxVideos, 25),
    order: 'relevance',
    regionCode: regionCode || undefined,
    relevanceLanguage: language || undefined,
  });

  const videoIds = (search.items || []).map((i) => i.id?.videoId).filter(Boolean);
  if (!videoIds.length) {
    throw new Error('No meaningful YouTube results found for this niche. Try a more specific niche name.');
  }

  let videos = (await getVideosByIds(videoIds)).map(normalizeVideo);

  if (contentFormat === 'Shorts') {
    videos = videos.filter((v) => v.durationSec != null && v.durationSec <= 60);
  } else if (contentFormat === 'Long-form') {
    videos = videos.filter((v) => v.durationSec == null || v.durationSec > 60);
  }

  if (!videos.length) {
    throw new Error('No videos matched the selected content format for this niche.');
  }

  const channelIds = [...new Set(videos.map((v) => v.channelId).filter(Boolean))].slice(0, maxChannels);
  const rawChannels = await getChannelsByIds(channelIds);
  const channels = rawChannels.map(normalizeChannel);

  const videoSummary = summarizeVideoSet(videos);
  const subValues = channels.map((c) => c.subscribers).filter((n) => n != null);
  const avgSubscribers = subValues.length
    ? round(subValues.reduce((a, b) => a + b, 0) / subValues.length, 0)
    : null;

  const viewsToSubscriberSamples = videos
    .map((v) => {
      const ch = channels.find((c) => c.id === v.channelId);
      if (!ch?.subscribers) return null;
      return safeRatio(v.views, ch.subscribers);
    })
    .filter((n) => n != null);

  const metrics = {
    niche: q,
    videosAnalyzed: videos.length,
    channelsAnalyzed: channels.length,
    avgViews: videoSummary.avgViews,
    medianViews: videoSummary.medianViews,
    avgSubscribers,
    viewsToSubscriberRatio: viewsToSubscriberSamples.length
      ? round(
          viewsToSubscriberSamples.reduce((a, b) => a + b, 0) / viewsToSubscriberSamples.length,
          3
        )
      : null,
    avgEngagementRate: videoSummary.avgEngagementRate,
    uploadFrequencyPerWeek: null,
    avgDurationSec: videoSummary.avgDurationSec,
    titlePatterns: extractTitlePatterns(videos),
  };

  const freqSamples = [];
  for (const chRaw of rawChannels.slice(0, 3)) {
    try {
      const recent = (await getRecentUploads(chRaw, 8)).map(normalizeVideo);
      const s = summarizeVideoSet(recent);
      if (s.uploadFrequencyPerWeek != null) freqSamples.push(s.uploadFrequencyPerWeek);
    } catch {
      // skip channel-level frequency failures
    }
  }
  if (freqSamples.length) {
    metrics.uploadFrequencyPerWeek = round(
      freqSamples.reduce((a, b) => a + b, 0) / freqSamples.length,
      2
    );
  }

  const opportunity = scoreNicheOpportunity(metrics, q);

  const result = {
    observed: {
      sampleVideos: videos.slice(0, 10).map(slimVideo),
      sampleChannels: channels.map((c) => ({
        id: c.id,
        title: c.title,
        subscribers: c.subscribers,
        totalViews: c.totalViews,
        videoCount: c.videoCount,
      })),
    },
    metrics,
    opportunity,
    labels: {
      metricsSource: 'Observed Data + Zetawala Calculation',
      searchVolume: 'N/A — official search volume not available from YouTube Data API',
    },
  };

  cacheSet(ck, result, getCacheTtl('analysis'));
  return { ...result, fromCache: false };
}

export async function analyzeChannelHealth({ channelInput, videoLimit = 20 }) {
  const limit = [10, 20, 30].includes(Number(videoLimit)) ? Number(videoLimit) : 20;
  const ck = cacheKey(['channel-health', String(channelInput).trim().toLowerCase(), limit]);
  const hit = cacheGet(ck);
  if (hit) return { ...hit, fromCache: true };

  const raw = await resolveChannel(channelInput);
  const channel = normalizeChannel(raw);
  const videos = (await getRecentUploads(raw, limit)).map(normalizeVideo);

  if (!videos.length) {
    throw new Error('This channel has no publicly available recent uploads to analyze.');
  }

  const summary = summarizeVideoSet(videos);
  const momentum = recentVsOlderMomentum(videos);
  const patterns = extractTitlePatterns(videos);
  const { top, bottom } = topAndBottomVideos(videos, 3);
  const health = scoreChannelHealth({
    summary,
    momentum,
    subscribers: channel.subscribers,
  });

  const result = {
    channel,
    analysisWindow: { videoLimit: limit, videosAnalyzed: videos.length },
    summary,
    momentum,
    patterns,
    topVideos: top.map(slimVideo),
    underperformingVideos: bottom.map(slimVideo),
    health,
    disclaimer:
      'Zetawala Channel Health Score is an analytical estimate based on publicly available YouTube data. It is not an official YouTube metric.',
  };

  cacheSet(ck, result, getCacheTtl('analysis'));
  return { ...result, fromCache: false };
}

export async function analyzeVideoPerformance({ videoInput }) {
  const ck = cacheKey(['video-perf', String(videoInput).trim().toLowerCase()]);
  const hit = cacheGet(ck);
  if (hit) return { ...hit, fromCache: true };

  const rawVideo = await resolveVideo(videoInput);
  const video = normalizeVideo(rawVideo);
  const [rawChannel] = await getChannelsByIds([video.channelId]);
  if (!rawChannel) throw new Error('Could not load the channel for this video.');
  const channel = normalizeChannel(rawChannel);

  const recent = (await getRecentUploads(rawChannel, 20))
    .map(normalizeVideo)
    .filter((v) => v.id !== video.id);
  const channelSummary = summarizeVideoSet(recent);

  const performance = scoreVideoPerformance({
    video,
    channelAvgViews: channelSummary.avgViews,
    channelMedianViews: channelSummary.medianViews,
    subscribers: channel.subscribers,
  });

  const result = {
    video: {
      ...slimVideo(video),
      descriptionPreview: (video.description || '').slice(0, 280),
      tags: (video.tags || []).slice(0, 15),
    },
    channel: {
      id: channel.id,
      title: channel.title,
      subscribers: channel.subscribers,
      subscribersHidden: channel.subscribersHidden,
    },
    channelBaseline: {
      videosSampled: recent.length,
      avgViews: channelSummary.avgViews,
      medianViews: channelSummary.medianViews,
      avgEngagementRate: channelSummary.avgEngagementRate,
    },
    viewsPerDay: round(viewsPerDay(video.views, video.publishedAt), 1),
    performance,
    disclaimer:
      'Zetawala Video Performance Score is an analytical estimate based on publicly available YouTube data. It is not an official YouTube metric.',
    caveats: performance.isVeryNew
      ? [
          'This video is very new (< 2 days). Comparisons to older channel videos can be misleading.',
        ]
      : [],
  };

  cacheSet(ck, result, getCacheTtl('analysis'));
  return { ...result, fromCache: false };
}

function slimVideo(v) {
  return {
    id: v.id,
    title: v.title,
    views: v.views,
    likes: v.likes,
    comments: v.comments,
    publishedAt: v.publishedAt,
    durationSec: v.durationSec,
    channelTitle: v.channelTitle,
  };
}
