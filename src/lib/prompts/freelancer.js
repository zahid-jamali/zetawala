/**
 * Freelancer Toolkit — DeepSeek prompt templates (shared services by domain).
 */

function clamp(text, max = 12000) {
  const t = String(text || '').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}\n\n[Truncated for token limits]`;
}

function req(payload, key) {
  return String(payload?.[key] || '').trim();
}

export function getFreelancerPrompt(action, payload = {}) {
  switch (action) {
    case 'upwork-proposal-generator': {
      const job = clamp(payload.jobDescription);
      if (!job) return null;
      return `Act as an Upwork proposal specialist. Write a personalized proposal for this job.
Experience: ${payload.experienceLevel || 'intermediate'}
Skills: ${payload.skills || 'n/a'}
Portfolio: ${payload.portfolioLinks || 'n/a'}
Tone: ${payload.preferredTone || 'professional'}

JOB:
"""
${job}
"""

Return ONLY valid JSON:
{
  "shortVersion": "concise proposal under 150 words",
  "detailedVersion": "detailed proposal 250-400 words",
  "personalizedProposal": "recommended primary proposal"
}`;
    }

    case 'upwork-proposal-analyzer': {
      const proposal = clamp(payload.proposal);
      if (!proposal) return null;
      return `Act as an Upwork bid coach. Analyze this proposal for win potential.

PROPOSAL:
"""
${proposal}
"""

Return ONLY valid JSON:
{
  "score": 0,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "missingKeywords": ["..."],
  "improvementSuggestions": ["..."],
  "readability": { "score": 0, "notes": "..." }
}`;
    }

    case 'upwork-job-match-analyzer': {
      const job = clamp(payload.jobDescription);
      const profile = clamp(payload.resumeOrProfile);
      if (!job || !profile) return null;
      return `Act as a hiring match analyst for Upwork. Compare the job to the freelancer profile.

JOB:
"""
${job}
"""

PROFILE:
"""
${profile}
"""

Return ONLY valid JSON:
{
  "matchPercentage": 0,
  "missingSkills": ["..."],
  "strengths": ["..."],
  "weaknesses": ["..."],
  "winProbability": 0,
  "suggestedImprovements": ["..."]
}`;
    }

    case 'upwork-profile-optimizer': {
      const headline = req(payload, 'headline');
      const bio = clamp(payload.bio, 6000);
      if (!headline && !bio) return null;
      return `Act as an Upwork profile optimizer.

Headline: ${headline || 'n/a'}
Bio: ${bio || 'n/a'}
Skills: ${payload.skills || 'n/a'}
Portfolio: ${payload.portfolio || 'n/a'}
Experience: ${payload.experience || 'n/a'}

Return ONLY valid JSON:
{
  "optimizedHeadline": "...",
  "optimizedBio": "...",
  "skillSuggestions": ["..."],
  "completenessScore": 0,
  "improvementChecklist": ["..."]
}`;
    }

    case 'upwork-cover-letter-generator': {
      const job = clamp(payload.jobDescription);
      if (!job) return null;
      return `Act as a cover letter writer for Upwork applications.

Skills: ${payload.skills || 'n/a'}
Experience: ${payload.experience || 'n/a'}

JOB:
"""
${job}
"""

Return ONLY valid JSON:
{
  "coverLetter": "full professional cover letter",
  "wordCount": 0
}`;
    }

    case 'upwork-interview-answer-generator': {
      const question = req(payload, 'clientQuestion');
      if (!question) return null;
      return `Act as an Upwork interview coach.

Client question: ${question}
Job type: ${payload.jobType || 'general freelance'}
Experience level: ${payload.experienceLevel || 'intermediate'}

Return ONLY valid JSON:
{
  "suggestedAnswer": "...",
  "professionalAlternative": "...",
  "tips": ["..."]
}`;
    }

    case 'upwork-contract-generator': {
      const scope = clamp(payload.projectScope, 8000);
      if (!scope || !req(payload, 'clientName')) return null;
      return `Act as a freelance contract drafter. Create a clear professional services agreement (educational template, not legal advice).

Client: ${payload.clientName}
Scope: ${scope}
Timeline: ${payload.timeline || 'n/a'}
Budget: ${payload.budget || 'n/a'}
Payment terms: ${payload.paymentTerms || 'n/a'}

Return ONLY valid JSON:
{
  "contractTitle": "...",
  "contract": "full contract text with sections",
  "disclaimer": "This is a template, not legal advice."
}`;
    }

    case 'upwork-portfolio-description-generator': {
      const details = clamp(payload.projectDetails);
      if (!details) return null;
      return `Act as a portfolio copywriter for Upwork case studies.

Project: ${details}
Technologies: ${payload.technologies || 'n/a'}
Results: ${payload.results || 'n/a'}

Return ONLY valid JSON:
{
  "shortVersion": "...",
  "longVersion": "...",
  "portfolioDescription": "recommended version"
}`;
    }

    case 'upwork-client-followup-generator': {
      const ctx = clamp(payload.proposalContext);
      if (!ctx) return null;
      return `Act as an Upwork follow-up messaging expert.

