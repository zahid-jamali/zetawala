import { NextResponse } from 'next/server';
import {
  getClientIp,
  detectBot,
  checkRateLimit,
  verifyTurnstileToken,
} from '../../../../lib/security';
import { runSeoTool } from '../../../../lib/seo/seoEngine';
import { SEO_TOOL_SLUGS } from '../../../../config/seoWebmaster/tools';

export async function POST(request) {
  try {
    const reqHeaders = request.headers;
    const ip = getClientIp(reqHeaders);

    const botCheck = detectBot(reqHeaders);
    if (!botCheck.success) {
      return NextResponse.json({ success: false, error: botCheck.error }, { status: 403 });
    }

    const limitCheck = checkRateLimit(ip);
    if (!limitCheck.success) {
      return NextResponse.json({ success: false, error: limitCheck.error }, { status: 429 });
    }

    const body = await request.json();
    const { action, securityToken, ...payload } = body;

    const turnstileCheck = await verifyTurnstileToken(securityToken, ip);
    if (!turnstileCheck.success) {
      return NextResponse.json({ success: false, error: turnstileCheck.error }, { status: 400 });
    }

    if (!action || !SEO_TOOL_SLUGS.includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid SEO tool action.' }, { status: 400 });
    }

    const result = await runSeoTool(action, payload);
    return NextResponse.json(result);
  } catch (err) {
    console.error('SEO analyze error:', err);
    const message = err.message || 'SEO analysis failed.';
    const status = /quota|rate/i.test(message)
      ? 429
      : /invalid|provide|required|not allowed|security/i.test(message)
        ? 400
        : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
