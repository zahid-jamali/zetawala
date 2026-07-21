import { NextResponse } from 'next/server';
import {
  getClientIp,
  detectBot,
  checkRateLimit,
  verifyTurnstileToken,
} from '../security';

/**
 * Shared guard for expensive YouTube analysis endpoints.
 */
export async function guardYouTubeRequest(request) {
  const reqHeaders = request.headers;
  const ip = getClientIp(reqHeaders);

  const botCheck = detectBot(reqHeaders);
  if (!botCheck.success) {
    return {
      ok: false,
      response: NextResponse.json({ success: false, error: botCheck.error }, { status: 403 }),
    };
  }

  const limitCheck = checkRateLimit(ip);
  if (!limitCheck.success) {
    return {
      ok: false,
      response: NextResponse.json({ success: false, error: limitCheck.error }, { status: 429 }),
    };
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 }),
    };
  }

  const turnstileCheck = await verifyTurnstileToken(body.securityToken, ip);
  if (!turnstileCheck.success) {
    return {
      ok: false,
      response: NextResponse.json({ success: false, error: turnstileCheck.error }, { status: 400 }),
    };
  }

  return { ok: true, body, ip };
}

export function youtubeErrorResponse(err) {
  const message = err?.message || 'YouTube analysis failed.';
  const status = /quota/i.test(message)
    ? 429
    : /not found|invalid|provide a valid|required/i.test(message)
      ? 400
      : 500;
  return NextResponse.json({ success: false, error: message }, { status });
}
