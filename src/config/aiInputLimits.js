/**
 * AI input/output limits — single source of truth for token cost control.
 *
 * Shared by the browser (maxLength + live counters + pre-submit checks) and
 * by /api/generate (hard server-side enforcement + DeepSeek max_tokens).
 * Pure JS, no server-only imports, so it is safe to import from client components.
 *
 * Rough cost guide: ~4 English chars ≈ 1 token; Urdu / Roman Urdu use more tokens per char.
 */

// ---------------------------------------------------------------------------
// Field spec helpers
// ---------------------------------------------------------------------------

const text = (max) => ({ kind: 'text', max });
const choice = (values, max = 40) => ({ kind: 'choice', values, max });
const num = (min, max) => ({ kind: 'number', min, max });
const obj = (maxChars) => ({ kind: 'object', maxChars });

// Common presets by input type
const NAME = text(100); // product / service / niche / client names
const TITLE = text(120); // video / listing / gig titles
const KEYWORDS = text(200); // skills, keywords, tags, technologies
const SHORT = text(150); // audience, country, timeline, goal, results…
const OPTION = text(40); // select values (tone, mode, level…)
const URL = text(300);

/** Characters kept from an uploaded document / PDF / transcript before it reaches the AI. */
export const DOCUMENT_LIMITS = {
  writing: 5000,
  pdfQuiz: 8000,
  flashcards: 6000,
  transcript: 8000,
};

/** Undeclared string fields are truncated to this length server-side. */
const DEFAULT_TEXT_MAX = 200;
/** Undeclared object fields larger than this (JSON chars) are dropped. */
const DEFAULT_OBJECT_MAX = 1500;
/** Whole payload hard cap (JSON chars). */
export const MAX_PAYLOAD_CHARS = 20000;

const WRITING_COMMON = {
  language: choice(['en', 'es', 'ur'], 5),
  mode: OPTION,
  style: OPTION,
  length: OPTION,
};

const MARKETPLACE_SPECS = {
  'listing-title-generator': {
    productName: TITLE,
    productCategory: NAME,
    category: NAME,
    targetKeywords: KEYWORDS,
    keywords: KEYWORDS,
    targetCountry: text(60),
  },
  'product-description-generator': {
    productName: TITLE,
    productDetails: text(800),
    features: text(800),
    specifications: text(800),
    targetAudience: SHORT,
  },
  'keyword-generator': { product: TITLE, category: NAME, niche: NAME },
  'listing-seo-analyzer': {
    listingTitle: text(255),
    title: text(255),
    description: text(3000),
    keywords: KEYWORDS,
  },
  'pricing-calculator': {
    productCost: num(0, 100000000),
    desiredProfitMargin: num(0, 95),
    desiredMarginPercent: num(0, 95),
    shipping: num(0, 10000000),
    fees: num(0, 10000000),
    pricing: obj(2000),
  },
  'chat-reply-generator': { customerMessage: text(800), replyTone: OPTION, tone: OPTION },
  'listing-optimizer': { existingListing: text(3000) },
};

