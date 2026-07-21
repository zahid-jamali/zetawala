/**
 * Deterministic analytics helpers for YouTube Intelligence tools.
 */

export function average(nums = []) {
  const clean = nums.filter((n) => typeof n === 'number' && !Number.isNaN(n));
  if (!clean.length) return null;
  return clean.reduce((a, b) => a + b, 0) / clean.length;
}

export function median(nums = []) {
  const clean = nums.filter((n) => typeof n === 'number' && !Number.isNaN(n)).sort((a, b) => a - b);
  if (!clean.length) return null;
  const mid = Math.floor(clean.length / 2);
  return clean.length % 2 === 0 ? (clean[mid - 1] + clean[mid]) / 2 : clean[mid];
}

export function safeRatio(num, den) {
  if (num == null || den == null || den === 0) return null;
  return num / den;
}

export function round(n, digits = 2) {
  if (n == null || Number.isNaN(n)) return null;
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

export function daysSince(isoDate) {
  if (!isoDate) return null;
  const t = new Date(isoDate).getTime();
  if (Number.isNaN(t)) return null;
  return Math.max(0, (Date.now() - t) / (1000 * 60 * 60 * 24));
}

export function engagementRate({ likes, comments, views }) {
  if (!views || views <= 0) return null;
  const l = likes || 0;
  const c = comments || 0;
  return (l + c) / views;
}

export function viewsPerDay(views, publishedAt) {
  const days = daysSince(publishedAt);
  if (days == null || days < 0.04) return null; // < ~1 hour — not meaningful
  return views / Math.max(days, 1 / 24);
}

/**
 * Upload frequency: videos per week based on publish date span.
 */
export function uploadFrequencyPerWeek(videos = []) {
  if (videos.length < 2) return null;
  const dates = videos
    .map((v) => new Date(v.publishedAt).getTime())
    .filter((t) => !Number.isNaN(t))
    .sort((a, b) => a - b);
  if (dates.length < 2) return null;
  const spanDays = Math.max((dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24), 1);
  const weeks = spanDays / 7;
  return videos.length / Math.max(weeks, 0.15);
}

export function summarizeVideoSet(videos = []) {
  const views = videos.map((v) => v.views);
  const likes = videos.map((v) => v.likes).filter((n) => n != null);
  const comments = videos.map((v) => v.comments).filter((n) => n != null);
  const engagements = videos.map((v) => engagementRate(v)).filter((n) => n != null);

  return {
    count: videos.length,
    avgViews: round(average(views), 0),
    medianViews: round(median(views), 0),
    avgLikes: likes.length ? round(average(likes), 0) : null,
    avgComments: comments.length ? round(average(comments), 0) : null,
    avgEngagementRate: engagements.length ? round(average(engagements), 4) : null,
    uploadFrequencyPerWeek: round(uploadFrequencyPerWeek(videos), 2),
    avgDurationSec: round(average(videos.map((v) => v.durationSec).filter(Boolean)), 0),
  };
}

export function recentVsOlderMomentum(videos = []) {
  if (videos.length < 6) return null;
  const sorted = [...videos].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
  const half = Math.floor(sorted.length / 2);
  const recent = sorted.slice(0, half);
  const older = sorted.slice(half);
  const recentMed = median(recent.map((v) => v.views));
  const olderMed = median(older.map((v) => v.views));
  if (recentMed == null || olderMed == null || olderMed === 0) return null;
  return {
    recentMedianViews: round(recentMed, 0),
    olderMedianViews: round(olderMed, 0),
    momentumRatio: round(recentMed / olderMed, 2),
  };
}

export function topAndBottomVideos(videos = [], n = 3) {
  const sorted = [...videos].sort((a, b) => b.views - a.views);
  return {
    top: sorted.slice(0, n),
    bottom: sorted.slice(-n).reverse(),
  };
}

/** Simple title/topic pattern extraction (deterministic heuristics). */
export function extractTitlePatterns(videos = []) {
  const titles = videos.map((v) => v.title || '');
  const wordCounts = {};
  titles.forEach((t) => {
    t.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .forEach((w) => {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      });
  });

  const commonWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([word, count]) => ({ word, count }));

  const questionTitles = titles.filter((t) => t.includes('?')).length;
  const listicleTitles = titles.filter((t) => /\b\d+\b/.test(t)).length;
  const howToTitles = titles.filter((t) => /how to|guide|tutorial/i.test(t)).length;

  return {
    commonWords,
    questionTitleShare: titles.length ? round(questionTitles / titles.length, 2) : null,
    listicleTitleShare: titles.length ? round(listicleTitles / titles.length, 2) : null,
    howToTitleShare: titles.length ? round(howToTitles / titles.length, 2) : null,
  };
}
