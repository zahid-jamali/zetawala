import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import ProductHunt from "../../../models/ProductHunt";

// Initialize DeepSeek API Key safely
const apiKey = process.env.DEEPSEEK_API_KEY;

// Helper to clean potential markdown backticks from text responses before parsing JSON
function parseDeepSeekJson(rawText) {
  try {
    const cleaned = rawText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse DeepSeek output as JSON:", rawText);
    throw new Error("Generative AI did not return a valid JSON structure.");
  }
}

export async function POST(request) {
  try {
    // 1. Check API Key configuration
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "DEEPSEEK_API_KEY is not defined. Please add your DeepSeek API key to your environment variables.",
        },
        { status: 500 },
      );
    }

    // 2. Parse request payload
    const body = await request.json();
    const { action, payload } = body;

    if (!action) {
      return NextResponse.json(
        { error: "Missing action identifier." },
        { status: 400 },
      );
    }

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid payload object." },
        { status: 400 },
      );
    }

    // 3. Define instructions and user prompts based on actions
    let systemInstruction =
      "You are an elite, senior-level data engineer, YouTube growth strategist, and e-commerce growth architect. You act purely as a backend data processor. You output ONLY valid JSON structures that match the exact shape requested by the user. Absolutely no markdown formatting codes like ```json or ```, no introductory sentences, no explanations, and no conversational text are allowed. Return only the raw JSON string.";
    let userPrompt = "";

    switch (action) {
      // --- YOUTUBE AUTOMATION PIPELINE ---
      case "video-ideas": {
        const { niche } = payload;
        if (!niche)
          return NextResponse.json(
            { error: "Missing niche parameter." },
            { status: 400 },
          );

        userPrompt = `Act as a master YouTube Retention Specialist for faceless automation channels. Analyze the niche/category: '${niche}'. 
Generate exactly 7 distinct, hyper-viral, and algorithm-optimized video concepts designed to command high average view duration (AVD). 

Apply these specific behavioral frameworks across the 7 concepts:
1. The Counter-Intuitive Myth (Exposing industry lies).
2. The High-Stakes Mistake (A massive failure or hidden consequence).
3. The Secret Leverage (An obscure tool or strategy yielding 10x results).
4. The Modern Trend (Tapping into a recent cultural shift).

Avoid generic titles or academic summaries. The concepts must be visually marketable for thumbnail generation later. Return ONLY a valid JSON array of strings containing the raw concepts.

Format:
["Concept 1", "Concept 2", "Concept 3", "Concept 4", "Concept 5", "Concept 6", "Concept 7"]`;
        break;
      }

      case "title-generator": {
        const { idea, niche } = payload;
        if (!idea || !niche)
          return NextResponse.json(
            { error: "Missing idea or niche parameter." },
            { status: 400 },
          );

        userPrompt = `Act as an elite YouTube Copywriter specialized in optimizing Click-Through Rate (CTR). Given the raw video idea '${idea}' and the target niche '${niche}', engineer exactly 5 high-converting, clickbait-free, algorithm-favored titles.

Apply these psychological drivers across the variants:
- 1 Variation: Curiosity Gap (Leaves an unanswered tension loop).
- 1 Variation: High Stakes (Uses fear-of-missing-out or an expensive error).
- 1 Variation: Numerical Anchor (Highly specific numbers, percentages, or timeframes).
- 2 Variations: Search-SEO Optimized (Blends heavy search terms naturally with high emotion words).

Keep all variants under 65 characters so they do not truncate on mobile screens. Return ONLY a valid JSON array of strings.

Format:
["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]`;
        break;
      }

      case "hook-architect": {
        const { title } = payload;
        if (!title)
          return NextResponse.json(
            { error: "Missing title parameter." },
            { status: 400 },
          );

        userPrompt = `Act as a YouTube Retention Engineer. Given the video title '${title}', write a premier, hyper-engaging 30-to-45 second video introductory 'Hook' designed to flatten the drop-off curve in the first 30 seconds of video playback.

The hook must include:
1. An open loop (teasing the ultimate payoff at the end).
2. Immediate validation of the title's promise.
3. Rapid pacing instructions (no greetings, no 'welcome back to my channel').

Return ONLY a valid JSON object matching this exact structure:
{
  "toneGuidelines": "Provide explicit audio delivery, vocal pacing, and emotional tone instructions.",
  "script": "Provide the exact word-for-word spoken narrative script with cinematic pacing indicators."
}`;
        break;
      }

      case "description-builder": {
        const { title } = payload;
        if (!title)
          return NextResponse.json(
            { error: "Missing title parameter." },
            { status: 400 },
          );

        userPrompt = `Act as an expert Video SEO Optimizer. Given the video title '${title}', craft a powerful, high-ranking, and natural-sounding YouTube video description optimized for semantic metadata indexing.

Structure the description block to contain:
1. A highly dense, keyword-rich overview paragraph (first 3 sentences optimized for YouTube snippet previews).
2. A bulleted 'What You Will Learn' conceptual outline.
3. Clear placeholder lines for interactive social media links and resource URLs.
4. A cleanly appended block of 3 highly targeted hashtags.

Return ONLY a valid JSON object matching this structure:
{
  "description": "Full multi-line formatted description containing the metadata, structural sections, and placeholders."
}`;
        break;
      }

      case "tags-extractor": {
        const { title } = payload;
        if (!title)
          return NextResponse.json(
            { error: "Missing title parameter." },
            { status: 400 },
          );

        userPrompt = `Act as an algorithmic Search Engine Optimization specialist. Given the video title '${title}', extract and generate exactly 20 high-weight, low-competition, search-mapped keywords for the YouTube tags metadata field.

The list must be split cleanly between:
- 8 Long-Tail Keywords (specific buyer/viewer intent phrases).
- 7 Broad Category Keywords (niche anchoring terms).
- 5 Semantic Variation Keywords (alternative phrases and related sub-topics).

All terms must be strictly under 30 characters each and optimized for automated copy-pasting. Return ONLY a valid JSON object matching this structure:
{
  "tags": ["tag1", "tag2", "tag3", ...]
}`;
        break;
      }

      case "thumbnail-prompt": {
        const { title } = payload;
        if (!title)
          return NextResponse.json(
            { error: "Missing title parameter." },
            { status: 400 },
          );

        userPrompt = `Act as an expert Creative Director and AI Prompt Engineer. Given the video title '${title}', generate exactly 3 highly detailed, compositionally flawless generative art prompts tailored for Midjourney v6 and DALL-E 3.

Each prompt must specify:
1. Visual Subject & Concept (Hyper-expressive faces, high contrast, uncluttered focal elements).
2. Style and Medium (Cinematic realism, high-impact commercial photography, intense 3D rendering).
3. Technical Modifiers (Aspect ratios, focal length like 85mm lens, dramatic chiaroscuro studio lighting, color grading palettes like neon cyber, deep amber, high contrast teal).
4. No text on image (explicit instructions to avoid AI garbled text artifacts).

Return ONLY a valid JSON array of objects:
[
  {
    "prompt": "Full descriptive text prompt with lighting, mood, camera angles, and rendering style instructions.",
    "psychologicalTrigger": "Deep analysis of the visual cognitive triggers, curiosity loops, and color theory reasons that force the viewer to click."
  },
  {
    "prompt": "...",
    "psychologicalTrigger": "..."
  },
  {
    "prompt": "...",
    "psychologicalTrigger": "..."
  }
]`;
        break;
      }

      case "script-master": {
        const { title, duration } = payload;
        if (!title || !duration)
          return NextResponse.json(
            { error: "Missing title or duration parameter." },
            { status: 400 },
          );

        if (duration === "shorts") {
          userPrompt = `Act as a Master Documentarian and Scriptwriter for automated vertical channels (YouTube Shorts / TikTok / Reels). Given the video title '${title}', write a high-energy, fast-paced vertical video script under 60 seconds (total length ~130-150 words).

Keep the content extremely punchy, starting with a 3-second visual/vocal hook to stop the scroll, delivering 2 rapid-fire key facts or points, and ending with a loop-friendly call-to-action out-script.

Return ONLY a valid JSON object matching this exact schema:
{
  "introduction": "High-energy scroll-stopping opening hook and script intro (first 5-10 seconds of runtime).",
  "bodyPoints": [
    {
      "sectionTitle": "Core Short Fact / Point",
      "content": "Rapid-fire narration content delivering the main value payload of the vertical short."
    }
  ],
  "outro": "Loop-friendly, high-impact out-script designed to loop smoothly back to the intro hook."
}`;
        } else {
          userPrompt = `Act as a Master Documentarian and Scriptwriter for automated faceless channels. Given the video title '${title}' and requested length of '${duration}' minutes, write a comprehensive, elite, word-for-word YouTube narration script.

The script must be optimized for the calculated length (assuming a natural pacing of ~150 words per minute, generating approximately ${duration * 150} words in total). Maintain maximum viewer retention by structuring content with zero fluff, zero introductory throat-clearing, high information density, and seamless transitions between subtopics.

Return ONLY a valid JSON object matching this exact schema:
{
  "introduction": "Word-for-word spoken narrative introductory hook matching the first 45 seconds of runtime.",
  "bodyPoints": [
    {
      "sectionTitle": "Sub-Hook / Pillar Point 1 Title",
      "content": "Word-for-word immersive, informational storytelling narrative content for this dynamic section."
    },
    {
      "sectionTitle": "Pillar Point 2 Title",
      "content": "Word-for-word immersive, informational storytelling narrative content for this dynamic section."
    }
  ],
  "outro": "High-impact, rapid call-to-action out-script urging viewers to watch the next recommended video immediately."
}`;
        }
        break;
      }

      // --- DARAZ ELITE HUNTING ENGINE ---
      case "product-hunting": {
        const { seed } = payload;
        if (!seed)
          return NextResponse.json(
            { error: "Missing seed parameter." },
            { status: 400 },
          );

        userPrompt = `Act as a top 1% Private Label (PL) and FBD (Fulfilled by Daraz) Product Research Expert operating within the Pakistani e-commerce ecosystem. Given the seed product niche or keyword query '${seed}', simulate a comprehensive live product market audit on Daraz.pk.

Analyze local competitive saturation, supplier dynamics, and historical local retail trends to output a highly actionable product launch report.

Return ONLY a valid JSON object containing this exact data matrix:
{
  "marketDemandScore": {
    "score": 88,
    "reasoning": "Detailed breakdown of localized purchase velocity, seasonality trends in Pakistan, and search volume signals."
  },
  "competitionLevel": {
    "level": "Medium",
    "reasoning": "Granular analysis of active seller count, average listing age, standard review tallies, and overall quality of competitor product listings."
  },
  "estimatedProfitMargin": "Comprehensive financial matrix calculating estimated landed cost from local wholesale hubs (Shah Alam Market, Bolton Market) or international sourcing (Alibaba/1688) against common Daraz commission percentages, category tax structures, packaging costs, and delivery weight tiers.",
  "winningCriteria": "Strategic operational blueprint highlighting critical product visual differentiators, listing strategies, bundle options, or fast-shipping models required to dominate the first page.",
  "sourcingTips": "Hyper-local sourcing instructions (naming specific cities or markets like Lahore/Karachi/Faisalabad clusters) along with wholesale sourcing methodologies.",
  "customerPainPoints": [
    "Critical defect or packaging flaw extracted from analyzing competitive listing 1-star reviews.",
    "Delivery or product misrepresentation complaint common to this category.",
    "Functional expectation mismatch commonly highlighted by local consumers."
  ]
}`;
        break;
      }

      case "roman-urdu-keywords": {
        const { product } = payload;
        if (!product)
          return NextResponse.json(
            { error: "Missing product parameter." },
            { status: 400 },
          );

        userPrompt = `Act as a specialized E-Commerce SEO Specialist focusing on localized consumer behavior in South Asia. Given the specific product query '${product}', generate exactly 20 highly search-indexed keywords optimized exclusively for the Daraz.pk search engine algorithm.

The keyword array must perfectly map to how consumers in Pakistan actually type inside the search bar, reflecting real bilingual search behavior:
- 7 Roman Urdu Keywords (e.g., "baal sidha karne wala", "chota iron", "kapre khareedne wali machine").
- 7 Hybrid Blends (English product nouns paired with Urdu helper words, e.g., "hair trimmer for men low price", "kitchen gadgets achay wale").
- 6 High-Intent English Keywords (terms used by high-converting local buyers, e.g., "premium wireless earbuds", "portable study lamp").

Ensure accurate localized spelling variations to capture maximum hidden search traffic. Return ONLY a valid JSON array of strings.

Format:
["keyword 1", "keyword 2", "keyword 3", ...]`;
        break;
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 },
        );
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        response_format: {
          type: "json_object",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error response:", errorText);
      throw new Error(
        `DeepSeek API returned error code ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      throw new Error("DeepSeek API returned an empty choices array.");
    }

    const text = data.choices[0].message.content;
    const parsedData = parseDeepSeekJson(text);

    // MongoDB logging for Daraz Product Hunting
    if (action === "product-hunting") {
      try {
        await dbConnect();
        const score = parsedData.marketDemandScore?.score || 0;
        await ProductHunt.create({
          query: payload.seed,
          marketDemandScore: score,
          competitionLevel: parsedData.competitionLevel?.level || "Medium",
          estimatedProfitMargin: parsedData.estimatedProfitMargin || "",
          winningCriteria: parsedData.winningCriteria || "",
          sourcingTips: parsedData.sourcingTips || "",
          customerPainPoints: parsedData.customerPainPoints || [],
          isTrending: score >= 80,
        });
        console.log(
          `Product hunt logged successfully. Score: ${score}, Trending: ${score >= 80}`,
        );
      } catch (dbErr) {
        console.error("Failed to log product hunt to MongoDB:", dbErr);
      }
    }

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("Error in API generation handler:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message || "Server error encountered during output generation.",
      },
      { status: 500 },
    );
  }
}
