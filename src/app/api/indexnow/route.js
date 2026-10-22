import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import sitemap from '../../sitemap';
import {
  submitToIndexNow,
  getIndexNowKey,
  getIndexNowHost,
  getIndexNowKeyLocation,
  INDEXNOW_ENDPOINT,
} from '../../../lib/indexnow';

const SESSION_TOKEN_PREFIX = 'authenticated_zeta_session_';

async function isAuthorized(request) {
  // 1. Allow in development mode for easy testing
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // 2. Allow via Bearer token matching INDEXNOW_KEY
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const configuredKey = getIndexNowKey();
  if (token && token === configuredKey) {
    return true;
  }

  // 3. Allow for logged-in admin user
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;
    if (session && session.startsWith(SESSION_TOKEN_PREFIX)) {
      await dbConnect();
      const userId = session.replace(SESSION_TOKEN_PREFIX, '');
      const user = await User.findById(userId);
      if (user && user.role === 'admin') {
        return true;
      }
    }
  } catch (err) {
    console.warn('[IndexNow API] Auth check error:', err);
  }

  return false;
}

// GET: Check IndexNow status and configuration
export async function GET() {
  const host = getIndexNowHost();
  const key = getIndexNowKey();
  const keyLocation = getIndexNowKeyLocation();

  return NextResponse.json({
    success: true,
    configured: Boolean(key),
    host,
    key,
    keyLocation,
    endpoint: INDEXNOW_ENDPOINT,
    timestamp: new Date().toISOString(),
  });
}

// POST: Submit URLs to IndexNow
export async function POST(request) {
  try {
    const authorized = await isAuthorized(request);
    if (!authorized) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized. Provide valid admin session or Bearer <INDEXNOW_KEY> header.',
        },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    let targetUrls = [];

    if (body.all) {
      // Gather all sitemap URLs
      const siteEntries = await sitemap();
      targetUrls = (siteEntries || []).map((entry) => (typeof entry === 'string' ? entry : entry.url));
    } else if (Array.isArray(body.urls) && body.urls.length > 0) {
      targetUrls = body.urls;
    } else if (typeof body.url === 'string' && body.url.trim()) {
      targetUrls = [body.url.trim()];
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Provide "urls" (array), "url" (string), or set "all": true.',
        },
        { status: 400 }
      );
    }

    const result = await submitToIndexNow(targetUrls);
    return NextResponse.json(result, { status: result.success ? 200 : (result.status || 500) });
  } catch (err) {
    console.error('[IndexNow API] POST error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Internal server error while submitting to IndexNow',
      },
      { status: 500 }
    );
  }
}
