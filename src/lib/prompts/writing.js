/**
 * AI Writing & Language Tools — DeepSeek prompt templates.
 * Each action returns a prompt that requests a specific JSON shape.
 */

function langName(code) {
  if (code === 'es') return 'Spanish';
  if (code === 'ur') return 'Urdu';
  return 'English';
}

function clampText(text, max = 12000) {
  const t = String(text || '').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}\n\n[Truncated for token limits]`;
}

export function getWritingPrompt(action, payload = {}) {
  const text = clampText(payload.text);
  const language = payload.language || 'en';
  const lang = langName(language);

  switch (action) {
    case 'ai-humanizer': {
      if (!text) return null;
      return `Act as an expert human editor. Rewrite the following ${lang} text so it sounds naturally human-written: varied sentence length, natural transitions, fewer formulaic AI patterns, preserve meaning and facts.

TEXT:
"""
${text}
"""

Return ONLY valid JSON:
{
  "humanizedText": "full rewritten text",
  "readabilityScore": 0-100,
  "humanizationScore": 0-100,
  "wordCount": number,
  "characterCount": number,
  "notes": ["brief change notes"]
}`;
    }

    case 'ai-content-detector': {
      if (!text) return null;
      return `Act as a cautious AI-writing analyst. Estimate whether the following ${lang} text appears AI-generated vs human-written. This is an ESTIMATE only — never claim certainty. Analyze sentence patterns, repetition, predictability, and stylistic uniformity.

TEXT:
"""
${text}
"""

Return ONLY valid JSON:
{
  "aiPercentage": 0-100,
  "humanPercentage": 0-100,
  "confidenceScore": 0-100,
  "disclaimer": "short disclaimer that this is an estimate not forensic proof",
  "sentenceAnalysis": [
    { "sentence": "...", "label": "likely-ai|likely-human|mixed", "reason": "short" }
  ],
  "summary": "2-3 sentence overview"
}`;
    }

    case 'plagiarism-checker': {
      if (!text) return null;
      const reference = clampText(payload.referenceText || '', 8000);
      return `Act as a local document similarity analyst. This is NOT a web-wide plagiarism search. Compare the primary text for internal repetition and${reference ? ' against the optional reference document' : ' self-similarity / boilerplate patterns'}. Be transparent that results are local/document-level estimates only.

PRIMARY TEXT (${lang}):
"""
${text}
"""
${reference ? `\nREFERENCE DOCUMENT:\n"""\n${reference}\n"""\n` : ''}

Return ONLY valid JSON:
{
  "mode": "local-document-comparison",
  "disclaimer": "This is local similarity analysis, not internet-wide plagiarism detection.",
  "similarityPercentage": 0-100,
  "highlightedSections": [
    { "excerpt": "...", "issue": "repeated|similar-to-reference|boilerplate", "note": "short" }
  ],
  "sourceMatches": [
    { "label": "Self-repetition|Reference document|Common phrasing", "overlapEstimate": "low|medium|high", "snippet": "..." }
  ],
  "summary": "plain-language findings"
}`;
    }

    case 'grammar-checker': {
      if (!text) return null;
      return `Act as a professional ${lang} proofreader. Find grammar, spelling, punctuation, and style issues. Provide a fully corrected version plus actionable suggestions the user can accept or reject.

TEXT:
"""
${text}
"""

Return ONLY valid JSON:
{
  "correctedText": "full corrected text",
  "suggestions": [
    {
      "id": "s1",
      "type": "grammar|spelling|punctuation|style",
      "original": "exact phrase",
      "suggestion": "replacement",
      "explanation": "why",
      "severity": 0
    }
  ],
  "summary": "brief overview of issues found"
}`;
    }

    case 'paraphrasing-tool': {
      if (!text) return null;
      const mode = payload.mode || 'standard';
      return `Act as an expert paraphraser. Rewrite the following ${lang} text in "${mode}" mode (standard|fluency|formal|creative|academic). Preserve meaning; do not invent facts.

TEXT:
"""
${text}
"""

Return ONLY valid JSON:
{
  "paraphrasedText": "rewritten text",
  "mode": "${mode}",
  "wordCount": number,
  "characterCount": number,
  "changesOverview": "1-2 sentences on what changed"
}`;
    }

    case 'roman-urdu-to-urdu': {
      if (!text) return null;
      return `Act as a native Urdu linguist. Convert the following Roman Urdu into correct Urdu script (Arabic script). Keep meaning, names, and numbers accurate. Prefer natural modern Pakistani Urdu.

ROMAN URDU:
"""
${text}
"""

Return ONLY valid JSON:
{
  "urduText": "اردو متن",
  "characterCount": number,
  "notes": ["optional clarifications"]
}`;
    }

    case 'urdu-to-roman-urdu': {
      if (!text) return null;
      const style = payload.style || 'standard';
      return `Act as a native Pakistani transliteration expert. Convert the following Urdu script into Roman Urdu using "${style}" style (standard|phonetic|casual). Be consistent and readable for WhatsApp/social users.

URDU:
"""
${text}
"""

Return ONLY valid JSON:
{
  "romanUrduText": "roman urdu output",
  "style": "${style}",
  "characterCount": number,
  "notes": ["optional"]
}`;
    }

    case 'roman-urdu-grammar': {
      if (!text) return null;
      return `Act as a Roman Urdu editor for Pakistani audiences. Correct spelling and grammar in the Roman Urdu text. Provide corrected version and a side-by-side friendly comparison list.

ROMAN URDU:
"""
${text}
"""

Return ONLY valid JSON:
{
  "originalText": "echo original",
  "correctedText": "improved roman urdu",
  "suggestions": [
    { "original": "...", "corrected": "...", "reason": "spelling|grammar|clarity" }
  ],
  "summary": "brief"
}`;
    }

    case 'ai-text-summarizer': {
      if (!text) return null;
      const length = payload.length || 'medium';
      return `Act as a precise summarizer. Summarize the following ${lang} article/text at "${length}" length (short|medium|detailed). Keep facts accurate; no invented claims.

TEXT:
"""
${text}
"""

Return ONLY valid JSON:
{
  "shortSummary": "1-3 sentences",
  "bulletSummary": ["bullet 1", "bullet 2", "bullet 3"],
  "keyPoints": ["point 1", "point 2", "point 3"],
  "length": "${length}",
  "wordCountOriginal": number
}`;
    }

    case 'ai-rewrite-tool': {
      if (!text) return null;
      const mode = payload.mode || 'professional';
      return `Act as an expert rewriting editor. Rewrite the following ${lang} text in "${mode}" mode (shorter|longer|professional|friendly|seo). Preserve core meaning. For SEO mode, improve clarity and natural keyword flow without stuffing.

TEXT:
"""
${text}
"""

Return ONLY valid JSON:
{
  "rewrittenText": "full rewrite",
  "mode": "${mode}",
  "wordCount": number,
  "characterCount": number,
  "notes": ["what changed"]
}`;
    }

    default:
      return null;
  }
}
