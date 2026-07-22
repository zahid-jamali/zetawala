export const webmasterSeoData = {
  'website-checker': {
    title: 'SEO Website Checker',
    description:
      'Run a technical and on-page SEO audit for any URL. Get scored categories, critical issues, and prioritized fixes covering titles, headings, links, and crawl signals—ideal as your first diagnostic pass.',
    example: {
      input: 'URL: https://example.com/',
      output: 'Health score: 72/100 | Issues: missing meta description, 3 broken internal links, H1 missing on homepage.',
    },
    faqs: [
      { q: 'What does the SEO Website Checker analyze?', a: 'It reviews on-page elements, basic technical signals, link health, and metadata to produce an overall score with actionable recommendations.' },
      { q: 'Do I need to verify site ownership?', a: 'No. Enter any public URL. The tool fetches publicly available HTML like a search crawler would.' },
      { q: 'How often should I run a site audit?', a: 'After major template changes, migrations, or at least monthly for active sites to catch regressions early.' },
      { q: 'Can I audit a single page only?', a: 'Yes. Paste a page URL for a focused on-page audit rather than a full-site crawl.' },
    ],
  },
  'content-audit': {
    title: 'SEO Content Audit',
    description:
      'Analyze page content structure, heading hierarchy, word count, internal links, and readability signals. Identify thin content, missing subheadings, and optimization gaps before publishing or refreshing pages.',
    example: {
      input: 'URL: https://example.com/blog/seo-guide',
      output: 'Word count: 840 | H1: 1 | H2: 4 | Internal links: 6 | Readability: moderate | Suggestion: add FAQ schema topic block.',
    },
    faqs: [
      { q: 'What content factors are checked?', a: 'Headings, body length, link density, image alt usage, and basic readability indicators relevant to on-page SEO.' },
      { q: 'Is this a plagiarism checker?', a: 'No. It focuses on structure and SEO signals, not duplicate content across the web.' },
      { q: 'Can I paste raw text instead of a URL?', a: 'Use the Keyword Density Checker for pasted text; Content Audit is optimized for live URL analysis.' },
      { q: 'How does this help rankings?', a: 'Well-structured, sufficiently detailed content with clear headings and internal links tends to perform better for target queries.' },
    ],
  },
  'title-meta-analyzer': {
    title: 'SEO Title & Meta Description Analyzer',
    description:
      'Find missing, duplicate, too-short, or too-long title tags and meta descriptions. Compare pixel-length estimates and get rewrite suggestions aligned with click-through best practices.',
    example: {
      input: 'URL: https://example.com/products/widget',
      output: 'Title: 58 chars (OK) | Meta: missing | Duplicate title detected on /products/widget-2.',
    },
    faqs: [
      { q: 'What is the ideal title tag length?', a: 'Roughly 50–60 characters to avoid truncation in Google SERPs, though relevance matters more than exact length.' },
      { q: 'Why are meta descriptions important?', a: 'They do not directly rank pages but influence click-through rates when Google uses them as snippets.' },
      { q: 'Does this detect duplicate titles sitewide?', a: 'When crawling multiple URLs, duplicate title patterns are flagged for consolidation.' },
      { q: 'Can I analyze competitor pages?', a: 'Yes. Any publicly accessible URL can be analyzed for title and meta patterns.' },
    ],
  },
  'pagespeed-analyzer': {
    title: 'PageSpeed & Core Web Vitals Analyzer',
    description:
      'Measure performance using Google PageSpeed Insights data. Review LCP, INP, CLS, lab scores, and optimization opportunities for mobile and desktop with plain-language interpretation.',
    example: {
      input: 'URL: https://example.com/ | Strategy: mobile',
      output: 'Performance: 64 | LCP: 2.8s | CLS: 0.04 | Opportunities: defer offscreen images, reduce unused JS.',
    },
    faqs: [
      { q: 'What are Core Web Vitals?', a: 'Google metrics for loading (LCP), interactivity (INP), and visual stability (CLS) that influence user experience and may affect rankings.' },
      { q: 'Why do I need PAGESPEED_API_KEY?', a: 'Server-side calls to PageSpeed Insights require a Google API key for reliable quota and production use.' },
      { q: 'Mobile vs desktop—which matters more?', a: 'Google primarily uses mobile-first indexing, so mobile CWV scores are usually the priority.' },
      { q: 'Will fixing PageSpeed guarantee better rankings?', a: 'Performance is one signal among many, but faster pages typically improve engagement and conversions.' },
    ],
  },
  'internal-link-analyzer': {
    title: 'Internal Link & Orphan Page Analyzer',
    description:
      'Map internal linking patterns, weak anchor text, and orphan pages with few or no inbound internal links. Strengthen site architecture so important pages receive crawl equity.',
    example: {
      input: 'URL: https://example.com/ (crawl depth: 2)',
      output: 'Orphan pages: 4 | Weak anchors: 12 | Top hub: /blog/ | Recommendation: link orphans from category hub.',
    },
    faqs: [
      { q: 'What is an orphan page?', a: 'A page with no internal links pointing to it, making it hard for crawlers and users to discover.' },
      { q: 'How deep should internal linking go?', a: 'Important pages should be reachable within 3 clicks from the homepage when possible.' },
      { q: 'Does anchor text matter?', a: 'Descriptive anchor text helps search engines understand the target page topic.' },
      { q: 'Can this fix links automatically?', a: 'No. The tool reports issues; you implement linking changes in your CMS or templates.' },
    ],
  },
  'broken-link-checker': {
    title: 'Broken Link Checker',
    description:
      'Scan internal and external links for 404s, timeouts, and redirect chains. Protect user experience and crawl budget by fixing broken references before they accumulate.',
    example: {
      input: 'URL: https://example.com/',
      output: 'Broken internal: 2 (404) | Broken external: 1 | Redirect chain: /old-page → /temp → /new-page.',
    },
    faqs: [
      { q: 'Does it check external links too?', a: 'Yes. Outbound links to dead destinations are flagged so you can update or remove them.' },
      { q: 'How many pages does it crawl?', a: 'Crawl scope depends on tool settings; start from a seed URL or sitemap for broader coverage.' },
      { q: 'Are redirect chains a problem?', a: 'Long chains slow crawlers and users. Prefer a single 301 hop to the final URL.' },
      { q: 'Should I fix broken links before migrating?', a: 'Always audit links pre- and post-migration to avoid SEO and UX regressions.' },
    ],
  },
  'sitemap-tool': {
    title: 'Sitemap Generator & Validator',
    description:
      'Generate XML sitemaps from a URL list or validate an existing sitemap for format errors, missing URLs, and lastmod consistency. Ensure search engines can discover your important pages.',
    example: {
      input: 'Sitemap URL: https://example.com/sitemap.xml',
      output: 'Valid XML | URLs: 142 | Errors: 0 | Warning: 3 URLs return noindex.',
    },
    faqs: [
      { q: 'Do I need a sitemap for small sites?', a: 'Helpful but not mandatory for tiny sites. Larger or frequently updated sites benefit most.' },
      { q: 'What is lastmod?', a: 'The last modification date hint for crawlers. Keep it accurate; do not fake daily updates.' },
      { q: 'Can I submit the sitemap to Google?', a: 'Yes, via Google Search Console after generating or validating your sitemap file.' },
      { q: 'What about image or video sitemaps?', a: 'This tool focuses on standard URL sitemaps; extend manually for specialized media sitemaps if needed.' },
    ],
  },
  'canonical-indexability': {
    title: 'Canonical & Indexability Checker',
    description:
      'Inspect canonical tags, robots meta, X-Robots-Tag headers, and HTTP status to confirm pages are indexable. Catch accidental noindex, wrong canonicals, and blocking rules early.',
    example: {
      input: 'URL: https://example.com/page?utm_source=email',
      output: 'Canonical: https://example.com/page | Robots: index,follow | Indexable: yes | Parameter URL canonicalized correctly.',
    },
    faqs: [
      { q: 'What makes a page non-indexable?', a: 'noindex directives, robots.txt blocks, auth walls, or canonical tags pointing elsewhere.' },
      { q: 'Should every page have a canonical?', a: 'Recommended, especially for parameterized, paginated, or near-duplicate URLs.' },
      { q: 'What is X-Robots-Tag?', a: 'An HTTP header that can set robots directives like noindex without HTML meta tags.' },
      { q: 'Can wrong canonicals hurt SEO?', a: 'Yes. They can consolidate rankings to the wrong URL or hide important pages from the index.' },
    ],
  },
  'action-plan': {
    title: 'SEO Action Plan Generator',
    description:
      'Turn audit findings into a prioritized, beginner-friendly SEO roadmap. Get quick wins, medium-term tasks, and long-term projects ordered by impact and effort.',
    example: {
      input: 'URL: https://example.com/ | Goal: increase organic traffic',
      output: 'Week 1: fix meta descriptions on top 10 pages | Month 1: improve CWV on product templates | Quarter: content hub for core topic cluster.',
    },
    faqs: [
      { q: 'Does this replace an SEO consultant?', a: 'It accelerates planning with structured tasks, but complex sites may still need expert review.' },
      { q: 'How is priority determined?', a: 'Based on issue severity, traffic potential, and typical fix effort from audit signals.' },
      { q: 'Can I export the action plan?', a: 'Copy results from the output panel and track tasks in your project tool of choice.' },
      { q: 'Should beginners follow every task?', a: 'Start with quick wins (metadata, broken links) before advanced technical changes.' },
    ],
  },
  'robots-txt-tool': {
    title: 'Robots.txt Generator & Tester',
    description:
      'Build robots.txt rules for allow/disallow paths and test whether specific URLs are blocked for common crawlers. Avoid accidentally blocking CSS, JS, or entire site sections.',
    example: {
      input: 'Disallow: /admin/, /cart/ | Allow: / | User-agent: *',
      output: 'Test /products/shoe: allowed | Test /admin/dashboard: blocked | Syntax: valid.',
    },
    faqs: [
      { q: 'Does robots.txt guarantee pages stay out of Google?', a: 'No. Use noindex for removal from the index; robots.txt only controls crawling.' },
      { q: 'Should I block /wp-admin/?', a: 'Often yes for WordPress, but never block assets needed for rendering.' },
      { q: 'Where does robots.txt live?', a: 'At the site root: https://yoursite.com/robots.txt' },
      { q: 'Can I test Googlebot specifically?', a: 'Use the tester with user-agent Googlebot to simulate Google crawler access.' },
    ],
  },
  'header-meta-inspector': {
    title: 'SEO Header & Meta Tags Inspector',
    description:
      'Inspect HTTP headers and HTML meta tags including title, description, Open Graph, Twitter cards, canonical, hreflang, and viewport settings in one structured report.',
    example: {
      input: 'URL: https://example.com/article',
      output: 'og:title set | twitter:card summary_large_image | canonical present | hreflang: en, ur-PK.',
    },
    faqs: [
      { q: 'Why check Open Graph tags?', a: 'They control how links appear when shared on Facebook, LinkedIn, and other platforms.' },
      { q: 'Are Twitter cards separate from OG?', a: 'Twitter can fall back to OG tags, but dedicated twitter: tags give finer control.' },
      { q: 'What is hreflang for?', a: 'It tells search engines about language/regional variants of the same content.' },
      { q: 'Does viewport meta affect SEO?', a: 'Indirectly—mobile-friendly rendering is required for good mobile UX and indexing.' },
    ],
  },
  'traffic-revenue': {
    title: 'SEO Traffic & Ad Revenue Estimator',
    description:
      'Estimate organic traffic value and ad revenue potential using labeled assumptions for CTR, RPM, and monthly search volume. Useful for prioritizing pages and forecasting monetization.',
    example: {
      input: 'Keyword: "best running shoes" | Volume: 12000/mo | Position: 5 | RPM: $8',
      output: 'Est. clicks: 480/mo | Ad revenue range: $3,200–$4,800/mo (labeled assumptions).',
    },
    faqs: [
      { q: 'Are these traffic numbers guaranteed?', a: 'No. All figures are estimates based on inputs you provide and industry-average assumptions.' },
      { q: 'What RPM should I use?', a: 'Use your AdSense or network historical RPM when available; otherwise start with conservative defaults.' },
      { q: 'Does this include affiliate revenue?', a: 'Focus is on ad RPM models; adjust inputs manually for affiliate or product revenue.' },
      { q: 'Why label assumptions?', a: 'Transparent inputs prevent overconfidence in projections and help compare scenarios.' },
    ],
  },
  'health-score': {
    title: 'SEO Health Score Calculator',
    description:
      'Compute an overall SEO health score with category breakdowns for technical, content, and performance factors. Track improvement over time after implementing fixes.',
    example: {
      input: 'URL: https://example.com/',
      output: 'Overall: 78/100 | Technical: 82 | Content: 74 | Performance: 71 | Top fix: improve LCP on homepage.',
    },
    faqs: [
      { q: 'How is the health score calculated?', a: 'Weighted combination of audit categories including metadata, links, indexability, and performance signals.' },
      { q: 'What is a good score?', a: 'Above 80 is strong; 60–80 means actionable issues remain; below 60 suggests major fixes needed.' },
      { q: 'Can I compare two URLs?', a: 'Run the tool separately on each URL and compare category breakdowns.' },
      { q: 'Should I rerun after fixes?', a: 'Yes. Rerunning validates improvements and surfaces the next priority issues.' },
    ],
  },
  'keyword-density': {
    title: 'Keyword Density Checker',
    description:
      'Analyze 1–3 word phrase frequency from a URL or pasted text. Spot over-optimization, missing primary terms, and natural language balance for target keywords.',
    example: {
      input: 'Text: "SEO tools help SEO teams improve SEO results with SEO audits..."',
      output: 'Top phrases: "seo" 4.2%, "seo tools" 1.8%, "audits" 0.9% | Warning: "seo" may be overused.',
    },
    faqs: [
      { q: 'Is there an ideal keyword density?', a: 'No fixed percentage. Write naturally; stuffing often triggers quality issues.' },
      { q: 'Can I check competitor content?', a: 'Paste their visible page text or analyze via URL when publicly accessible.' },
      { q: 'Why check 2–3 word phrases?', a: 'Long-tail phrase frequency reveals topical focus beyond single keywords.' },
      { q: 'Does density alone rank pages?', a: 'No. Relevance, authority, and UX matter far more than raw repetition.' },
    ],
  },
  'seo-roi': {
    title: 'SEO ROI Calculator',
    description:
      'Estimate return on SEO investment from projected traffic lift, conversion rate, and average order value or lead value. Compare SEO spend against expected revenue gains.',
    example: {
      input: 'Monthly SEO cost: $500 | Traffic lift: +2000 visits | Conversion: 2% | AOV: $45',
      output: 'Est. monthly revenue: $1,800 | ROI: 260% (labeled assumptions).',
    },
    faqs: [
      { q: 'What costs should I include?', a: 'Tools, agency fees, content production, and internal labor allocated to SEO.' },
      { q: 'How long until SEO ROI shows?', a: 'Often 3–6 months for meaningful organic gains; timelines vary by competition and site authority.' },
      { q: 'Can this model leads instead of sales?', a: 'Yes. Use average lead value × conversions instead of AOV.' },
      { q: 'Are results guaranteed?', a: 'No. Use conservative traffic and conversion estimates for planning, not promises.' },
    ],
  },
  'keyword-roi': {
    title: 'Keyword ROI Calculator',
    description:
      'Model revenue potential for a target keyword from search volume, expected rank, CTR curve, conversion rate, and value per conversion. Prioritize keywords with the best risk-adjusted upside.',
    example: {
      input: 'Keyword: "buy protein powder" | Volume: 8100 | Target rank: 3 | Conv: 3% | Value: $32',
      output: 'Est. monthly value: $4,900–$6,200 at rank 3 (assumption-labeled).',
    },
    faqs: [
      { q: 'Where do search volumes come from?', a: 'Enter volumes from your keyword research tool; the calculator does not fetch live volume data.' },
      { q: 'How is CTR estimated?', a: 'Uses typical position-based CTR curves; adjust if you have Search Console data for your site.' },
      { q: 'Should I pursue high-volume keywords first?', a: 'Balance volume with difficulty and commercial intent—not volume alone.' },
      { q: 'Can local keywords be modeled?', a: 'Yes. Use localized volume estimates and conversion values for your market.' },
    ],
  },
  'content-roi': {
    title: 'Content ROI Calculator',
    description:
      'Estimate content marketing ROI from production costs, expected traffic, engagement, and conversion value over time. Compare blog, landing page, and resource investments.',
    example: {
      input: 'Content cost: $400 | Expected monthly visits: 600 | Conv: 1.5% | Lead value: $80',
      output: 'Monthly lead value: $720 | Break-even: ~0.6 months (labeled assumptions).',
    },
    faqs: [
      { q: 'What costs belong in content ROI?', a: 'Writing, design, editing, promotion, and tooling allocated to the piece.' },
      { q: 'How do I estimate traffic for new content?', a: 'Use keyword ROI inputs or historical performance of similar posts on your site.' },
      { q: 'Does evergreen content improve ROI?', a: 'Yes. Long-tail posts often compound traffic while one-time costs stay fixed.' },
      { q: 'Should I include refresh costs?', a: 'Add periodic update costs for accurate multi-year ROI, especially for competitive topics.' },
    ],
  },
};