/** Per-action field limits. Keys must match the payload keys each prompt reads. */
const ACTION_SPECS = {
  // —— YouTube automation ——
  'video-ideas': { niche: NAME },
  'title-generator': { niche: NAME, idea: text(500) },
  'hook-architect': { title: TITLE },
  'description-builder': { title: TITLE },
  'tags-extractor': { title: TITLE },
  'thumbnail-prompt': { title: TITLE },
  'script-master': { title: TITLE, duration: choice(['shorts', '3', '5', '8', '12'], 10) },
  // 12000 chars ≈ the longest (12 min) script Script Master produces.
  'visuals-recommender': {
    scriptText: text(12000),
    visualsType: choice(['all', 'idea', 'keywords', 'prompt'], 10),
  },

  // —— Daraz ——
  'product-hunting': { seed: NAME },
  'roman-urdu-keywords': { product: NAME },
  'daraz-keywords': { product: NAME },
  'faq-generator': { product: NAME },
  'product-title': { product: NAME, features: text(600) },
  'product-description': { product: NAME, features: text(600) },
  'benefits-generator': { product: NAME, features: text(600) },
  'sales-copy': { product: NAME, features: text(600) },
  'listing-optimizer': { title: text(150), description: text(2000) },
  'competitor-rewriter': { textToAnalyze: text(2000) },
  'customer-reply': { textToAnalyze: text(800) },
  'negative-reply': { textToAnalyze: text(1000) },
  'cost-calculator': {
    sourceCost: num(0, 100000000),
    sellingPrice: num(1, 100000000),
    commissionRate: num(0, 100),
    weight: num(0, 100),
  },
  'profit-calculator': {
    sourceCost: num(0, 100000000),
    sellingPrice: num(1, 100000000),
    commissionRate: num(0, 100),
  },

  // —— Local social commerce ——
  'whatsapp-broadcast': { productName: NAME, productDetails: text(600), targetAudience: SHORT },
  'local-ad-script': {
    productCategory: NAME,
    usp: text(500),
    videoLength: choice(['15s', '30s', '60s'], 5),
  },
  'wholesale-negotiation': {
    productToSource: NAME,
    expectedQuantity: text(60),
    targetPriceQuestions: text(500),
  },
  'social-comment-responder': { customerComment: text(500), desiredTone: OPTION },
  'product-storyboard': { productFeatures: text(600), customerPainPoint: text(400) },

  // —— AI writing (text in ≈ text out for rewrite-style tools) ——
  'ai-humanizer': { text: text(4000), ...WRITING_COMMON },
  'ai-content-detector': { text: text(5000), ...WRITING_COMMON },
  'plagiarism-checker': { text: text(5000), referenceText: text(3000), ...WRITING_COMMON },
  'grammar-checker': { text: text(4000), ...WRITING_COMMON },
  'paraphrasing-tool': { text: text(4000), ...WRITING_COMMON },
  'roman-urdu-to-urdu': { text: text(3000), ...WRITING_COMMON },
  'urdu-to-roman-urdu': { text: text(3000), ...WRITING_COMMON },
  'roman-urdu-grammar': { text: text(3000), ...WRITING_COMMON },
  'ai-text-summarizer': { text: text(8000), ...WRITING_COMMON },
  'ai-rewrite-tool': { text: text(4000), ...WRITING_COMMON },

  // —— AI study ——
  'ai-notes-generator': { topic: text(150), level: OPTION },
  'ai-quiz-generator': { topic: text(150), difficulty: OPTION, count: num(3, 15) },
  'pdf-to-quiz': { text: text(DOCUMENT_LIMITS.pdfQuiz), count: num(3, 15) },
  'ai-flashcard-generator': {
    topic: text(150),
    text: text(DOCUMENT_LIMITS.flashcards),
    count: num(6, 20),
  },
  'youtube-study-notes': {
    youtubeUrl: URL,
    videoTitle: text(150),
    transcript: text(DOCUMENT_LIMITS.transcript),
  },
  'ai-assignment-generator': { topic: text(200), wordCount: num(300, 1500) },
  'ai-homework-solver': { question: text(1500) },

  // —— Freelancer: Upwork ——
  'upwork-proposal-generator': {
    jobDescription: text(3000),
    experienceLevel: OPTION,
    skills: KEYWORDS,
    portfolioLinks: text(300),
    preferredTone: OPTION,
  },
  'upwork-proposal-analyzer': { proposal: text(3000) },
  'upwork-job-match-analyzer': { jobDescription: text(3000), resumeOrProfile: text(2500) },
  'upwork-profile-optimizer': {
    headline: TITLE,
    bio: text(2500),
    skills: text(300),
    portfolio: text(300),
    experience: text(300),
  },
  'upwork-cover-letter-generator': {
    jobDescription: text(3000),
    skills: KEYWORDS,
    experience: text(300),
  },
  'upwork-interview-answer-generator': {
    clientQuestion: text(500),
    jobType: NAME,
    experienceLevel: OPTION,
  },
  'upwork-contract-generator': {
    clientName: NAME,
    projectScope: text(2000),
    timeline: NAME,
    budget: text(60),
    paymentTerms: text(200),
  },
  'upwork-portfolio-description-generator': {
    projectDetails: text(1500),
    technologies: KEYWORDS,
    results: text(300),
  },
  'upwork-client-followup-generator': {
    proposalContext: text(1000),
    daysSinceSubmission: num(0, 365),
    followUpGoal: SHORT,
  },

  // —— Freelancer: Fiverr ——
  'fiverr-gig-title-generator': { service: NAME, keywords: KEYWORDS },
  'fiverr-gig-description-generator': { service: NAME, features: text(800), deliveryTime: text(50) },
  // Fiverr itself caps gig descriptions at 1200 characters.
  'fiverr-gig-seo-analyzer': { gigTitle: TITLE, description: text(1200), tags: KEYWORDS },
  'fiverr-tag-generator': { service: NAME, niche: NAME },
  'fiverr-faq-generator': { service: NAME, targetAudience: SHORT },
  'fiverr-pricing-generator': {
    service: NAME,
    estimatedHours: num(1, 500),
    experienceLevel: OPTION,
    baseHourly: num(1, 1000),
    packages: obj(2000),
  },
  'fiverr-gig-image-text-generator': { service: NAME, keySellingPoints: text(500) },
  'fiverr-buyer-request-reply-generator': {
    buyerRequest: text(1500),
    skills: KEYWORDS,
    experience: text(300),
  },
  // Fiverr itself caps profile descriptions at 600 characters.
  'fiverr-profile-bio-generator': { skills: text(300), experience: text(300), services: text(600) },
  'fiverr-review-response-generator': { customerReview: text(1000), tone: OPTION },
};

