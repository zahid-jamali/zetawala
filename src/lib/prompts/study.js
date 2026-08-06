/**
 * AI Study tools — DeepSeek prompt templates.
 */

function clamp(text, max = 14000) {
  const t = String(text || '').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}\n\n[Truncated for token limits]`;
}

export function getStudyPrompt(action, payload = {}) {
  switch (action) {
    case 'ai-notes-generator': {
      const topic = String(payload.topic || '').trim();
      const level = String(payload.level || 'High School').trim();
      if (!topic) return null;
      return `Act as an expert educator. Create complete study notes on "${topic}" for level "${level}".

Return ONLY valid JSON:
{
  "title": "...",
  "level": "${level}",
  "notes": "full structured notes with markdown-style headings as plain text",
  "keyPoints": ["...", "..."],
  "examples": ["...", "..."],
  "importantConcepts": ["...", "..."],
  "wordCount": number
}`;
    }

    case 'ai-quiz-generator': {
      const topic = String(payload.topic || '').trim();
      const difficulty = payload.difficulty || 'medium';
      const count = Math.min(20, Math.max(3, Number(payload.count) || 5));
      if (!topic) return null;
      return `Act as a quiz designer. Create ${count} multiple-choice questions on "${topic}" at ${difficulty} difficulty.

Return ONLY valid JSON:
{
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "q1",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "why the answer is correct"
    }
  ]
}`;
    }

    case 'pdf-to-quiz': {
      const text = clamp(payload.text);
      const count = Math.min(15, Math.max(3, Number(payload.count) || 8));
      if (!text) return null;
      return `Act as an educator. From the following PDF text, generate ${count} multiple-choice practice questions grounded ONLY in the content. Do not invent facts not present.

PDF TEXT:
"""
${text}
"""

Return ONLY valid JSON:
{
  "source": "pdf",
  "questions": [
    {
      "id": "q1",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "..."
    }
  ]
}`;
    }

    case 'ai-flashcard-generator': {
      const topic = String(payload.topic || '').trim();
      const text = clamp(payload.text || '', 10000);
      const count = Math.min(30, Math.max(6, Number(payload.count) || 12));
      if (!topic && !text) return null;
      return `Act as a study coach. Create ${count} flashcards ${topic ? `about "${topic}"` : 'from the provided source text'}.

${text ? `SOURCE:\n"""\n${text}\n"""\n` : ''}

Return ONLY valid JSON:
{
  "cards": [
    { "id": "c1", "front": "question or term", "back": "answer or definition" }
  ]
}`;
    }

    case 'youtube-study-notes': {
      const title = String(payload.videoTitle || 'YouTube video').trim();
      const transcript = clamp(payload.transcript, 16000);
      if (!transcript) return null;
      return `Act as an academic note-taker. Using ONLY the transcript from YouTube video "${title}", produce study notes, summary, key points, and a short quiz. Do not invent content not in the transcript.

TRANSCRIPT:
"""
${transcript}
"""

Return ONLY valid JSON:
{
  "videoTitle": "${title.replace(/"/g, '')}",
  "notes": "structured notes",
  "summary": "concise summary",
  "keyPoints": ["...", "..."],
  "quiz": [
    {
      "id": "q1",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "..."
    }
  ]
}`;
    }

    case 'ai-assignment-generator': {
      const topic = String(payload.topic || '').trim();
      const wordCount = Math.min(3000, Math.max(300, Number(payload.wordCount) || 800));
      if (!topic) return null;
      return `Act as an academic writing assistant. Create a structured assignment on "${topic}" targeting about ${wordCount} words. Include clear headings, body sections, a references section (plausible academic-style placeholders labeled as examples), and a conclusion. Educational use only.

Return ONLY valid JSON:
{
  "title": "...",
  "wordCountTarget": ${wordCount},
  "assignment": "full assignment text with headings",
  "sections": ["Introduction", "...", "Conclusion", "References"],
  "references": ["Example reference 1", "Example reference 2"]
}`;
    }

    case 'ai-homework-solver': {
      const question = String(payload.question || '').trim();
      if (!question) return null;
      return `Act as a patient tutor. Solve the homework question with clear educational step-by-step reasoning. Prefer teaching over dumping only the final answer. If the question is ambiguous, state assumptions.

QUESTION:
"""
${question}
"""

Return ONLY valid JSON:
{
  "steps": ["step 1", "step 2"],
  "finalAnswer": "...",
  "keyConcepts": ["...", "..."],
  "alternativeApproach": "optional alternative method or null"
}`;
    }

    default:
      return null;
  }
}
