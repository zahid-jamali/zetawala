import { SITE_URL } from '../i18n/config';

export const DEFAULT_INDEXNOW_KEY = '483f35001f40cc679318506d75a8095b';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

/**
 * Returns the configured IndexNow key or the default project key.
 */
export function getIndexNowKey() {
  return process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;
}

/**
 * Returns the normalized site base URL (e.g. https://www.zetawala.com).
 */
export function getSiteBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL || 'https://www.zetawala.com';
  return raw.replace(/\/+$/, '');
}

/**
 * Returns the host hostname (e.g. www.zetawala.com).
 */
export function getIndexNowHost() {
  try {
    const url = new URL(getSiteBaseUrl());
    return url.host;
  } catch {
    return 'www.zetawala.com';
  }
}

/**
 * Returns the full key location URL.
 */
export function getIndexNowKeyLocation() {
  const baseUrl = getSiteBaseUrl();
  const key = getIndexNowKey();
  return `${baseUrl}/${key}.txt`;
}

/**
 * Submits one or multiple URLs to the IndexNow protocol.
 * Distributes automatically across Bing, Yandex, Seznam, Naver, etc.
 *
 * @param {string | string[]} urls - Absolute or relative URL(s) to submit.
 * @returns {Promise<{ success: boolean, status: number, submittedCount: number, message: string, details?: any }>}
 */
export async function submitToIndexNow(urls) {
  const baseUrl = getSiteBaseUrl();
  const host = getIndexNowHost();
  const key = getIndexNowKey();
  const keyLocation = getIndexNowKeyLocation();

  if (!urls) {
    return {
      success: false,
      status: 400,
      submittedCount: 0,
      message: 'No URLs provided for IndexNow submission.',
    };
  }

  const rawList = Array.isArray(urls) ? urls : [urls];

  // Normalize URLs to fully-qualified absolute URLs on the current host
  const normalizedSet = new Set();
  for (const item of rawList) {
    if (!item || typeof item !== 'string') continue;
    const trimmed = item.trim();
    if (!trimmed) continue;

    try {
      const fullUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://')
        ? new URL(trimmed)
        : new URL(trimmed.startsWith('/') ? trimmed : `/${trimmed}`, baseUrl);

      // Only allow submission for our host
      if (fullUrl.host === host) {
        normalizedSet.add(fullUrl.toString());
      } else {
        console.warn(`[IndexNow] Skipped foreign host URL: ${trimmed} (expected host: ${host})`);
      }
    } catch (err) {
      console.warn(`[IndexNow] Invalid URL ignored: ${trimmed}`, err.message);
    }
  }

  const cleanUrls = Array.from(normalizedSet);

  if (cleanUrls.length === 0) {
    return {
      success: false,
      status: 400,
      submittedCount: 0,
      message: 'No valid URLs matching current host found.',
    };
  }

  // IndexNow allows a maximum of 10,000 URLs per POST batch
  const BATCH_SIZE = 10000;
  const batches = [];
  for (let i = 0; i < cleanUrls.length; i += BATCH_SIZE) {
    batches.push(cleanUrls.slice(i, i + BATCH_SIZE));
  }

  const results = [];
  let overallSuccess = true;
  let finalStatus = 200;

  for (const batch of batches) {
    const payload = {
      host,
      key,
      keyLocation,
      urlList: batch,
    };

    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text || null;
      }

      // IndexNow returns 200 (OK) or 202 (Accepted) on success
      const isOk = response.status === 200 || response.status === 202;
      if (!isOk) {
        overallSuccess = false;
        finalStatus = response.status;
      }

      results.push({
        status: response.status,
        statusText: response.statusText,
        count: batch.length,
        response: parsed,
      });

      console.log(
        `[IndexNow] Submitted ${batch.length} URL(s) to IndexNow. Status: ${response.status} ${response.statusText}`
      );
    } catch (error) {
      console.error('[IndexNow] Error submitting batch to IndexNow:', error);
      overallSuccess = false;
      finalStatus = 500;
      results.push({
        status: 500,
        error: error.message,
        count: batch.length,
      });
    }
  }

  return {
    success: overallSuccess,
    status: finalStatus,
    submittedCount: cleanUrls.length,
    message: overallSuccess
      ? `Successfully submitted ${cleanUrls.length} URL(s) to IndexNow (Status: ${finalStatus}).`
      : `IndexNow submission completed with errors (Status: ${finalStatus}).`,
    batches: results,
  };
}
