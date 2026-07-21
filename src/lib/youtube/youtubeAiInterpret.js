/**
 * AI interpretation layer for YouTube Intelligence tools.
 * Uses DeepSeek with structured metrics — never as the source of truth for numbers.
 */

const apiKey = process.env.DEEPSEEK_API_KEY;

function parseDeepSeekJson(rawText) {
  const cleaned = rawText
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  return JSON.parse(cleaned);
}

/**
 * @param {object} opts
 * @param {string} opts.task - tool identifier
 * @param {object} opts.metricsPayload - deterministic metrics/evidence
 * @param {string} opts.instruction - what to interpret
 * @returns {Promise<{ ok: boolean, data?: object, error?: string }>}
 */
export async function interpretYouTubeMetrics({ task, metricsPayload, instruction }) {
  if (!apiKey) {
    return {
      ok: false,
      error: 'AI interpretation unavailable (missing DEEPSEEK_API_KEY). Deterministic metrics are still shown.',
    };
  }

  const systemInstruction = `You are a senior YouTube strategist for Zetawala. You ONLY interpret the provided metrics JSON. 
You must NOT invent subscriber counts, view counts, search volumes, competitor lists, or any statistics not present in the input.
If a metric is null/N/A, say data is insufficient — do not guess numbers.
Label insights as interpretive recommendations.
Return ONLY valid JSON matching the schema requested. No markdown.`;

  const userPrompt = `Task: ${task}
Instruction: ${instruction}

METRICS_AND_EVIDENCE (authoritative — do not contradict numbers):
${JSON.stringify(metricsPayload)}

Return ONLY a JSON object.`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek YouTube interpret failure:', errorText);
      return {
        ok: false,
        error: 'AI interpretation failed. Deterministic metrics are still available.',
      };
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      return { ok: false, error: 'AI returned an empty response.' };
    }

    const parsed = parseDeepSeekJson(text);
    return { ok: true, data: parsed };
  } catch (err) {
    console.error('YouTube AI interpret error:', err);
    return {
      ok: false,
      error: err.message || 'AI interpretation error.',
    };
  }
}

/**
 * Optional lightweight candidate niche generation (ideas only — validated later with real YT data).
 */
export async function generateNicheCandidates(profile) {
  if (!apiKey) {
    // Deterministic fallback candidates from interests
    const seeds = (profile.interests || 'general knowledge')
      .split(/[,|/]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);
    return seeds.map((s, i) => ({
      name: `${s} for ${profile.targetAudienceCountry || 'global'} audience`,
      angle: profile.channelType || 'Both',
      reason: 'Fallback candidate from interests (AI unavailable)',
      rankHint: i + 1,
    }));
  }

  const prompt = `Generate 12 distinct YouTube niche candidates for this creator profile. Return ONLY JSON:
{
  "candidates": [
    { "name": "specific niche name", "angle": "faceless|personal|hybrid", "reason": "one line why it fits" }
  ]
}
Profile: ${JSON.stringify(profile)}
Rules: niches must be specific (not "gaming"). Respect topicsToAvoid. Prefer niches testable via YouTube search.`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content:
              'You generate niche candidate names only. Do not invent market statistics or search volumes. Return valid JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) throw new Error('candidate generation failed');
    const data = await response.json();
    const parsed = parseDeepSeekJson(data.choices[0].message.content);
    return Array.isArray(parsed.candidates) ? parsed.candidates.slice(0, 12) : [];
  } catch (err) {
    console.error('Niche candidate generation failed:', err);
    const seeds = (profile.interests || 'education')
      .split(/[,|/]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);
    return seeds.map((s) => ({
      name: `${s} explained`,
      angle: 'hybrid',
      reason: 'Fallback from interests',
    }));
  }
}