Context: ${ctx}
Days since submission: ${payload.daysSinceSubmission || '3'}
Goal: ${payload.followUpGoal || 'check interest politely'}

Return ONLY valid JSON:
{
  "professionalMessage": "...",
  "friendlyVersion": "...",
  "formalVersion": "..."
}`;
    }

    case 'fiverr-gig-title-generator': {
      const service = req(payload, 'service');
      if (!service) return null;
      return `Act as a Fiverr SEO title specialist. Generate gig titles for: ${service}
Keywords: ${payload.keywords || 'n/a'}

Return ONLY valid JSON:
{
  "titles": ["title1", "title2", "title3", "title4", "title5"],
  "seoNotes": "brief tip"
}`;
    }

    case 'fiverr-gig-description-generator': {
      const service = req(payload, 'service');
      if (!service) return null;
      return `Act as a Fiverr gig description writer.

Service: ${service}
Features: ${payload.features || 'n/a'}
Delivery time: ${payload.deliveryTime || 'n/a'}

Return ONLY valid JSON:
{
  "description": "full structured gig description with sections",
  "callToAction": "...",
  "sections": ["Intro", "What you get", "Why me", "CTA"]
}`;
    }

    case 'fiverr-gig-seo-analyzer': {
      const title = req(payload, 'gigTitle');
      const desc = clamp(payload.description, 8000);
      if (!title && !desc) return null;
      return `Act as a Fiverr gig SEO analyst.

Title: ${title || 'n/a'}
Description: ${desc || 'n/a'}
Tags: ${payload.tags || 'n/a'}

Return ONLY valid JSON:
{
  "seoScore": 0,
  "readabilityScore": 0,
  "missingKeywords": ["..."],
  "optimizationSuggestions": ["..."]
}`;
    }

    case 'fiverr-tag-generator': {
      const service = req(payload, 'service');
      if (!service) return null;
      return `Act as a Fiverr tag researcher.

Service: ${service}
Niche: ${payload.niche || 'general'}

Return ONLY valid JSON:
{
  "tags": ["tag1", "tag2"],
  "longTailKeywords": ["..."]
}`;
    }

    case 'fiverr-faq-generator': {
      const service = req(payload, 'service');
      if (!service) return null;
      return `Act as a Fiverr FAQ writer.

Service: ${service}
Audience: ${payload.targetAudience || 'buyers'}

Return ONLY valid JSON:
{
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}`;
    }

    case 'fiverr-pricing-generator': {
      const service = req(payload, 'service');
      if (!service) return null;
      return `Act as a Fiverr pricing strategist. Given packages already calculated, suggest positioning tips.
Service: ${service}
Estimated hours: ${payload.estimatedHours || 'n/a'}
Experience: ${payload.experienceLevel || 'intermediate'}
Calculated packages: ${JSON.stringify(payload.packages || {})}

Return ONLY valid JSON:
{
  "pricingSuggestions": ["..."],
  "packageTips": {
    "basic": "...",
    "standard": "...",
    "premium": "..."
  }
}`;
    }

    case 'fiverr-gig-image-text-generator': {
      const service = req(payload, 'service');
      if (!service) return null;
      return `Act as a Fiverr thumbnail copywriter. TEXT ONLY — do not describe image generation.

Service: ${service}
Selling points: ${payload.keySellingPoints || 'n/a'}

Return ONLY valid JSON:
{
  "thumbnailHeadlines": ["..."],
  "badgeText": ["..."],
  "callToActionText": ["..."]
}`;
    }

    case 'fiverr-buyer-request-reply-generator': {
      const request = clamp(payload.buyerRequest);
      if (!request) return null;
      return `Act as a Fiverr seller reply specialist.

Buyer request:
"""
${request}
"""
Skills: ${payload.skills || 'n/a'}
Experience: ${payload.experience || 'n/a'}

Return ONLY valid JSON:
{
  "personalizedReply": "...",
  "shortVersion": "...",
  "detailedVersion": "..."
}`;
    }

    case 'fiverr-profile-bio-generator': {
      const skills = req(payload, 'skills');
      if (!skills) return null;
      return `Act as a Fiverr profile bio writer.

Skills: ${skills}
Experience: ${payload.experience || 'n/a'}
Services: ${payload.services || skills}

Return ONLY valid JSON:
{
  "professionalBio": "...",
  "seoOptimizedVersion": "..."
}`;
    }

    case 'fiverr-review-response-generator': {
      const review = clamp(payload.customerReview);
      if (!review) return null;
      return `Act as a Fiverr review response writer.

Review:
"""
${review}
"""
Preferred tone hint: ${payload.tone || 'professional'}

Return ONLY valid JSON:
{
  "professionalResponse": "...",
  "friendlyResponse": "...",
  "formalResponse": "..."
}`;
    }

    default:
      return null;
  }
}