/**
 * DeepSeek max_tokens per action (output cap). Kept generous enough that valid
 * JSON is not cut off — a truncated response is still billed and then fails to parse.
 */
const OUTPUT_TOKENS = {
  'video-ideas': 700,
  'title-generator': 500,
  'hook-architect': 900,
  'description-builder': 1000,
  'tags-extractor': 500,
  'thumbnail-prompt': 1200,
  'visuals-recommender': 3500,

  'product-hunting': 1000,
  'roman-urdu-keywords': 500,
  'daraz-keywords': 600,
  'faq-generator': 1000,
  'product-title': 600,
  'product-description': 1200,
  'benefits-generator': 800,
  'sales-copy': 1000,
  'listing-optimizer': 1200,
  'competitor-rewriter': 1500,
  'customer-reply': 600,
  'negative-reply': 600,
  'cost-calculator': 900,
  'profit-calculator': 900,

  'whatsapp-broadcast': 1200,
  'local-ad-script': 1400,
  'wholesale-negotiation': 1200,
  'social-comment-responder': 800,
  'product-storyboard': 1200,

  'ai-humanizer': 2500,
  'ai-content-detector': 1500,
  'plagiarism-checker': 1200,
  'grammar-checker': 2800,
  'paraphrasing-tool': 2500,
  'roman-urdu-to-urdu': 3000,
  'urdu-to-roman-urdu': 2500,
  'roman-urdu-grammar': 3500,
  'ai-text-summarizer': 1200,
  'ai-rewrite-tool': 3000,

  'ai-notes-generator': 3000,
  'youtube-study-notes': 3000,
  'ai-homework-solver': 1500,

  'upwork-proposal-generator': 1800,
  'upwork-proposal-analyzer': 1000,
  'upwork-job-match-analyzer': 1000,
  'upwork-profile-optimizer': 1200,
  'upwork-cover-letter-generator': 1200,
  'upwork-interview-answer-generator': 900,
  'upwork-contract-generator': 2500,
  'upwork-portfolio-description-generator': 1000,
  'upwork-client-followup-generator': 800,
  'fiverr-gig-title-generator': 400,
  'fiverr-gig-description-generator': 1200,
  'fiverr-gig-seo-analyzer': 800,
  'fiverr-tag-generator': 500,
  'fiverr-faq-generator': 1200,
  'fiverr-pricing-generator': 700,
  'fiverr-gig-image-text-generator': 500,
  'fiverr-buyer-request-reply-generator': 1200,
  'fiverr-profile-bio-generator': 800,
  'fiverr-review-response-generator': 700,
};

const MARKETPLACE_OUTPUT_TOKENS = {
  'listing-title-generator': 700,
  'product-description-generator': 1200,
  'keyword-generator': 700,
  'listing-seo-analyzer': 800,
  'pricing-calculator': 600,
  'chat-reply-generator': 600,
  'listing-optimizer': 1500,
};

const DEFAULT_OUTPUT_TOKENS = 1500;

/** Output caps for the SEO / YouTube interpretation helpers. */
export const INTERPRET_OUTPUT_TOKENS = 1500;
export const NICHE_CANDIDATE_OUTPUT_TOKENS = 900;

/** Creator-profile limits for the YouTube niche tools (/api/youtube/*). */
export const YOUTUBE_PROFILE_LIMITS = {
  niche: 100,
  interests: 200,
  skills: 200,
  targetAudienceCountry: 60,
  contentLanguage: 40,
  channelType: 40,
  mainGoal: 60,
  experienceLevel: 40,
  weeklyTime: 40,
  budget: 60,
  contentFormat: 40,
  monetizationPreference: 60,
  topicsToAvoid: 200,
  country: 60,
  language: 40,
  channelInput: 200,
  videoInput: 200,
};

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

const MARKETPLACE_RE = /^(shopee|lazada)-/;

function specFor(action) {
  const a = String(action || '');
  if (MARKETPLACE_RE.test(a)) return MARKETPLACE_SPECS[a.replace(MARKETPLACE_RE, '')] || null;
  return ACTION_SPECS[a] || null;
}

/** Max characters for a text field of an action (undefined when not a text field). */
export function getFieldMax(action, field) {
  const spec = specFor(action)?.[field];
  if (!spec) return undefined;
  return spec.max;
}

/** Numeric bounds for a number field of an action ({ min, max } or undefined). */
export function getNumberBounds(action, field) {
  const spec = specFor(action)?.[field];
  if (!spec || spec.kind !== 'number') return undefined;
  return { min: spec.min, max: spec.max };
}

