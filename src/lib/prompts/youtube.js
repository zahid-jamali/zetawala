// YouTube Automation Prompts Generator
export function getYoutubePrompt(action, payload) {
  switch (action) {
    case "video-ideas": {
      const { niche } = payload;
      return `Act as a master YouTube Retention Specialist for faceless automation channels. Analyze the niche/category: '${niche}'. 
Generate exactly 7 distinct, hyper-viral, and algorithm-optimized video concepts designed to command high average view duration (AVD). 

Apply these specific behavioral frameworks across the 7 concepts:
1. The Counter-Intuitive Myth (Exposing industry lies).
2. The High-Stakes Mistake (A massive failure or hidden consequence).
3. The Secret Leverage (An obscure tool or strategy yielding 10x results).
4. The Modern Trend (Tapping into a recent cultural shift).

Avoid generic titles or academic summaries. The concepts must be visually marketable for thumbnail generation later. Return ONLY a valid JSON array of strings containing the raw concepts.

Format:
["Concept 1", "Concept 2", "Concept 3", "Concept 4", "Concept 5", "Concept 6", "Concept 7"]`;
    }

    case "title-generator": {
      const { idea, niche } = payload;
      return `Act as an elite YouTube Copywriter specialized in optimizing Click-Through Rate (CTR). Given the raw video idea '${idea}' and the target niche '${niche}', engineer exactly 5 high-converting, clickbait-free, algorithm-favored titles.

Apply these psychological drivers across the variants:
- 1 Variation: Curiosity Gap (Leaves an unanswered tension loop).
- 1 Variation: High Stakes (Uses fear-of-missing-out or an expensive error).
- 1 Variation: Numerical Anchor (Highly specific numbers, percentages, or timeframes).
- 2 Variations: Search-SEO Optimized (Blends heavy search terms naturally with high emotion words).

Keep all variants under 65 characters so they do not truncate on mobile screens. Return ONLY a valid JSON array of strings.

Format:
["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]`;
    }

    case "hook-architect": {
      const { title } = payload;
      return `Act as a YouTube Retention Engineer. Given the video title '${title}', write a premier, hyper-engaging 30-to-45 second video introductory 'Hook' designed to flatten the drop-off curve in the first 30 seconds of video playback.

The hook must include:
1. An open loop (teasing the ultimate payoff at the end).
2. Immediate validation of the title's promise.
3. Pacing instructions (no greetings, no 'welcome back to my channel').

Return ONLY a valid JSON object matching this exact structure:
{
  "toneGuidelines": "Provide explicit audio delivery, vocal pacing, and emotional tone instructions.",
  "script": "Provide the exact word-for-word spoken narrative script with cinematic pacing indicators."
}`;
    }

    case "description-builder": {
      const { title } = payload;
      return `Act as an expert Video SEO Optimizer. Given the video title '${title}', craft a powerful, high-ranking, and natural-sounding YouTube video description optimized for semantic metadata indexing.

Structure the description block to contain:
1. A highly dense, keyword-rich overview paragraph (first 3 sentences optimized for YouTube snippet previews).
2. A bulleted 'What You Will Learn' conceptual outline.
3. Clear placeholder lines for interactive social media links and resource URLs.
4. A cleanly appended block of 3 highly targeted hashtags.

Return ONLY a valid JSON object matching this structure:
{
  "description": "Full multi-line formatted description containing the metadata, structural sections, and placeholders."
}`;
    }

    case "tags-extractor": {
      const { title } = payload;
      return `Act as an algorithmic Search Engine Optimization specialist. Given the video title '${title}', extract and generate exactly 20 high-weight, low-competition, search-mapped keywords for the YouTube tags metadata field.

The list must be split cleanly between:
- 8 Long-Tail Keywords (specific buyer/viewer intent phrases).
- 7 Broad Category Keywords (niche anchoring terms).
- 5 Semantic Variation Keywords (alternative phrases and related sub-topics).

All terms must be strictly under 30 characters each and optimized for automated copy-pasting. Return ONLY a valid JSON object matching this structure:
{
  "tags": ["tag1", "tag2", "tag3", ...]
}`;
    }

    case "thumbnail-prompt": {
      const { title } = payload;
      return `Act as an expert Creative Director and AI Prompt Engineer. Given the video title '${title}', generate exactly 3 highly detailed, compositionally flawless generative art prompts tailored for Midjourney v6 and DALL-E 3.

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
    }

    case "script-master": {
      const { title, duration } = payload;
      if (duration === "shorts") {
        return `Act as a Master Documentarian and Scriptwriter for automated vertical channels (YouTube Shorts / TikTok / Reels). Given the video title '${title}', write a high-energy, fast-paced vertical video script under 60 seconds (total length ~130-150 words).

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
        return `Act as a Master Documentarian and Scriptwriter for automated faceless channels. Given the video title '${title}' and requested length of '${duration}' minutes, write a comprehensive, elite, word-for-word YouTube narration script.

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
    }

    default:
      return null;
  }
}
