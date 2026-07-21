export const youtubeSeoData = {
  "niche-finder": {
    title: "YouTube Niche Finder & Recommender",
    description:
      "Zetawala's YouTube Niche Finder is a data-driven discovery workflow—not a prompt box. It builds candidate niches from your interests and skills, samples public YouTube results, calculates opportunity and fit scores, then uses AI only to interpret those metrics. Official search volume is not fabricated; unavailable metrics are labeled N/A.",
    example: {
      input: "Interests: personal finance, habits | Skills: research, narration | Country: Pakistan | Faceless | Goal: Make money",
      output: "Top niche: 'Pakistan Money Habits Explained' · Fit Score 78/100 · Demand proxy 72 · Competition 54 · First video ideas grounded in sample patterns",
    },
    faqs: [
      {
        q: "Does this tool invent search volume?",
        a: "No. YouTube Data API does not provide keyword search volume. Zetawala uses view/competition proxies and labels unavailable metrics as N/A.",
      },
      {
        q: "Is the Fit Score an official YouTube metric?",
        a: "No. It is a Zetawala Score combining sampled public performance signals with your creator profile fit.",
      },
      {
        q: "Who should use Niche Finder?",
        a: "New creators choosing a first niche, and existing creators exploring adjacent niches before investing in content production.",
      },
      {
        q: "What happens after I pick a niche?",
        a: "Validate it with Niche Opportunity Analyzer, estimate earnings with Revenue Calculator, then move into Video Idea Generator and the content creation pipeline.",
      },
      {
        q: "Why is AI used at all?",
        a: "AI interprets calculated metrics and personalizes recommendations. It is not allowed to invent statistics that were not computed from public data.",
      },
    ],
  },
  "niche-opportunity": {
    title: "YouTube Niche Opportunity Analyzer",
    description:
      "Validate a specific niche by searching YouTube, sampling relevant videos and channels, calculating median/average performance, competition density, content-gap proxies, and a deterministic Opportunity Score with a clear verdict threshold.",
    example: {
      input: "Niche: 'Faceless History Documentaries' | Format: Long-form",
      output: "Opportunity Score 67 · Verdict: Strong Opportunity · Median views (sample): 18.4K · Competition: Medium-High",
    },
    faqs: [
      {
        q: "How is the Opportunity Score calculated?",
        a: "Deterministically from weighted demand, competition, content gap, monetization proxy, growth proxy, and entry difficulty. AI does not set the score.",
      },
      {
        q: "Why use median views?",
        a: "Medians reduce distortion from a few viral outliers so your niche read is more realistic.",
      },
      {
        q: "Can a high score guarantee success?",
        a: "No. It estimates market conditions from a public sample. Execution, packaging, and consistency still matter.",
      },
      {
        q: "What if YouTube returns few results?",
        a: "The tool reports insufficient data rather than inventing a market. Try a clearer niche phrase.",
      },
      {
        q: "What should I do next?",
        a: "Estimate revenue potential, audit competitor channels with Channel Health Analyzer, then generate content with the YouTube Automation pipeline.",
      },
    ],
  },
  "channel-health": {
    title: "YouTube Channel Health Analyzer",
    description:
      "Paste a channel URL or @handle to analyze recent uploads, consistency, engagement, momentum, top vs underperforming videos, and a Zetawala Channel Health Score—clearly labeled as an analytical estimate, not an official YouTube metric.",
    example: {
      input: "https://youtube.com/@example · Last 20 videos",
      output: "Health Score 71 · Momentum 1.3× · Median views 9.2K · Consistency strong · Recommendations tied to measured gaps",
    },
    faqs: [
      {
        q: "Is Channel Health Score official?",
        a: "No. It is a Zetawala analytical estimate from publicly available YouTube data.",
      },
      {
        q: "How many videos are analyzed?",
        a: "By default the last 20 uploads (configurable to 10 or 30) to protect API quota while staying useful.",
      },
      {
        q: "Can it read YouTube Studio private analytics?",
        a: "No. Only public Data API fields are used unless you later connect OAuth (not required for this tool).",
      },
      {
        q: "What is momentum ratio?",
        a: "A Zetawala Calculation comparing recent median views to older median views in the sampled window.",
      },
      {
        q: "What is the next step after a channel audit?",
        a: "Open Video Performance Analyzer on a top or weak video, then use Title/Hook/Script tools to improve the next upload.",
      },
    ],
  },
  "video-performance": {
    title: "YouTube Video Performance Analyzer",
    description:
      "Analyze one video against its channel baseline: relative views, engagement rates, views-per-subscriber, performance score, caveats for brand-new uploads, and AI next-video opportunities grounded in observed data.",
    example: {
      input: "https://youtube.com/watch?v=VIDEO_ID",
      output: "Performance Score 64 · 1.4× channel median · Engagement 3.1% · 7 follow-up ideas tied to what worked",
    },
    faqs: [
      {
        q: "Why compare to channel median?",
        a: "Absolute view counts mislead across channel sizes. Relative performance shows whether this video beat the channel's typical outcome.",
      },
      {
        q: "What about brand-new videos?",
        a: "Videos under ~2 days get a caveat and tempered score because early views are not comparable to older uploads.",
      },
      {
        q: "Are next video ideas random?",
        a: "No. AI suggestions must reference observed patterns from the analyzed video and channel baseline.",
      },
      {
        q: "Does this replace YouTube Analytics?",
        a: "No. It complements public metrics with Zetawala scoring and workflow links into content tools.",
      },
      {
        q: "What tools should I open next?",
        a: "Video Idea Generator, Title Copywriter, Retention Hook, and Script Writer to act on the diagnosis.",
      },
    ],
  },
  "revenue-calculator": {
    title: "YouTube Revenue Calculator",
    description:
      "A deterministic earnings estimator using Views/1000×RPM with low, typical, and high scenarios. Works without YouTube API or DeepSeek. Estimated RPM bands are labeled as estimates—not official YouTube payouts.",
    example: {
      input: "Monthly views: 100,000 · Long-form · South Asia · Education · Estimated RPM",
      output: "Typical monthly estimate range with low/typical/high scenarios and listed assumptions",
    },
    faqs: [
      {
        q: "Is this revenue guaranteed?",
        a: "No. Estimates are illustrative. Actual earnings vary by geography, niche, ad demand, seasonality, and monetization status.",
      },
      {
        q: "Do I need a YouTube API key for this tool?",
        a: "No. The calculator is fully deterministic and runs without YouTube or DeepSeek.",
      },
      {
        q: "What is RPM?",
        a: "Revenue per mille—estimated earnings per 1,000 views after YouTube's share, used here as a modeling input.",
      },
      {
        q: "Why show low/typical/high?",
        a: "A single point estimate is misleading. Ranges communicate uncertainty honestly.",
      },
      {
        q: "How does this connect to other tools?",
        a: "Use Niche Opportunity Analyzer before estimating, then Channel Health Analyzer to sanity-check whether your real channel can reach those view levels.",
      },
    ],
  },
  "video-ideas": {
    title: "YouTube Video Idea Generator",
    description:
      "Unlock exponential channel growth and dominate your niche with our AI-powered YouTube Video Idea Generator. This advanced SEO tool meticulously analyzes trending search volumes, competitor content gaps, long-tail keyword opportunities, and audience retention metrics to deliver highly searchable, high-CTR video topics. Perfect for content creators, marketers, and brands looking to overcome writer's block, build a profitable content calendar, and leverage data-backed concepts to conquer YouTube search engine rankings and trigger homepage recommendations.",
    example: {
      input: "Niche: 'Pakistan Local E-Commerce Sourcing'",
      output:
        "1. 'I Spent Rs. 50,000 on Daraz Wholesale: Unboxing the Secrets'\n2. 'Top 10 High-Margin Products to Source from Shah Alami Market (2024)'\n3. 'How to Start a Shopify Store in Pakistan with Zero Capital [Step-by-Step]'",
    },
    faqs: [
      {
        q: "How does the YouTube Video Idea Generator find viral topics?",
        a: "Our tool utilizes high-performing keyword clusters, user search intent analysis, and competitor gap tracking to generate proven, engaging content hooks. It cross-references current search trends with historically successful video frameworks tailored specifically to your channel's niche.",
      },
      {
        q: "Why is having unique video ideas important for YouTube SEO?",
        a: "The YouTube algorithm heavily prioritizes audience satisfaction and click-through rates (CTR). Unique, high-intent concepts naturally improve viewer click behavior, extend watch time metrics, and signal the algorithm to push your content to a broader audience via the 'Suggested Videos' feed.",
      },
      {
        q: "Can this tool help generate evergreen YouTube content?",
        a: "Yes. While it identifies trending and viral topics, it also pinpoints high-volume, low-competition evergreen search queries. Evergreen content ensures your channel receives consistent, passive organic traffic for years after the video is published.",
      },
      {
        q: "How do targeted video topics affect YouTube channel monetization?",
        a: "Creating videos around high-CPM (Cost Per Mille) niches and highly targeted commercial search queries attracts premium advertisers. This increases your overall ad revenue and opens doors for lucrative brand sponsorships and affiliate marketing opportunities.",
      },
      {
        q: "What is the difference between high search volume and high-CTR video ideas?",
        a: "High search volume indicates that many people are looking for a topic, while a high-CTR idea is packaged with a compelling psychological hook that forces users to click. Our generator combines both, giving you topics that have high demand and immense clickability.",
      },
    ],
  },
  "title-generator": {
    title: "YouTube Title Copywriter & Optimizer",
    description:
      "Maximize your video click-through rate (CTR) and search visibility with our advanced YouTube Title Generator. A great video is useless if nobody clicks on it. Our tool crafts highly clickable, SEO-optimized titles that perfectly balance human psychological curiosity with algorithm-friendly target keywords. Drive massive organic views, increase your browse feature traffic, and dominate the SERPs (Search Engine Results Pages) without resorting to negative or misleading clickbait.",
    example: {
      input: "Topic: 'Daraz Product Sourcing' | Niche: 'E-commerce'",
      output:
        "1. 'This Rs 100 Daraz Product Made Me Rs 50,000! (Sourcing Secrets)'\n2. 'How to Find Winning Products on Daraz Pakistan (100% Free Strategy)'",
    },
    faqs: [
      {
        q: "What makes a YouTube title rank higher in search results?",
        a: "A high-ranking YouTube title places primary target keywords near the beginning of the text string (front-loading) while utilizing action-oriented, emotional trigger words (like 'Secret', 'Exposed', or 'Free') to entice natural click interactions from human viewers.",
      },
      {
        q: "Should I change my YouTube titles after publishing a video?",
        a: "Absolutely. If a video generates high impressions but suffers from a low CTR (typically below 4-5%), updating the title and thumbnail is known as A/B testing. This can instantly trigger the YouTube algorithm to re-evaluate and boost your video's visibility.",
      },
      {
        q: "What is the optimal length for a YouTube video title in 2024?",
        a: "The ideal length for a YouTube title is between 50 and 60 characters. Keeping your title within this limit ensures it does not get truncated (cut off) on mobile devices or in the suggested videos sidebar, maximizing readability and CTR.",
      },
      {
        q: "How does the title generator balance SEO keywords and clickbait?",
        a: "Our tool is programmed to avoid 'toxic clickbait' (misleading claims). Instead, it uses 'curiosity gaps'—promising valuable information and delivering it. It naturally weaves exact-match keywords into compelling narrative structures to satisfy both the algorithm and the viewer.",
      },
      {
        q: "Can an optimized YouTube title actually increase audience retention?",
        a: "Yes. A highly optimized, accurate title sets the correct viewer expectation. When the video content perfectly matches the promise made in the title, viewers are less likely to click away, leading to higher Average View Duration (AVD).",
      },
    ],
  },
  "hook-architect": {
    title: "Audience Retention Hook Architect",
    description:
      "Stop viewers from scrolling away instantly. The Audience Retention Hook Architect is designed to draft high-impact, psychologically driven spoken narratives that captivate your audience in the critical first 15 to 30 seconds. By establishing an immediate pattern interrupt and promising extreme value, this tool drastically reduces early drop-off rates, skyrockets your Average View Duration (AVD), and provides the strong engagement signals the YouTube algorithm requires to make your video go viral.",
    example: {
      input: "Video Topic: 'How I built a Shopify brand in 30 days'",
      output:
        "Hook Script: '99% of Shopify stores fail in their first month. But this simple 3-step strategy made me Rs. 80,000 in just 30 days—without paid ads or expensive inventory. Here is the exact proof, and how you can copy it today...'",
    },
    faqs: [
      {
        q: "Why are the first 30 seconds of a YouTube video so crucial for SEO?",
        a: "YouTube analytics prove that the most significant viewer drop-off occurs within the first 30 seconds. Securing a strong retention hook directly increases your overall watch time, which is the number one ranking factor for YouTube's recommendation engine.",
      },
      {
        q: "What elements make a highly effective YouTube video hook?",
        a: "A professional video hook must instantly state a high-stakes problem, tease a guaranteed resolution, and offer immediate visual or verbal social proof—all delivered concisely before the viewer has a chance to lose interest.",
      },
      {
        q: "Can I use the Hook Architect for YouTube Shorts and TikTok?",
        a: "Yes! Short-form content relies entirely on the first 3 seconds to prevent the user from scrolling. The Hook Architect generates punchy, high-energy intros perfectly suited for the fast-paced nature of YouTube Shorts, Instagram Reels, and TikTok.",
      },
      {
        q: "How do retention hooks affect YouTube algorithm recommendations?",
        a: "The algorithm rewards videos that keep users on the platform longer. A strong hook prevents 'bouncing.' If your video retains 70% or more of its audience past the one-minute mark, YouTube will aggressively promote it on the homepage.",
      },
      {
        q: "Should I introduce myself in the video hook?",
        a: "No. Long, drawn-out channel intros kill retention. Modern YouTube SEO dictates that you should deliver the core value proposition first (the hook), and seamlessly weave your channel branding or introduction in later after the viewer is invested.",
      },
    ],
  },
  "description-builder": {
    title: "SEO Description Writer",
    description:
      "Generate search-console compliant metadata effortlessly with our YouTube SEO Description Writer. The description box is a massively underutilized SEO asset. Create perfectly structured, long-form descriptions packed with semantic LSI keywords, interactive timestamp chapters, authoritative external links, and strategic call-to-actions (CTAs). Maximize your search visibility on both YouTube's internal search engine and Google Video search results, driving sustained organic traffic and boosting affiliate conversions.",
    example: {
      input: "Title: 'Shah Alami Market Sourcing Guide'",
      output:
        "Description: 'In this complete guide, we explore the best wholesale products in Shah Alami Market Lahore for e-commerce sellers... \n\n🕒 Chapters:\n0:00 - The Reality of Local Sourcing\n1:20 - Best Shops for Electronic Goods\n4:00 - Negotiation Secrets for Wholesalers...'",
    },
    faqs: [
      {
        q: "What is the ideal length for an SEO-optimized YouTube description?",
        a: "An optimized description should be between 250 and 500 words. The critical first three lines (roughly 150 characters) must contain your primary search keywords naturally, as this text displays above the 'Show More' fold in search results.",
      },
      {
        q: "Do video timestamps help with Google search rankings?",
        a: "Absolutely. Timestamp chapters act as localized metadata. They allow Google Search to index specific key moments within your video, displaying them as interactive 'rich snippets' directly in the main Google Search Engine Results Pages (SERPs).",
      },
      {
        q: "How many hashtags should I include in a YouTube description?",
        a: "YouTube allows up to 15 hashtags, but using 3 to 5 highly relevant, broad-niche hashtags is the SEO best practice. Overstuffing hashtags can trigger spam filters and actually harm your video's search ranking.",
      },
      {
        q: "Where should I place my primary target keywords in the description?",
        a: "Primary keywords should appear in the very first sentence. Secondary and long-tail keywords should be naturally sprinkled throughout the descriptive paragraphs and cleverly integrated into your timestamp chapter titles.",
      },
      {
        q: "Can a well-written video description improve affiliate marketing conversions?",
        a: "Yes. A structured description allows you to strategically place affiliate links and CTAs immediately after the primary SEO introduction, making it highly accessible for viewers who want to purchase the products mentioned in the video.",
      },
    ],
  },
  "tags-extractor": {
    title: "Tags & Keyword Extractor",
    description:
      "Uncover hidden search volume and outrank your competitors with our YouTube Tags & Keyword Extractor. Instantly generate high-relevance, low-competition tag recommendations for your YouTube Studio backend. By optimizing your video's hidden metadata with semantic search terms, exact match keywords, and broad match identifiers, you support deep search indexing and drastically increase your chances of appearing in the coveted 'Up Next' and related-video sidebars.",
    example: {
      input: "Video Topic: 'Shopify Pakistan'",
      output:
        "Tags: 'shopify pakistan, shopify dropshipping pakistan 2024, ecommerce business in pakistan, how to start shopify brand, shah alami market wholesale online'",
    },
    faqs: [
      {
        q: "Do YouTube tags still matter for SEO in 2024?",
        a: "While titles and descriptions carry the majority of the SEO weight, tags remain a vital metadata component. They are incredibly useful for capturing traffic from common spelling mistakes, regional synonyms, and localized search queries (such as Roman Urdu phrases).",
      },
      {
        q: "How many tags should I use for a YouTube video?",
        a: "YouTube provides a 500-character limit for tags. It is recommended to use 200-300 characters, focusing on a mix of broad niche tags, exact match keywords directly related to your title, and specific long-tail keyword variations.",
      },
      {
        q: "What is the difference between broad tags and long-tail tags?",
        a: "A broad tag is a general category (e.g., 'ecommerce'), which is highly competitive. A long-tail tag is specific and targeted (e.g., 'how to start ecommerce in Pakistan 2024'), which brings in highly qualified, high-retention search traffic.",
      },
      {
        q: "Can using irrelevant tags hurt my YouTube channel ranking?",
        a: "Yes. Keyword stuffing or using highly searched but irrelevant tags (like trending celebrity names) violates YouTube's metadata policies. It confuses the algorithm, tanks your audience retention, and can lead to channel strikes.",
      },
      {
        q: "How does the Tags Extractor analyze competitor metadata?",
        a: "The tool reverse-engineers the search landscape by identifying which tags top-ranking videos are using to secure their positions. This allows you to adopt proven keyword frameworks and piggyback off their suggested video traffic.",
      },
    ],
  },
  "thumbnail-prompt": {
    title: "AI Thumbnail Prompter",
    description:
      "Transform standard video concepts into irresistible visual masterpieces. The AI Thumbnail Prompter generates expertly engineered prompts for cutting-edge AI image generators like Midjourney, Stable Diffusion, and DALL-E. Stop struggling with complex graphic design software. Create hyper-realistic, high-contrast, perfectly composed thumbnails that leverage color psychology and visual hierarchy to guarantee skyrocketing click-through rates (CTR) and dominate the YouTube homepage grid.",
    example: {
      input: "Concept: 'Rich vs Poor Programmer'",
      output:
        "Prompt: 'A dramatic split-screen portrait. Left side: stressed, exhausted software developer in a dark, messy room. Right side: relaxed, wealthy tech entrepreneur in a luxurious bright penthouse office, cyber neon ambient lighting, 8k resolution, highly detailed, cinematic render --ar 16:9 --v 6.0'",
    },
    faqs: [
      {
        q: "How does an AI thumbnail prompt improve YouTube CTR?",
        a: "AI-guided prompts generate photorealistic, high-contrast visual assets that trigger immediate psychological curiosity. These hyper-optimized images stand out in crowded YouTube recommendation grids, driving significantly more organic clicks than standard screenshots.",
      },
      {
        q: "Which AI image generator is best for YouTube thumbnails?",
        a: "Midjourney (v6) is currently the industry leader for cinematic, highly detailed visual assets. However, DALL-E 3 is excellent for exact text generation and vector-style graphics, making both highly viable depending on your channel's aesthetic.",
      },
      {
        q: "What role does color psychology play in YouTube thumbnails?",
        a: "High-contrast colors (like yellow, red, and electric blue) naturally draw the human eye. Thumbnails that utilize complementary color schemes and bright subjects against dark backgrounds achieve higher visibility on both mobile and desktop screens.",
      },
      {
        q: "Should I include text in my YouTube video thumbnails?",
        a: "Yes, but keep it minimal. Best practices dictate using 3 to 5 bold, highly readable words that complement—not just repeat—the video title. Text should be large enough to read clearly on a small smartphone screen.",
      },
      {
        q: "How does thumbnail quality affect YouTube browse features traffic?",
        a: "Browse features (the homepage) are driven entirely by CTR and broad appeal. A stunning, high-quality thumbnail forces users to stop scrolling, signaling to the algorithm that your content is highly engaging and worthy of wider distribution.",
      },
    ],
  },
  "script-master": {
    title: "Comprehensive Script Writer",
    description:
      "Turn rough ideas into word-for-word, production-ready cinematic scripts. The YouTube Script Master formats your raw concepts into highly engaging, retention-optimized narrative architectures. It seamlessly integrates psychological pacing, designated B-roll cues, emotional transitions, and expert speaker guidance. Eliminate mid-video drop-offs, maintain viewer attention from intro to outro, and seamlessly integrate high-converting call-to-actions (CTAs) that turn casual viewers into loyal, long-term subscribers.",
    example: {
      input: "Topic: 'Shah Alami Wholesale' | Duration: '5 minutes'",
      output:
        "Script Outline: '[Intro - Dramatic hook on camera]: Are you tired of running ads and getting zero sales? Today, we are going deep inside Lahore's biggest hidden goldmine... \n[B-Roll cut to fast-paced, crowded market lanes with energetic background music]...'",
    },
    faqs: [
      {
        q: "How many words should a 10-minute YouTube video script be?",
        a: "At an average, engaging conversational speaking pace (130-150 words per minute), a 10-minute YouTube video requires a well-structured script of approximately 1,300 to 1,500 words.",
      },
      {
        q: "What is the standard structure of a successful YouTube video script?",
        a: "A high-retention script follows a strict framework: 1. The Hook (0:00-0:30), 2. The Setup/Branding (0:30-1:00), 3. The Core Value/Content Delivery (1:00-8:00), and 4. The Outro/Call to Action (8:00-end).",
      },
      {
        q: "How does a well-written script improve audience retention?",
        a: "A professional script eliminates fluff, 'ums,' and dead air. By scripting dynamic pattern interrupts, open loops, and smooth transitions, you keep the viewer's brain constantly engaged, preventing them from clicking off to another video.",
      },
      {
        q: "Where should I place CTAs (Call to Actions) in my video script?",
        a: "Never place your CTA at the very beginning. The best places for CTAs are right after you have delivered a massive piece of value (mid-roll) and during the outro, guiding them to another related video on your channel.",
      },
      {
        q: "Can the Script Master tool write for faceless YouTube channels?",
        a: "Absolutely. The tool can generate narrative structures specifically tailored for voiceovers and documentary-style faceless channels, focusing heavily on visual storytelling cues rather than on-camera personality.",
      },
    ],
  },
  "visuals-recommender": {
    title: "Script Visuals Recommender & Storyboarder",
    description:
      "Accelerate your post-production editing pipeline and elevate your visual storytelling. The Visuals Recommender deeply analyzes your spoken script to suggest dynamic B-roll ideas, precise stock footage search queries, and cutting-edge AI-generation prompts (for tools like Sora or Runway) scene by scene. By introducing constant visual changes and matching imagery perfectly to the narrative context, you reset the viewer's attention span, drastically boosting viewer retention and algorithmic performance.",
    example: {
      input: "Script: 'I started a wholesale business from my tiny bedroom...'",
      output:
        "Scene 1:\n- Visual Idea: Close-up of a laptop screen showing rapidly rising sales charts in a dark room.\n- Stock Keywords: 'ecommerce sales graph rising, analytics on laptop screen close up'\n- AI Gen Prompt: 'A glowing laptop screen displaying green stock growth charts in a cozy, dimly lit bedroom office, warm desk lamp lighting, macro lens, cinematic depth of field, photorealistic --ar 16:9'",
    },
    faqs: [
      {
        q: "How do targeted search keywords save video editing time?",
        a: "By providing pre-optimized, exact-match search strings, video editors can bypass tedious manual searching on stock platforms like Storyblocks, Pexels, or Envato Elements, instantly finding the exact B-roll needed and saving hours of production time.",
      },
      {
        q: "What is B-roll and why is it vital for viewer retention?",
        a: "B-roll is supplemental footage inserted over the main audio track. It acts as a visual pattern interrupt. Because human attention spans are short, showing relevant B-roll prevents the video from becoming a boring 'talking head' presentation.",
      },
      {
        q: "How often should a YouTube video change visual scenes?",
        a: "Modern YouTube editing guidelines suggest a visual change (a cut, zoom, text pop-up, or B-roll insertion) every 3 to 5 seconds. This fast-paced visual stimulation is crucial for retaining younger demographics and mobile viewers.",
      },
      {
        q: "Can the Visuals Recommender help with AI video generation?",
        a: "Yes. It generates highly specific, cinematic text-to-video prompts that can be plugged directly into AI video tools like Runway Gen-2, Pika Labs, or OpenAI's Sora to create custom, hyper-realistic footage that doesn't exist on stock websites.",
      },
      {
        q: "How do dynamic visuals impact the YouTube algorithm?",
        a: "Dynamic visuals directly increase average view duration (AVD). When the algorithm detects that viewers are watching your video all the way through without skipping, it categorizes your content as 'highly engaging' and pushes it to millions of potential new viewers.",
      },
    ],
  },
};
