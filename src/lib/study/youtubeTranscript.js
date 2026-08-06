import { YoutubeTranscript } from 'youtube-transcript';

export function extractYouTubeId(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;
  if (/^[\w-]{11}$/.test(raw)) return raw;
  try {
    const url = new URL(raw);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '').slice(0, 11) || null;
    }
    if (url.searchParams.get('v')) return url.searchParams.get('v');
    const m = url.pathname.match(/\/(embed|shorts)\/([\w-]{11})/);
    if (m) return m[2];
  } catch {
    return null;
  }
  return null;
}

/**
 * Fetch transcript text for a YouTube video.
 * Throws a friendly error when captions are unavailable.
 */
export async function fetchYouTubeTranscript(urlOrId) {
  const id = extractYouTubeId(urlOrId);
  if (!id) {
    throw new Error('Invalid YouTube URL. Paste a full video link or 11-character video ID.');
  }

  try {
    const segments = await YoutubeTranscript.fetchTranscript(id);
    const text = (segments || [])
      .map((s) => s.text)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!text) {
      throw new Error('No captions/transcript available for this video.');
    }

    return {
      videoId: id,
      transcript: text,
      segmentCount: segments.length,
      watchUrl: `https://www.youtube.com/watch?v=${id}`,
    };
  } catch (err) {
    const msg = String(err?.message || err);
    if (/transcript|disabled|unavailable|captions/i.test(msg)) {
      throw new Error('This video has no available transcript/captions. Try another video with captions enabled.');
    }
    if (/Invalid YouTube/.test(msg)) throw err;
    throw new Error(msg || 'Failed to fetch YouTube transcript.');
  }
}
