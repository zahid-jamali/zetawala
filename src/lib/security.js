// In-memory sliding-window cache for rate limiting (key: IP, value: metadata)
const rateLimitStore = new Map();

// Dynamic configuration parameters for security layers
export const securityConfig = {
  enableTurnstile: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY !== undefined, // Auto-enabled if Site Key env is present
  enableRateLimiting: true,
  enableBotDetection: true,
  rateLimitWindowMs: 60 * 1000, // 1 minute window
  maxRequestsPerWindow: 5, // 5 requests per minute
  throttleMs: 2500 // Min 2.5s between requests
};

// Retrieve client IP address from Next.js headers
export function getClientIp(reqHeaders) {
  const forwardedFor = reqHeaders.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = reqHeaders.get('x-real-ip');
  if (realIp) return realIp;
  return '127.0.0.1'; // local fallback
}

// Bot signature scanner
export function detectBot(reqHeaders) {
  if (!securityConfig.enableBotDetection) return { success: true };

  const userAgent = (reqHeaders.get('user-agent') || '').toLowerCase();
  
  const botKeywords = [
    'bot', 'crawler', 'spider', 'curl', 'wget', 'python', 'axios', 
    'headless', 'puppeteer', 'selenium', 'playwright', 'scrape', 'scanning'
  ];

  for (const keyword of botKeywords) {
    if (userAgent.includes(keyword)) {
      return { success: false, error: 'Automated script/bot behavior detected.' };
    }
  }

  if (!reqHeaders.has('accept') || !reqHeaders.has('user-agent')) {
    return { success: false, error: 'Incomplete client request headers.' };
  }

  return { success: true };
}

// Sliding window rate limiter & request throttle
export function checkRateLimit(ip) {
  if (!securityConfig.enableRateLimiting) return { success: true };

  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { timestamps: [now], lastRequest: now });
    return { success: true };
  }

  // 1. Throttling check
  const elapsed = now - record.lastRequest;
  if (elapsed < securityConfig.throttleMs) {
    return { success: false, error: 'Please wait before triggering another AI request.' };
  }

  // 2. Sliding window rate limit check
  const activeTimestamps = record.timestamps.filter(t => now - t < securityConfig.rateLimitWindowMs);
  if (activeTimestamps.length >= securityConfig.maxRequestsPerWindow) {
    return { success: false, error: 'Hourly rate limit exceeded. Please wait a minute before retrying.' };
  }

  activeTimestamps.push(now);
  rateLimitStore.set(ip, { timestamps: activeTimestamps, lastRequest: now });
  return { success: true };
}

// Cloudflare Turnstile token siteverify verifier
export async function verifyTurnstileToken(token, ip) {
  if (!securityConfig.enableTurnstile) return { success: true };
  if (!token) return { success: false, error: 'Security verification token is missing.' };

  const secretKey = process.env.TURNSTILE_SECRET_KEY || '1x00000000000000000000000000000000AA'; // Always-passes testing key

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip
      })
    });

    const json = await res.json();
    if (!json.success) {
      return { success: false, error: 'Cloudflare Turnstile verification failed.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return { success: false, error: 'Security verification server timeout.' };
  }
}
