function faqs(topic, aiNote) {
  return [
    {
      q: `What does the ${topic} do?`,
      a: `It helps freelancers create or improve ${topic.toLowerCase()} for Upwork or Fiverr using Zetawala’s Freelancer Toolkit.`,
    },
    {
      q: 'Is this tool free?',
      a: 'Yes. Zetawala’s Freelancer Toolkit tools are free to use.',
    },
    {
      q: 'Does it use AI?',
      a: aiNote || 'Yes. It reuses Zetawala’s existing DeepSeek integration via the shared generate API.',
    },
    {
      q: 'Can I reuse my freelancer details?',
      a: 'Yes. Save an optional Freelancer Profile once—tools can prefill skills, experience, tone, portfolio links, and rate.',
    },
    {
      q: 'Who should use this?',
      a: 'Freelancers winning clients on Upwork and Fiverr who want faster proposals, gigs, profiles, and client messaging.',
    },
  ];
}

export const freelancerSeoData = {
  'upwork-proposal-generator': {
    title: 'Free Upwork Proposal Generator – Short & Detailed Bids',
    description:
      'Write personalized Upwork proposals with short and detailed versions from any job post. Free DeepSeek-powered proposal generator for freelancers.',
    example: { input: 'Paste job description + skills', output: 'Short + detailed personalized proposal' },
    faqs: faqs('Upwork Proposal Generator'),
  },
  'upwork-proposal-analyzer': {
    title: 'Free Upwork Proposal Analyzer – Score Strengths & Gaps',
    description:
      'Score Upwork proposals 0–100 with strengths, weaknesses, missing keywords, and readability analysis. Free DeepSeek bid coach.',
    example: { input: 'Paste draft proposal', output: 'Score card + improvement checklist' },
    faqs: faqs('Upwork Proposal Analyzer'),
  },
  'upwork-job-match-analyzer': {
    title: 'Free Upwork Job Match Analyzer – Win Probability',
    description:
      'Compare job posts to your resume/profile for match percentage, missing skills, and win probability. Free DeepSeek match tool.',
    example: { input: 'Job description + profile', output: 'Match % and suggested improvements' },
    faqs: faqs('Upwork Job Match Analyzer'),
  },
  'upwork-profile-optimizer': {
    title: 'Free Upwork Profile Optimizer – Headline Bio Skills',
    description:
      'Optimize Upwork headlines, bios, and skills with a completeness score and improvement checklist. Free DeepSeek optimizer.',
    example: { input: 'Headline + bio + skills', output: 'Optimized copy + completeness score' },
    faqs: faqs('Upwork Profile Optimizer'),
  },
  'upwork-cover-letter-generator': {
    title: 'Free Upwork Cover Letter Generator',
    description:
      'Generate professional Upwork cover letters tailored to the job description, skills, and experience. Free DeepSeek tool.',
    example: { input: 'Job description + skills', output: 'Ready-to-send cover letter' },
    faqs: faqs('Upwork Cover Letter Generator'),
  },
  'upwork-interview-answer-generator': {
    title: 'Free Upwork Interview Answer Generator',
    description:
      'Answer client interview questions with suggested replies, professional alternatives, and tips. Free DeepSeek interview coach.',
    example: { input: 'Client question + job type', output: 'Suggested answer + tips' },
    faqs: faqs('Upwork Interview Answer Generator'),
  },
  'upwork-hourly-rate-calculator': {
    title: 'Free Upwork Hourly Rate Calculator – Min Suggested Premium',
    description:
      'Calculate minimum, suggested, and premium Upwork hourly rates from income goals, expenses, taxes, and billable hours—pure math, no AI.',
    example: { input: 'Goal $4000 · 80 billable hours', output: 'Min / suggested / premium $/hr' },
    faqs: faqs('Upwork Hourly Rate Calculator', 'No. This calculator uses pure mathematical logic only.'),
  },
  'upwork-contract-generator': {
    title: 'Free Upwork Contract Generator – PDF & DOCX',
    description:
      'Create professional freelance contract templates with scope, timeline, budget, and payment terms. Download PDF or DOCX—educational template, not legal advice.',
    example: { input: 'Client + scope + timeline', output: 'Contract text + PDF/DOCX download' },
    faqs: faqs('Upwork Contract Generator'),
  },
  'upwork-portfolio-description-generator': {
    title: 'Free Upwork Portfolio Description Generator',
    description:
      'Write short and long Upwork portfolio case-study descriptions from project details, technologies, and results. Free DeepSeek copy.',
    example: { input: 'Project details + results', output: 'Short + long portfolio descriptions' },
    faqs: faqs('Upwork Portfolio Description Generator'),
  },
  'upwork-client-followup-generator': {
    title: 'Free Upwork Client Follow-up Generator',
    description:
      'Craft professional, friendly, and formal Upwork follow-up messages after proposal submission. Free DeepSeek follow-up tool.',
    example: { input: 'Proposal context + days waiting', output: 'Friendly + formal follow-ups' },
    faqs: faqs('Upwork Client Follow-up Generator'),
  },
  'fiverr-gig-title-generator': {
    title: 'Free Fiverr Gig Title Generator – SEO Titles',
    description:
      'Generate SEO-optimized Fiverr gig title variations from your service and keywords. Free DeepSeek title generator.',
    example: { input: 'Service + keywords', output: 'Multiple SEO gig titles' },
    faqs: faqs('Fiverr Gig Title Generator'),
  },
  'fiverr-gig-description-generator': {
    title: 'Free Fiverr Gig Description Generator',
    description:
      'Create structured Fiverr gig descriptions with features, delivery time, sections, and CTAs. Free DeepSeek gig copy.',
    example: { input: 'Service + features + delivery', output: 'Full gig description + CTA' },
    faqs: faqs('Fiverr Gig Description Generator'),
  },
  'fiverr-gig-seo-analyzer': {
    title: 'Free Fiverr Gig SEO Analyzer – Score & Keywords',
    description:
      'Analyze Fiverr gig SEO with scores, missing keywords, readability, and optimization suggestions. Free DeepSeek analyzer.',
    example: { input: 'Title + description + tags', output: 'SEO score + suggestions' },
    faqs: faqs('Fiverr Gig SEO Analyzer'),
  },
  'fiverr-tag-generator': {
    title: 'Free Fiverr Tag Generator – Tags & Long-tails',
    description:
      'Generate optimized Fiverr tags and long-tail keyword ideas for your service niche. Free DeepSeek tag tool.',
    example: { input: 'Service + niche', output: 'Tags + long-tail keywords' },
    faqs: faqs('Fiverr Tag Generator'),
  },
  'fiverr-faq-generator': {
    title: 'Free Fiverr FAQ Generator – Q&A for Gigs',
    description:
      'Create Fiverr gig FAQs with suggested answers for your service and target audience. Free DeepSeek FAQ builder.',
    example: { input: 'Service + audience', output: 'FAQ list with answers' },
    faqs: faqs('Fiverr FAQ Generator'),
  },
  'fiverr-pricing-generator': {
    title: 'Free Fiverr Pricing Generator – Basic Standard Premium',
    description:
      'Build Basic, Standard, and Premium Fiverr packages from estimated hours and experience—deterministic pricing plus AI package tips.',
    example: { input: 'Service + hours + level', output: '3 packages + AI suggestions' },
    faqs: faqs(
      'Fiverr Pricing Generator',
      'Package prices use pure business math; AI adds positioning recommendations.'
    ),
  },
  'fiverr-gig-image-text-generator': {
    title: 'Free Fiverr Gig Image Text Generator',
    description:
      'Generate thumbnail headlines, badge text, and call-to-action copy for Fiverr gig images—text only, no image generation.',
    example: { input: 'Service + selling points', output: 'Headlines, badges, CTA text' },
    faqs: faqs('Fiverr Gig Image Text Generator'),
  },
  'fiverr-buyer-request-reply-generator': {
    title: 'Free Fiverr Buyer Request Reply Generator',
    description:
      'Write short and detailed personalized replies to Fiverr buyer requests using your skills and experience. Free DeepSeek tool.',
    example: { input: 'Buyer request + skills', output: 'Short + detailed replies' },
    faqs: faqs('Fiverr Buyer Request Reply Generator'),
  },
  'fiverr-profile-bio-generator': {
    title: 'Free Fiverr Profile Bio Generator – SEO Bios',
    description:
      'Create professional and SEO-optimized Fiverr seller bios from skills, experience, and services. Free DeepSeek bio writer.',
    example: { input: 'Skills + experience + services', output: 'Professional + SEO bios' },
    faqs: faqs('Fiverr Profile Bio Generator'),
  },
  'fiverr-review-response-generator': {
    title: 'Free Fiverr Review Response Generator',
    description:
      'Reply to Fiverr customer reviews with professional, friendly, and formal response options. Free DeepSeek reply tool.',
    example: { input: 'Customer review + tone', output: 'Three response styles' },
    faqs: faqs('Fiverr Review Response Generator'),
  },
};
