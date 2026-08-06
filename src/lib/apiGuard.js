/**
 * Shared request guards for heavy API routes (bot + rate limit + Turnstile).
 * Keeps route handlers thin and consistent across JSON and multipart endpoints.
 */

import { NextResponse } from 'next/server';
import {
  getClientIp,
  detectBot,
  checkRateLimit,
  verifyTurnstileToken,
} from './security';

function fail(error, status) {
  return {
    ok: false,
    response: NextResponse.json({ success: false, error }, { status }),
  };
}

async function baseChecks(headers) {
  const ip = getClientIp(headers);

  const botCheck = detectBot(headers);
  if (!botCheck.success) return fail(botCheck.error, 403);

  const limitCheck = checkRateLimit(ip);
  if (!limitCheck.success) return fail(limitCheck.error, 429);

  return { ok: true, ip };
}

/**
 * JSON body APIs — expects `securityToken` on the body (or optional field name).
 */
export async function guardJsonRequest(request, { tokenField = 'securityToken' } = {}) {
  const base = await baseChecks(request.headers);
  if (!base.ok) return base;

  let body;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body.', 400);
  }

  const turnstileCheck = await verifyTurnstileToken(body?.[tokenField], base.ip);
  if (!turnstileCheck.success) return fail(turnstileCheck.error, 400);

  return { ok: true, body, ip: base.ip };
}

/**
 * multipart/form-data APIs — expects `securityToken` form field.
 */
export async function guardFormRequest(request) {
  const base = await baseChecks(request.headers);
  if (!base.ok) return base;

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return fail('Invalid multipart form data.', 400);
  }

  const token = formData.get('securityToken');
  const turnstileCheck = await verifyTurnstileToken(
    token == null ? '' : String(token),
    base.ip
  );
  if (!turnstileCheck.success) return fail(turnstileCheck.error, 400);

  return { ok: true, formData, ip: base.ip };
}
