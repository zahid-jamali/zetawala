/**
 * Freelancer Toolkit — Upwork + Fiverr (20 tools).
 */

export const FREELANCER_CATEGORY_SLUG = 'freelancer-toolkit';
export const FREELANCER_FOLDER = 'freelancer';

export const freelancerTools = [
  // —— Upwork ——
  {
    slug: 'upwork-proposal-generator',
    name: 'Upwork Proposal Generator',
    desc: 'Personalized short and detailed proposals from a job post',
    seoSlug: 'upwork-proposal-generator',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-proposal-analyzer',
    name: 'Upwork Proposal Analyzer',
    desc: 'Score proposals with strengths, gaps, and readability',
    seoSlug: 'upwork-proposal-analyzer',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-job-match-analyzer',
    name: 'Upwork Job Match Analyzer',
    desc: 'Match percentage, missing skills, and win probability',
    seoSlug: 'upwork-job-match-analyzer',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-profile-optimizer',
    name: 'Upwork Profile Optimizer',
    desc: 'Optimize headline, bio, skills, and completeness score',
    seoSlug: 'upwork-profile-optimizer',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-cover-letter-generator',
    name: 'Upwork Cover Letter Generator',
    desc: 'Professional cover letters tailored to the job post',
    seoSlug: 'upwork-cover-letter-generator',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-interview-answer-generator',
    name: 'Upwork Interview Answer Generator',
    desc: 'Client Q&A answers with tips and alternatives',
    seoSlug: 'upwork-interview-answer-generator',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-hourly-rate-calculator',
    name: 'Upwork Hourly Rate Calculator',
    desc: 'Minimum, suggested, and premium rates from goals',
    seoSlug: 'upwork-hourly-rate-calculator',
    hub: 'upwork',
    clientOnly: true,
  },
  {
    slug: 'upwork-contract-generator',
    name: 'Upwork Contract Generator',
    desc: 'Professional project contracts with PDF/DOCX download',
    seoSlug: 'upwork-contract-generator',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-portfolio-description-generator',
    name: 'Upwork Portfolio Description Generator',
    desc: 'Short and long portfolio case-study descriptions',
    seoSlug: 'upwork-portfolio-description-generator',
    hub: 'upwork',
    ai: true,
  },
  {
    slug: 'upwork-client-followup-generator',
    name: 'Upwork Client Follow-up Generator',
    desc: 'Friendly and formal follow-ups after proposal submission',
    seoSlug: 'upwork-client-followup-generator',
    hub: 'upwork',
    ai: true,
  },
  // —— Fiverr ——
  {
    slug: 'fiverr-gig-title-generator',
    name: 'Fiverr Gig Title Generator',
    desc: 'SEO-optimized gig title variations',
    seoSlug: 'fiverr-gig-title-generator',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-gig-description-generator',
    name: 'Fiverr Gig Description Generator',
    desc: 'Structured gig descriptions with clear CTAs',
    seoSlug: 'fiverr-gig-description-generator',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-gig-seo-analyzer',
    name: 'Fiverr Gig SEO Analyzer',
    desc: 'SEO score, missing keywords, and readability',
    seoSlug: 'fiverr-gig-seo-analyzer',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-tag-generator',
    name: 'Fiverr Tag Generator',
    desc: 'Optimized tags and long-tail keyword ideas',
    seoSlug: 'fiverr-tag-generator',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-faq-generator',
    name: 'Fiverr FAQ Generator',
    desc: 'Buyer FAQs with suggested answers for your gig',
    seoSlug: 'fiverr-faq-generator',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-pricing-generator',
    name: 'Fiverr Pricing Generator',
    desc: 'Basic, Standard, and Premium packages with AI tips',
    seoSlug: 'fiverr-pricing-generator',
    hub: 'fiverr',
    hybrid: true,
  },
  {
    slug: 'fiverr-gig-image-text-generator',
    name: 'Fiverr Gig Image Text Generator',
    desc: 'Thumbnail headlines, badges, and CTA text (text only)',
    seoSlug: 'fiverr-gig-image-text-generator',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-buyer-request-reply-generator',
    name: 'Fiverr Buyer Request Reply Generator',
    desc: 'Short and detailed replies to buyer requests',
    seoSlug: 'fiverr-buyer-request-reply-generator',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-profile-bio-generator',
    name: 'Fiverr Profile Bio Generator',
    desc: 'Professional and SEO-optimized seller bios',
    seoSlug: 'fiverr-profile-bio-generator',
    hub: 'fiverr',
    ai: true,
  },
  {
    slug: 'fiverr-review-response-generator',
    name: 'Fiverr Review Response Generator',
    desc: 'Professional, friendly, and formal review replies',
    seoSlug: 'fiverr-review-response-generator',
    hub: 'fiverr',
    ai: true,
  },
];

export const FREELANCER_TOOL_SLUGS = freelancerTools.map((t) => t.slug);
export const UPWORK_TOOLS = freelancerTools.filter((t) => t.hub === 'upwork');
export const FIVERR_TOOLS = freelancerTools.filter((t) => t.hub === 'fiverr');

export function getFreelancerTool(slug) {
  return freelancerTools.find((t) => t.slug === slug) || null;
}
