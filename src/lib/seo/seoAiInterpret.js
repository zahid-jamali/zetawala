/**
 * DeepSeek interpretation for SEO audits — metrics must already be computed.
 */

const apiKey = process.env.DEEPSEEK_API_KEY;

function parseJson(raw) {
  return JSON.parse(
    raw
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim(),
  );
}

export async function interpretSeoInsights({
  task,
  metricsPayload,
  instruction,
}) {
  if (!apiKey) {
    return {
      ok: false,
      error:
        "AI interpretation unavailable (missing DEEPSEEK_API_KEY). Deterministic results are still shown.",
    };
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-flash",
        messages: [
          {
            role: "system",
            content:
              "You are a senior technical SEO advisor for Zetawala. Interpret ONLY the provided metrics JSON. Never invent crawl results, HTTP statuses, scores, or traffic numbers. Return valid JSON only.",
          },
          {
            role: "user",
            content: `Task: ${task}\n${instruction}\n\nMETRICS:\n${JSON.stringify(metricsPayload).slice(0, 14000)}`,
          },
        ],
        temperature: 0.35,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        error:
          "AI interpretation failed. Deterministic SEO results are still available.",
      };
    }
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) return { ok: false, error: "Empty AI response." };
    return { ok: true, data: parseJson(text) };
  } catch (err) {
    console.error("SEO AI interpret error:", err);
    return { ok: false, error: err.message || "AI interpretation error." };
  }
}
