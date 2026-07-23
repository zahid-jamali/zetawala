export const webmasterSeoData = {
  'website-checker': {
    title: 'SEO Website Checker – Free SEO Audit',
    description:
      'Zetawala’s free SEO website checker runs a technical and on-page free SEO audit on any public URL. It crawls a limited page sample, computes a deterministic audit score from titles, meta, headings, links, and indexability signals, then uses AI only to interpret those measured issues into prioritized fixes—no invented metrics.',
    example: {
      input: 'URL: https://example.com/',
      output: 'Overall 72/100 · Critical: missing meta description, weak H1 · Warnings: thin pages · AI priority fixes tied to audit issues',
    },
    faqs: [
      {
        q: 'What does the free SEO website checker analyze?',
        a: 'It crawls a public URL sample (up to about 12 pages, depth 2), scores on-page and technical signals, and lists critical issues and warnings. AI only summarizes and prioritizes what the audit already found.',
      },
      {
        q: 'Do I need to verify site ownership?',
        a: 'No. Paste any publicly reachable URL. Zetawala fetches HTML like a crawler would—login walls and blocked pages cannot be audited.',
      },
      {
        q: 'Is the SEO score an official Google score?',
        a: 'No. It is a deterministic Zetawala audit score from measured page signals. It is not Search Console or a Google ranking score.',
      },
      {
        q: 'Does AI invent SEO problems?',
        a: 'No. Scores and issue lists are computed first. AI interprets only the provided audit payload and must not invent new issues.',
      },
      {
        q: 'Is this a full-site crawl?',
        a: 'No. Coverage is intentionally limited for speed and cost. Use it as a fast free SEO audit pass, then deepen checks with the other webmaster tools.',
      },
      {
        q: 'Who should use this tool?',
        a: 'Site owners, freelancers, and agencies who want a free SEO website checker before fixing metadata, links, indexability, or Core Web Vitals.',
      },
    ],
  },
  'content-audit': {
    title: 'SEO Content Audit – Free On-Page Analyzer',
    description:
      'Run a free SEO content audit on any public page URL. Zetawala measures word count, heading hierarchy, image alt gaps, and internal/external link counts, scores on-page structure, then uses AI only to interpret those metrics—ideal for thin content and heading fixes.',
    example: {
      input: 'URL: https://example.com/blog/seo-guide',
      output: 'Word count 840 · H1: 1 · H2: 4 · Missing alt: 2 · Internal links: 6 · On-page score + AI improvements from measured gaps',
    },
    faqs: [
      {
        q: 'What does the content audit tool check?',
        a: 'It fetches one public page and reviews title, meta description, headings, word count, images missing alt text, and link counts, then scores on-page SEO structure.',
      },
      {
        q: 'Is this a plagiarism or duplicate-content checker?',
        a: 'No. It audits structure and on-page SEO signals on the URL you provide. It does not scan the web for copied text.',
      },
      {
        q: 'Can I paste raw text instead of a URL?',
        a: 'Content Audit is built for live URL fetch. For pasted copy, use the free keyword density checker.',
      },
      {
        q: 'How does AI help in the content audit?',
        a: 'AI interprets measured metrics (word count, headings, missing alt, link counts). It does not invent page statistics.',
      },
      {
        q: 'Will a content audit improve rankings by itself?',
        a: 'It surfaces structural gaps that often hurt relevance and UX. You still need to publish fixes, earn links, and match search intent.',
      },
      {
        q: 'Is the content audit free on Zetawala?',
        a: 'Yes. It is a free SEO content audit for public pages—no ownership verification required.',
      },
    ],
  },
  'title-meta-analyzer': {
    title: 'Meta Description Checker & Title Tag Analyzer',
    description:
      'Free meta description checker and title tag analyzer from Zetawala. Sample pages from your sitemap or a short crawl, flag missing/short/long titles and descriptions, detect duplicates, and compare character-length issues that hurt SERP snippets and CTR.',
    example: {
      input: 'URL: https://example.com/products/widget',
      output: 'Pages checked: 18 · Title OK (58 chars) · Meta missing · Duplicate title found on 2 URLs',
    },
    faqs: [
      {
        q: 'What is a good title tag length?',
        a: 'Aim for roughly 50–60 characters so Google is less likely to truncate. Relevance still matters more than an exact character count.',
      },
      {
        q: 'Why use a meta description checker?',
        a: 'Meta descriptions do not directly rank pages, but strong snippets improve click-through when Google uses them in results.',
      },
      {
        q: 'How does Zetawala find duplicate titles?',
        a: 'It samples up to about 25 URLs from sitemap.xml (or a crawl fallback), compares title and description strings, and flags duplicates in that sample.',
      },
      {
        q: 'Does this rewrite my titles automatically?',
        a: 'No. It reports length and duplicate issues so you can edit titles and meta descriptions in your CMS or templates.',
      },
      {
        q: 'Can I analyze competitor title tags?',
        a: 'Yes. Any publicly accessible URL can be sampled. Private or blocked pages cannot be fetched.',
      },
      {
        q: 'Is AI required for this tool?',
        a: 'No. Title and meta checks are deterministic from fetched HTML—missing, short, long, and duplicate patterns only.',
      },
    ],
  },
  'pagespeed-analyzer': {
    title: 'PageSpeed Insights & Core Web Vitals Checker',
    description:
      'Free PageSpeed Insights and Core Web Vitals checker powered by Google’s PageSpeed API. Measure LCP, INP, CLS, lab performance scores, and opportunities for mobile or desktop—then get plain-language tips from AI that only interpret the API results.',
    example: {
      input: 'URL: https://example.com/ | Strategy: mobile',
      output: 'Performance 64 · LCP 2.8s · CLS 0.04 · Opportunities: reduce unused JS · AI fix-first tips from PSI data',
    },
    faqs: [
      {
        q: 'What are Core Web Vitals?',
        a: 'Google’s key UX metrics: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). They reflect loading, interactivity, and visual stability.',
      },
      {
        q: 'Where do the PageSpeed numbers come from?',
        a: 'Zetawala calls the Google PageSpeed Insights API for the URL and strategy you choose. Scores and opportunities come from that API response.',
      },
      {
        q: 'Does AI change my PageSpeed score?',
        a: 'No. Performance and vitals are from PageSpeed Insights. AI only explains opportunities and suggests beginner-friendly next steps from that data.',
      },
      {
        q: 'Should I prioritize mobile or desktop?',
        a: 'Google uses mobile-first indexing for most sites, so mobile Core Web Vitals are usually the first priority.',
      },
      {
        q: 'Will fixing PageSpeed guarantee higher rankings?',
        a: 'No single fix guarantees rankings. Better speed and CWV often improve UX and engagement, which supports SEO alongside content and authority.',
      },
      {
        q: 'Is this PageSpeed tool free?',
        a: 'Yes. Zetawala’s PageSpeed Insights analyzer is free to run on public URLs (subject to API availability and fair use).',
      },
    ],
  },
  'internal-link-analyzer': {
    title: 'Internal Link Checker & Orphan Page Finder',
    description:
      'Free internal link checker and orphan page finder from Zetawala. Crawl a limited public sample to map inbound/outbound links, weak anchors (“click here”), weakly linked URLs, and orphan-page candidates—then AI interprets only those crawl results.',
    example: {
      input: 'URL: https://example.com/',
      output: 'Pages analyzed: 15 · Orphan candidates: 4 · Weak anchors: 12 · Hub: /blog/ · Note: orphan list limited to crawl sample',
    },
    faqs: [
      {
        q: 'What is an orphan page?',
        a: 'A page with no inbound internal links in the crawled sample, so users and crawlers may struggle to discover it from other pages.',
      },
      {
        q: 'Does this find every orphan page on my site?',
        a: 'No. Orphan detection is limited to the crawled sample (about 15 pages, depth 2). It is not a full-site guarantee.',
      },
      {
        q: 'What counts as weak anchor text?',
        a: 'Empty anchors or generic phrases like “click here,” “here,” “read more,” or “learn more” are flagged so you can use descriptive anchors.',
      },
      {
        q: 'Can the tool add internal links for me?',
        a: 'No. It reports orphans, weak anchors, and hubs. You implement linking changes in your CMS, templates, or navigation.',
      },
      {
        q: 'How does AI use the internal link data?',
        a: 'AI summarizes the measured orphan candidates, weakly linked pages, and weak anchors. It does not invent crawl findings.',
      },
      {
        q: 'Why does internal linking matter for SEO?',
        a: 'Strong internal links help crawl discovery, distribute relevance, and keep important pages reachable within a few clicks.',
      },
    ],
  },
  'broken-link-checker': {
    title: 'Broken Link Checker – Free 404 Finder',
    description:
      'Free broken link checker from Zetawala. Crawl a public seed URL, sample internal and external links, and flag 404s, server errors, and unreachable destinations—up to a capped number of unique URLs for reliable free scans.',
    example: {
      input: 'URL: https://example.com/',
      output: 'Links checked: 40 · Broken: 3 · Status 404 on /old-offer · External dead link flagged · Fix/remove recommendations',
    },
    faqs: [
      {
        q: 'Does the broken link checker scan external links?',
        a: 'Yes. Both same-origin and outbound links from the crawl sample are candidates; dead destinations are flagged with status codes when fetchable.',
      },
      {
        q: 'How many links does it check?',
        a: 'It crawls a limited set of pages, then checks up to about 40 unique links for cost control. Large sites need multiple seed URLs or deeper tooling.',
      },
      {
        q: 'Are redirect chains fully mapped?',
        a: 'The checker focuses on broken/unreachable responses (4xx/5xx/failures). Use sitemap validation and canonical checks for broader redirect hygiene.',
      },
      {
        q: 'Do I need site access or login?',
        a: 'No. It fetches public URLs only. Links behind authentication or bot blocks may appear unreachable.',
      },
      {
        q: 'Should I fix broken links before a migration?',
        a: 'Yes. Audit before and after migrations to catch 404s that waste crawl budget and hurt UX.',
      },
      {
        q: 'Is AI used in the broken link report?',
        a: 'No. Broken status and recommendations are deterministic from HTTP fetch results.',
      },
    ],
  },
  'sitemap-tool': {
    title: 'XML Sitemap Generator & Validator',
    description:
      'Free XML sitemap generator and validator from Zetawala. Generate a sample sitemap from a limited public crawl, or validate an existing sitemap.xml for duplicate locs, 404s, redirects, and noindex URLs—ready for Google Search Console hygiene checks.',
    example: {
      input: 'Mode: validate · https://example.com/sitemap.xml',
      output: 'Total URLs: 142 · Sampled: 25 · Issues: 1× 404, 2× noindex · Duplicate loc warning',
    },
    faqs: [
      {
        q: 'Can this create a full-site XML sitemap?',
        a: 'Generate mode crawls a limited sample (about 30 pages). Use the XML as a starting point and expand manually for large sites.',
      },
      {
        q: 'What does sitemap validation check?',
        a: 'It parses <loc> URLs, samples up to about 25 entries, and flags duplicates, 404s, redirects, fetch errors, and noindex pages in that sample.',
      },
      {
        q: 'Do small sites need a sitemap?',
        a: 'Not always mandatory, but an XML sitemap helps discovery—especially for larger or frequently updated sites.',
      },
      {
        q: 'Can I submit the sitemap to Google?',
        a: 'Yes. After generating or fixing your sitemap, submit the URL in Google Search Console.',
      },
      {
        q: 'What if /sitemap.xml is missing?',
        a: 'Validate mode looks for sitemap.xml on the origin when your input is not already a sitemap URL. Generate mode can produce a sample from a crawl instead.',
      },
      {
        q: 'Is this XML sitemap tool free?',
        a: 'Yes. Zetawala’s sitemap generator and validator is free for public URLs.',
      },
    ],
  },
  'canonical-indexability': {
    title: 'Canonical Tag Checker & Indexability Tool',
    description:
      'Free canonical tag checker and indexability analyzer from Zetawala. Fetch a public URL to inspect canonical, robots meta, X-Robots-Tag, HTTP status, and robots.txt accessibility—then get a deterministic indexability score so you catch wrong canonicals and accidental noindex early.',
    example: {
      input: 'URL: https://example.com/page?utm_source=email',
      output: 'Canonical → /page · Robots: index,follow · X-Robots: none · Indexable: yes · robots.txt accessible',
    },
    faqs: [
      {
        q: 'What makes a page non-indexable?',
        a: 'Common causes include noindex (meta or X-Robots-Tag), soft/hard blocks, error statuses, or a canonical pointing to a different URL.',
      },
      {
        q: 'Should every page have a canonical tag?',
        a: 'Self-referencing canonicals are recommended—especially for parameterized, paginated, or near-duplicate URLs.',
      },
      {
        q: 'What is X-Robots-Tag?',
        a: 'An HTTP header that can set robots directives (like noindex) without an HTML meta robots tag. This tool reports it when present.',
      },
      {
        q: 'Does robots.txt alone remove a page from Google?',
        a: 'No. robots.txt controls crawling. Use noindex (and indexing tools) when you need a URL kept out of the index.',
      },
      {
        q: 'Can wrong canonicals hurt SEO?',
        a: 'Yes. They can consolidate signals to the wrong URL or hide important pages from the index.',
      },
      {
        q: 'Is the indexability score from Google?',
        a: 'No. It is a deterministic Zetawala score from fetched headers and HTML signals—not an official Google metric.',
      },
    ],
  },
  'action-plan': {
    title: 'SEO Action Plan Generator – Free Roadmap',
    description:
      'Turn a free SEO audit into a prioritized SEO action plan with Zetawala. Crawl a public sample, compute deterministic critical issues and warnings, then use AI only to order P0–P2 tasks from those findings—beginner-friendly roadmap, no invented problems.',
    example: {
      input: 'URL: https://example.com/ | Goal: organic traffic',
      output: 'P0: fix missing meta on top pages · P1: repair broken internal links · P2: strengthen thin content · Beginner steps listed',
    },
    faqs: [
      {
        q: 'How is the SEO action plan prioritized?',
        a: 'The crawl produces a deterministic audit with critical and warning lists. AI builds the roadmap only from those arrays—ordered by impact and urgency labels.',
      },
      {
        q: 'Does AI invent tasks not in the audit?',
        a: 'It must not. Instructions require prioritizing the provided critical/warnings only.',
      },
      {
        q: 'Does this replace an SEO consultant?',
        a: 'It accelerates planning with a structured free SEO roadmap. Complex migrations, legal, or enterprise sites may still need expert review.',
      },
      {
        q: 'What should beginners do first?',
        a: 'Start with P0 quick wins—metadata, broken links, and indexability—before heavy template or architecture work.',
      },
      {
        q: 'Can I export the action plan?',
        a: 'Copy the roadmap from the results panel into Notion, Sheets, or your project tracker.',
      },
      {
        q: 'Is ownership verification required?',
        a: 'No. Enter a public URL. Pages behind login cannot be audited.',
      },
    ],
  },
  'robots-txt-tool': {
    title: 'Robots.txt Generator & Tester',
    description:
      'Free robots.txt generator and tester from Zetawala. Create allow/disallow rules with a sitemap reference, or fetch a live robots.txt and test whether a path is allowed for Googlebot or another user-agent—so you avoid blocking CSS, JS, or key sections by mistake.',
    example: {
      input: 'Mode: test · URL: https://example.com · Path: /admin/ · UA: Googlebot',
      output: 'robots.txt accessible · Test /admin/: blocked · Test /products/: allowed · Sitemaps listed',
    },
    faqs: [
      {
        q: 'Does robots.txt keep pages out of Google’s index?',
        a: 'No. It controls crawling. Use noindex (and Search Console removals when needed) to manage indexing.',
      },
      {
        q: 'What does generate mode create?',
        a: 'A starter robots.txt (or your custom rules) with Allow/Disallow examples and a Sitemap line pointing at /sitemap.xml on your origin.',
      },
      {
        q: 'Can I test Googlebot specifically?',
        a: 'Yes. Test mode evaluates a path against the parsed robots.txt for the user-agent you choose, including Googlebot.',
      },
      {
        q: 'Where must robots.txt live?',
        a: 'At the site root only—e.g. https://yoursite.com/robots.txt.',
      },
      {
        q: 'Should I disallow /wp-admin/?',
        a: 'Often yes for WordPress admin paths, but never block CSS/JS assets required for rendering.',
      },
      {
        q: 'Is the robots.txt generator free?',
        a: 'Yes. Generate and test modes are free on Zetawala for public sites.',
      },
    ],
  },
  'header-meta-inspector': {
    title: 'Meta Tags Checker – Headers & Social Tags',
    description:
      'Free meta tags checker from Zetawala. Inspect title, meta description, robots, canonical, viewport, charset, Open Graph, and Twitter Card tags from a public URL fetch—one structured report for SEO snippets and social previews.',
    example: {
      input: 'URL: https://example.com/article',
      output: 'Title + description set · canonical present · og:title OK · twitter:card summary_large_image · viewport set',
    },
    faqs: [
      {
        q: 'What meta tags does this inspector show?',
        a: 'Title, description, robots, canonical, language, charset, viewport, Open Graph, and Twitter tags parsed from the fetched HTML.',
      },
      {
        q: 'Why check Open Graph tags?',
        a: 'OG tags control how links appear when shared on Facebook, LinkedIn, and many other platforms.',
      },
      {
        q: 'Are Twitter Cards separate from Open Graph?',
        a: 'Twitter may fall back to OG tags, but dedicated twitter: tags give finer control over card type and previews.',
      },
      {
        q: 'Does a missing viewport meta hurt SEO?',
        a: 'Indirectly. Mobile-friendly rendering depends on viewport settings and affects UX and mobile indexing quality.',
      },
      {
        q: 'Do I need to verify ownership?',
        a: 'No. Paste any public URL. The tool fetches headers and HTML available without login.',
      },
      {
        q: 'Is AI used here?',
        a: 'No. The meta tags checker reports deterministic parse results from the live page fetch.',
      },
    ],
  },
  'traffic-revenue': {
    title: 'Traffic Revenue Calculator – Free Estimator',
    description:
      'Free traffic revenue calculator from Zetawala. Estimate organic visits’ ad revenue potential from monthly visits, pages per visit, and RPM—with low/typical/high ranges and clearly labeled assumptions (not Analytics or AdSense verification).',
    example: {
      input: 'Visits: 50,000/mo · Pages/visit: 1.5 · RPM: $8',
      output: 'Pageviews: 75,000 · Revenue low/typical/high from RPM bands · Labels: estimated, not verified AdSense',
    },
    faqs: [
      {
        q: 'Are traffic and revenue numbers guaranteed?',
        a: 'No. All figures are illustrative estimates from your inputs. They are not verified Google Analytics or AdSense data.',
      },
      {
        q: 'How is ad revenue estimated?',
        a: 'Pageviews ≈ visits × pages per visit; revenue ≈ (pageviews / 1000) × RPM, with low/typical/high RPM multipliers.',
      },
      {
        q: 'What RPM should I enter?',
        a: 'Use your network’s historical RPM when possible. Otherwise start with a conservative RPM for your niche and geo.',
      },
      {
        q: 'Does this include affiliate or product revenue?',
        a: 'The model focuses on RPM-style ad revenue. For affiliate or e-commerce, use SEO ROI or Content ROI with value-per-conversion inputs.',
      },
      {
        q: 'Why are assumptions labeled?',
        a: 'Transparent labels prevent overconfidence and make scenario comparisons honest when you change visits or RPM.',
      },
      {
        q: 'Is the traffic revenue calculator free?',
        a: 'Yes. It runs instantly in the browser/API with your numbers—no site crawl required.',
      },
    ],
  },
  'health-score': {
    title: 'SEO Health Score – Free Site Grade',
    description:
      'Free SEO health score calculator from Zetawala. Crawl a public sample, compute category scores for technical and content signals, optionally blend in PageSpeed performance, and get an overall SEO health score—clearly labeled as a Zetawala estimate, not an official Google metric. AI only interprets measured issues.',
    example: {
      input: 'URL: https://example.com/',
      output: 'Overall 78/100 · Technical/Content categories · Performance from PSI when available · Top fixes from critical list',
    },
    faqs: [
      {
        q: 'Is the SEO health score official Google data?',
        a: 'No. It is a Zetawala analytical estimate from crawled page signals (and PageSpeed when available)—not a Google ranking score.',
      },
      {
        q: 'How is the overall score calculated?',
        a: 'Deterministically from audit categories. When mobile PageSpeed performance is available, it is blended into the overall score; otherwise the audit overall is used.',
      },
      {
        q: 'What is a good SEO health score?',
        a: 'Above ~80 is strong; 60–80 usually means actionable issues remain; below 60 suggests major technical or content fixes.',
      },
      {
        q: 'Does AI set the health score?',
        a: 'No. The score is computed first. AI only summarizes and suggests improve-first steps from the measured critical issues.',
      },
      {
        q: 'Can I compare two websites?',
        a: 'Run the tool on each public URL separately and compare overall and category breakdowns.',
      },
      {
        q: 'Should I rerun after fixes?',
        a: 'Yes. Rerunning validates improvements and surfaces the next priority warnings.',
      },
    ],
  },
  'keyword-density': {
    title: 'Keyword Density Checker – Free SEO Tool',
    description:
      'Free keyword density checker from Zetawala. Analyze 1–3 word phrase frequency from a public URL or pasted text, spot overused terms (high density warnings), and balance primary keywords without stuffing—deterministic counts, no invented frequencies.',
    example: {
      input: 'Text or URL with repeated “SEO tools” phrases',
      output: 'Top 1-grams/2-grams/3-grams with density % · Overused terms ≥3% flagged · Stuffing judgment note',
    },
    faqs: [
      {
        q: 'Is there an ideal keyword density percentage?',
        a: 'No fixed target. Write for readers. Very high repetition can look like stuffing; Zetawala flags terms at roughly 3%+ density for review.',
      },
      {
        q: 'Can I check a URL or paste text?',
        a: 'Yes. Provide a public URL (fetched text/title/headings) or paste copy directly. One of the two is required.',
      },
      {
        q: 'Why check 2–3 word phrases?',
        a: 'Multi-word phrases show topical focus beyond single keywords and help you see natural long-tail usage.',
      },
      {
        q: 'Does keyword density alone rank pages?',
        a: 'No. Relevance, helpful content, authority, and UX matter far more than raw repetition.',
      },
      {
        q: 'Can I analyze competitor pages?',
        a: 'If the page is publicly fetchable, paste the URL. Blocked or private pages will not return text.',
      },
      {
        q: 'Is AI used in density counts?',
        a: 'No. Phrase counts and densities are deterministic. Use judgment on any overuse warnings.',
      },
    ],
  },
  'seo-roi': {
    title: 'SEO ROI Calculator – Free Return Estimator',
    description:
      'Free SEO ROI calculator from Zetawala. Estimate organic marketing return from monthly SEO investment, organic sessions, conversion rate, lead-to-customer rate, and average order value—deterministic math with an illustrative disclaimer, not verified Analytics revenue.',
    example: {
      input: 'Cost $500 · Sessions 2,000 · Conv 2% · AOV $45 · Lead→customer 100%',
      output: 'Est. revenue $1,800 · Profit $1,300 · ROI ~260% · Formula shown · Illustrative only',
    },
    faqs: [
      {
        q: 'What costs should I include in SEO ROI?',
        a: 'Tools, agency or freelancer fees, content production, and internal labor allocated to SEO for the month you are modeling.',
      },
      {
        q: 'How is SEO ROI calculated?',
        a: 'Revenue ≈ sessions × conversion rate × lead-to-customer rate × AOV; ROI = (revenue − investment) / investment. All inputs are yours.',
      },
      {
        q: 'Can I model leads instead of e-commerce sales?',
        a: 'Yes. Treat conversions as leads and set average value (and lead-to-customer rate) to match your funnel.',
      },
      {
        q: 'Are results guaranteed?',
        a: 'No. Outputs are illustrative planning estimates—not verified analytics or promises of traffic.',
      },
      {
        q: 'How long until SEO ROI appears?',
        a: 'Often several months for competitive queries. Use conservative session and conversion assumptions for planning.',
      },
      {
        q: 'Is the SEO ROI calculator free?',
        a: 'Yes. Instant deterministic calculation on Zetawala—no crawl or API key required from you.',
      },
    ],
  },
  'keyword-roi': {
    title: 'Keyword ROI Calculator – Search Value Estimator',
    description:
      'Free keyword ROI calculator from Zetawala. Model monthly and yearly revenue potential from search volume, estimated CTR, conversion rate, and customer value—deterministic prioritization for keyword ROI decisions using your research inputs (not live Google volume fetch).',
    example: {
      input: 'Volume 8,100 · CTR 10% · Conv 3% · Value $32',
      output: 'Est. traffic 810 · Customers ~24 · Monthly revenue ~$778 · Yearly ~$9.3K · Assumptions listed',
    },
    faqs: [
      {
        q: 'Where does search volume come from?',
        a: 'You enter volume from your keyword research tool. The calculator does not fetch live Google Ads or Keyword Planner data.',
      },
      {
        q: 'How is keyword traffic estimated?',
        a: 'Estimated traffic ≈ monthly search volume × CTR. Then customers ≈ traffic × conversion rate; revenue ≈ customers × value.',
      },
      {
        q: 'Should I chase the highest volume keywords first?',
        a: 'Balance volume with difficulty and commercial intent. High volume with weak conversion often loses to mid-volume money terms.',
      },
      {
        q: 'Can I model local keyword ROI?',
        a: 'Yes. Use localized volume estimates and the customer value for that market.',
      },
      {
        q: 'Are these keyword ROI figures verified?',
        a: 'No. They use your volume/CTR/conversion assumptions and are labeled as estimates—not Search Console proof.',
      },
      {
        q: 'Is the keyword ROI tool free?',
        a: 'Yes. Free deterministic keyword ROI math on Zetawala for prioritization worksheets.',
      },
    ],
  },
  'content-roi': {
    title: 'Content ROI Calculator – Blog & Landing Pages',
    description:
      'Free content ROI calculator from Zetawala. Estimate content marketing return from production cost, expected monthly traffic, conversion rate, average value, and months active—compare blog posts, landing pages, and resources with transparent, deterministic ROI math.',
    example: {
      input: 'Cost $400 · Traffic 600/mo · Conv 1.5% · Value $80 · Months 12',
      output: 'Monthly ~$720 · 12-mo revenue ~$8,640 · Profit ~$8,240 · ROI labeled illustrative',
    },
    faqs: [
      {
        q: 'What costs belong in content ROI?',
        a: 'Writing, editing, design, promotion, and tooling allocated to that piece—plus refresh costs if you model multi-year performance.',
      },
      {
        q: 'How do I estimate traffic for new content?',
        a: 'Use keyword ROI inputs or historical results from similar posts on your site. Enter honest, conservative monthly visits.',
      },
      {
        q: 'How is content ROI calculated?',
        a: 'Monthly revenue ≈ traffic × conversion rate × average value; total revenue ≈ monthly × months active; ROI = (total revenue − cost) / cost.',
      },
      {
        q: 'Does evergreen content improve ROI?',
        a: 'Often yes—traffic can compound while the one-time production cost stays fixed. Still model refreshes for competitive topics.',
      },
      {
        q: 'Are content ROI results guaranteed?',
        a: 'No. The model is illustrative from your inputs only—not verified Analytics revenue.',
      },
      {
        q: 'Is the content ROI calculator free?',
        a: 'Yes. Instant free content ROI estimates on Zetawala for blogs, landing pages, and campaigns.',
      },
    ],
  },
};
