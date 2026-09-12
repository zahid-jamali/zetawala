import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import ProductHunt from "../../../models/ProductHunt";
import { getUserPrompt } from "../../../lib/promptEngine";

import {
  getClientIp,
  detectBot,
  checkRateLimit,
  verifyTurnstileToken,
} from "../../../lib/security";
import { fetchYouTubeTranscript } from "../../../lib/study/youtubeTranscript";

const apiKey = process.env.DEEPSEEK_API_KEY;

// Clean markdown codes from DeepSeek responses before JSON parsing
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

// POST: API handler routing generation requests to DeepSeek model
export async function POST(request) {
  try {
    const reqHeaders = request.headers;
    const ip = getClientIp(reqHeaders);

    // 1. Scan for bot signatures
    const botCheck = detectBot(reqHeaders);
    if (!botCheck.success) {
      return NextResponse.json(
        { success: false, error: botCheck.error },
        { status: 403 },
      );
    }

    // 2. Enforce IP-based sliding window rate limits
    const limitCheck = checkRateLimit(ip);
    if (!limitCheck.success) {
      return NextResponse.json(
        { success: false, error: limitCheck.error },
        { status: 429 },
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "DEEPSEEK_API_KEY is not defined. Please add it to your environment variables.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { action, payload, securityToken } = body;

    // 3. Verify Turnstile captcha token if configured
    const turnstileCheck = await verifyTurnstileToken(securityToken, ip);
    if (!turnstileCheck.success) {
      return NextResponse.json(
        { success: false, error: turnstileCheck.error },
        { status: 400 },
      );
    }

    if (!action || !payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Missing action identifier or invalid payload parameters." },
        { status: 400 },
      );
    }

    // YouTube study notes: fetch transcript server-side so one Turnstile covers the full flow
    let resolvedPayload = payload;
    if (
      action === "youtube-study-notes" &&
      payload.youtubeUrl &&
      !payload.transcript
    ) {
      try {
        const transcriptData = await fetchYouTubeTranscript(payload.youtubeUrl);
        resolvedPayload = {
          ...payload,
          transcript: transcriptData.transcript,
          videoTitle: payload.videoTitle || transcriptData.videoId,
        };
      } catch (err) {
        return NextResponse.json(
          { success: false, error: err.message || "Transcript fetch failed." },
          { status: 400 },
        );
      }
    }

    // Retrieve corresponding prompt instructions dynamically
    const userPrompt = getUserPrompt(action, resolvedPayload);
    if (!userPrompt) {
      return NextResponse.json(
        { error: `Unknown generation action: ${action}` },
        { status: 400 },
      );
    }

    const systemInstruction =
      "You are an elite multilingual writing, linguistics, and content-quality specialist covering English, Spanish, Urdu, and Roman Urdu, as well as a senior YouTube growth strategist, e-commerce growth architect, Pakistani local social commerce specialist, expert educator for study notes/quizzes/flashcards/assignments/homework, freelance marketplace specialist for Upwork/Fiverr, and Southeast Asian marketplace listing SEO specialist for Shopee and Lazada when those domains apply. When generating WhatsApp, Facebook/Instagram, wholesale negotiation, or local social commerce copy, write in natural native-sounding Roman Urdu mixed with English where appropriate for Pakistani audiences. For writing tools (humanizer, detector, grammar, paraphrase, summarizer, rewrite, transliteration, plagiarism estimates), be accurate, cautious with claims, and never invent facts. For study tools, prioritize clear educational explanations, ground PDF/YouTube content in provided source text, and never invent citations as real sources. For freelancer tools, write persuasive but honest marketplace copy, never invent client results or reviews, and label contracts as templates not legal advice. For Shopee/Lazada tools, write marketplace-compliant listing copy, never invent certifications or medical claims, and respect typical title length best practices. You act purely as a backend data processor. You output ONLY valid JSON structures that match the exact shape requested by the user. Absolutely no markdown formatting codes like ```json or ```, no introductory sentences, no explanations, and no conversational text are allowed. Return only the raw JSON string.";
    const creativitySeed = Math.floor(Math.random() * 1000000);
    // Make completion request to DeepSeek API
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-flash",
        messages: [
          { role: "system", content: systemInstruction },
          {
            role: "user",
            content: `Creativity Seed: ${creativitySeed}  ${userPrompt}`,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek completions failure response:", errorText);
      throw new Error(
        `DeepSeek API returned code ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      throw new Error(
        "DeepSeek API returned an empty completions choices array.",
      );
    }

    const text = data.choices[0].message.content;
    const parsedData = parseDeepSeekJson(text);

    // MongoDB telemetry logging for Daraz Product Hunting
    if (action === "product-hunting") {
      try {
        await dbConnect();
        const score = parsedData.marketDemandScore?.score || 0;
        await ProductHunt.create({
          query: payload.seed || "",
          marketDemandScore: score,
          competitionLevel: parsedData.competitionLevel?.level || "Medium",
          estimatedProfitMargin: parsedData.estimatedProfitMargin || "",
          winningCriteria: parsedData.winningCriteria || "",
          sourcingTips: parsedData.sourcingTips || "",
          customerPainPoints: parsedData.customerPainPoints || [],
          isTrending: score >= 80,
        });
        console.log(`Product hunt logged successfully. Score: ${score}`);
      } catch (dbErr) {
        console.error("Failed to log product hunt telemetry:", dbErr);
      }
    }

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error("API generation failure:", error);
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