/** Trim to `max` characters (used for uploaded / prefilled text). */
export function clampToLimit(value, max) {
  const s = String(value ?? '');
  if (!max || s.length <= max) return s;
  return s.slice(0, max);
}

/** DeepSeek max_tokens for an action, scaled where the request asks for variable length. */
export function getOutputTokenBudget(action, payload = {}) {
  const a = String(action || '');

  if (a === 'script-master') {
    if (payload.duration === 'shorts') return 900;
    const minutes = Math.min(12, Math.max(1, Number(payload.duration) || 5));
    return Math.min(4500, Math.round(minutes * 150 * 1.6 + 600));
  }
  if (a === 'ai-quiz-generator' || a === 'pdf-to-quiz') {
    const count = Math.min(15, Math.max(3, Number(payload.count) || 8));
    return count * 160 + 300;
  }
  if (a === 'ai-flashcard-generator') {
    const count = Math.min(20, Math.max(6, Number(payload.count) || 12));
    return count * 80 + 200;
  }
  if (a === 'ai-assignment-generator') {
    const words = Math.min(1500, Math.max(300, Number(payload.wordCount) || 800));
    return Math.round(words * 1.6 + 500);
  }

  if (MARKETPLACE_RE.test(a)) {
    return MARKETPLACE_OUTPUT_TOKENS[a.replace(MARKETPLACE_RE, '')] || DEFAULT_OUTPUT_TOKENS;
  }
  return OUTPUT_TOKENS[a] || DEFAULT_OUTPUT_TOKENS;
}

// ---------------------------------------------------------------------------
// Validation (client pre-check + server enforcement)
// ---------------------------------------------------------------------------

function labelOf(key) {
  const spaced = String(key).replace(/([A-Z])/g, ' $1').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/**
 * Validate and sanitize an AI payload against the action's limits.
 * - Declared text fields over the limit → rejected with a clear message.
 * - Declared number fields → clamped into range; non-numeric → rejected.
 * - Strict choices (duration, video length…) → rejected if not allowed.
 * - Undeclared strings → truncated; oversized undeclared objects → dropped.
 *
 * @returns {{ ok: true, payload: object } | { ok: false, error: string, field?: string }}
 */
export function validateAiPayload(action, payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'Invalid payload.' };
  }

  let totalChars = 0;
  try {
    totalChars = JSON.stringify(payload).length;
  } catch {
    return { ok: false, error: 'Invalid payload.' };
  }
  if (totalChars > MAX_PAYLOAD_CHARS) {
    return { ok: false, error: `Input is too large. Please shorten your text (max ${MAX_PAYLOAD_CHARS.toLocaleString()} characters in total).` };
  }

  const spec = specFor(action) || {};
  const out = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value == null || value === '') {
      out[key] = value;
      continue;
    }
    const rule = spec[key];

    if (!rule) {
      if (typeof value === 'string') out[key] = value.slice(0, DEFAULT_TEXT_MAX);
      else if (typeof value === 'object') {
        if (JSON.stringify(value).length <= DEFAULT_OBJECT_MAX) out[key] = value;
      } else out[key] = value;
      continue;
    }

    if (rule.kind === 'number') {
      const n = Number(value);
      if (!Number.isFinite(n)) {
        return { ok: false, field: key, error: `${labelOf(key)} must be a number.` };
      }
      out[key] = Math.min(rule.max, Math.max(rule.min, n));
      continue;
    }

    if (rule.kind === 'object') {
      if (typeof value !== 'object' || JSON.stringify(value).length > rule.maxChars) {
        return { ok: false, field: key, error: `${labelOf(key)} is invalid or too large.` };
      }
      out[key] = value;
      continue;
    }

    if (typeof value === 'object') {
      return { ok: false, field: key, error: `${labelOf(key)} must be text.` };
    }
    const str = String(value);

    if (rule.kind === 'choice' && !rule.values.includes(str)) {
      return { ok: false, field: key, error: `${labelOf(key)} has an unsupported value.` };
    }

    const len = str.trim().length;
    if (len > rule.max) {
      return {
        ok: false,
        field: key,
        error: `${labelOf(key)} is too long: ${len.toLocaleString()} characters (maximum ${rule.max.toLocaleString()}). Please shorten it.`,
      };
    }
    out[key] = str;
  }

  return { ok: true, payload: out };
}

/** Trim and cap every known string field of a YouTube creator profile / niche request. */
export function clampYoutubeProfile(body = {}) {
  const out = { ...body };
  for (const [key, max] of Object.entries(YOUTUBE_PROFILE_LIMITS)) {
    if (typeof out[key] === 'string') out[key] = out[key].trim().slice(0, max);
  }
  return out;
}
