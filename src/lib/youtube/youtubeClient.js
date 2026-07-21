import { cacheGet, cacheSet, cacheKey, getCacheTtl } from './youtubeCache';

const YT_BASE = 'https://www.googleapis.com/youtube/v3';

function getApiKey() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error(
      'YOUTUBE_API_KEY is not configured. Add it to your server environment variables.'
    );
  }
  return key;
}

async function ytGet(endpoint, params = {}, cacheKind = 'search') {
  const key = getApiKey();
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  const ck = cacheKey(['yt', endpoint, sorted]);
  const cached = cacheGet(ck);
  if (cached) return { ...cached, _cached: true };

  const url = new URL(`${YT_BASE}/${endpoint}`);
  url.searchParams.set('key', key);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v));
    }
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  let res;
  try {
    res = await fetch(url.toString(), { signal: controller.signal });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new Error('YouTube API request timed out. Please try again.');
    }
    throw new Error('Unable to reach YouTube API. Please try again later.');
  } finally {
    clearTimeout(timeout);
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const reason = data?.error?.errors?.[0]?.reason || '';
    const message = data?.error?.message || `YouTube API error (${res.status})`;
    if (res.status === 403 && (reason === 'quotaExceeded' || /quota/i.test(message))) {
      throw new Error('YouTube API quota exceeded. Please try again later.');
    }
    if (res.status === 403) {
      throw new Error('YouTube API access denied. Check API key restrictions.');
    }
    throw new Error(message);
  }

  cacheSet(ck, data, getCacheTtl(cacheKind));
  return { ...data, _cached: false };
}

/** Parse ISO 8601 duration (PT#H#M#S) → seconds */
export function parseDurationSeconds(iso) {
  if (!iso || typeof iso !== 'string') return null;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return null;
  const h = parseInt(m[1] || '0', 10);
  const min = parseInt(m[2] || '0', 10);
  const s = parseInt(m[3] || '0', 10);
  return h * 3600 + min * 60 + s;
}

export function extractChannelIdFromUrl(input) {
  if (!input) return null;
  const raw = input.trim();

  if (/^UC[\w-]{20,}$/.test(raw)) return { type: 'id', value: raw };

  const handleMatch = raw.match(/@([\w.-]+)/);
  if (handleMatch) return { type: 'handle', value: handleMatch[1] };

  try {
    const url = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
    const parts = url.pathname.split('/').filter(Boolean);

    if (parts[0] === 'channel' && parts[1]) return { type: 'id', value: parts[1] };
    if (parts[0] === 'c' && parts[1]) return { type: 'custom', value: parts[1] };
    if (parts[0] === 'user' && parts[1]) return { type: 'username', value: parts[1] };
    if (parts[0]?.startsWith('@')) return { type: 'handle', value: parts[0].slice(1) };
  } catch {
    // not a URL — treat as handle/name search
    if (raw.startsWith('@')) return { type: 'handle', value: raw.slice(1) };
    return { type: 'search', value: raw };
  }

  return { type: 'search', value: raw };
}

export function extractVideoId(input) {
  if (!input) return null;
  const raw = input.trim();
  if (/^[\w-]{11}$/.test(raw)) return raw;

  try {
    const url = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean)[0] || null;
    }
    const v = url.searchParams.get('v');
    if (v) return v;
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live') {
      return parts[1] || null;
    }
  } catch {
    return null;
  }
  return null;
}

export async function searchList({ q, type = 'video', maxResults = 10, order = 'relevance', regionCode, relevanceLanguage }) {
  return ytGet(
    'search',
    {
      part: 'snippet',
      q,
      type,
      maxResults: Math.min(maxResults, 25),
      order,
      regionCode: regionCode || undefined,
      relevanceLanguage: relevanceLanguage || undefined,
    },
    'search'
  );
}

export async function getChannelsByIds(ids = []) {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return [];

  const chunks = [];
  for (let i = 0; i < unique.length; i += 50) {
    chunks.push(unique.slice(i, i + 50));
  }

  const items = [];
  for (const chunk of chunks) {
    const data = await ytGet(
      'channels',
      {
        part: 'snippet,statistics,contentDetails,brandingSettings',
        id: chunk.join(','),
      },
      'channel'
    );
    items.push(...(data.items || []));
  }
  return items;
}

export async function getChannelByHandle(handle) {
  const clean = handle.replace(/^@/, '');
  const data = await ytGet(
    'channels',
    {
      part: 'snippet,statistics,contentDetails,brandingSettings',
      forHandle: clean,
    },
    'channel'
  );
  return data.items?.[0] || null;
}

export async function getChannelByUsername(username) {
  const data = await ytGet(
    'channels',
    {
      part: 'snippet,statistics,contentDetails,brandingSettings',
      forUsername: username,
    },
    'channel'
  );
  return data.items?.[0] || null;
}

export async function resolveChannel(input) {
  const parsed = extractChannelIdFromUrl(input);
  if (!parsed) throw new Error('Please provide a valid YouTube channel URL, @handle, or channel ID.');

  if (parsed.type === 'id') {
    const [ch] = await getChannelsByIds([parsed.value]);
    if (!ch) throw new Error('Channel not found. Check the channel ID and try again.');
    return ch;
  }

  if (parsed.type === 'handle') {
    const ch = await getChannelByHandle(parsed.value);
    if (ch) return ch;
  }

  if (parsed.type === 'username') {
    const ch = await getChannelByUsername(parsed.value);
    if (ch) return ch;
  }

  // Custom URL / search fallback — find best channel match
  const searchQ = parsed.type === 'custom' || parsed.type === 'search' || parsed.type === 'handle'
    ? parsed.value
    : input;
  const search = await searchList({ q: searchQ, type: 'channel', maxResults: 5 });
  const channelIds = (search.items || [])
    .map((i) => i.snippet?.channelId || i.id?.channelId)
    .filter(Boolean);

  if (!channelIds.length) {
    throw new Error('Channel not found. Try a full URL like youtube.com/@handle or a channel ID.');
  }

  const channels = await getChannelsByIds(channelIds);
  if (!channels.length) throw new Error('Channel not found.');
  return channels[0];
}

export async function getVideosByIds(ids = []) {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return [];

  const chunks = [];
  for (let i = 0; i < unique.length; i += 50) {
    chunks.push(unique.slice(i, i + 50));
  }

  const items = [];
  for (const chunk of chunks) {
    const data = await ytGet(
      'videos',
      {
        part: 'snippet,statistics,contentDetails',
        id: chunk.join(','),
      },
      'video'
    );
    items.push(...(data.items || []));
  }
  return items;
}

export async function resolveVideo(input) {
  const id = extractVideoId(input);
  if (!id) throw new Error('Please provide a valid YouTube video URL or 11-character video ID.');

  const [video] = await getVideosByIds([id]);
  if (!video) {
    throw new Error('Video not found. It may be private, deleted, or the URL is incorrect.');
  }
  return video;
}

/**
 * Fetch recent uploads for a channel via uploads playlist (efficient).
 * @param {object} channel - channels.list item
 * @param {number} maxResults - default 20
 */
export async function getRecentUploads(channel, maxResults = 20) {
  const playlistId = channel?.contentDetails?.relatedPlaylists?.uploads;
  if (!playlistId) return [];

  const limit = Math.min(Math.max(maxResults, 5), 30);
  const playlist = await ytGet(
    'playlistItems',
    {
      part: 'contentDetails,snippet',
      playlistId,
      maxResults: limit,
    },
    'video'
  );

  const videoIds = (playlist.items || [])
    .map((i) => i.contentDetails?.videoId)
    .filter(Boolean);

  return getVideosByIds(videoIds);
}

export function normalizeChannel(ch) {
  if (!ch) return null;
  const stats = ch.statistics || {};
  return {
    id: ch.id,
    title: ch.snippet?.title || 'Unknown',
    description: ch.snippet?.description || '',
    customUrl: ch.snippet?.customUrl || '',
    publishedAt: ch.snippet?.publishedAt || null,
    thumbnails: ch.snippet?.thumbnails || {},
    country: ch.snippet?.country || null,
    subscribers: stats.hiddenSubscriberCount ? null : Number(stats.subscriberCount || 0),
    subscribersHidden: !!stats.hiddenSubscriberCount,
    totalViews: Number(stats.viewCount || 0),
    videoCount: Number(stats.videoCount || 0),
  };
}

export function normalizeVideo(v) {
  if (!v) return null;
  const stats = v.statistics || {};
  const durationSec = parseDurationSeconds(v.contentDetails?.duration);
  return {
    id: v.id,
    title: v.snippet?.title || 'Untitled',
    description: v.snippet?.description || '',
    publishedAt: v.snippet?.publishedAt || null,
    channelId: v.snippet?.channelId || null,
    channelTitle: v.snippet?.channelTitle || '',
    tags: v.snippet?.tags || [],
    categoryId: v.snippet?.categoryId || null,
    thumbnails: v.snippet?.thumbnails || {},
    durationSec,
    durationIso: v.contentDetails?.duration || null,
    views: Number(stats.viewCount || 0),
    likes: stats.likeCount != null ? Number(stats.likeCount) : null,
    comments: stats.commentCount != null ? Number(stats.commentCount) : null,
  };
}
