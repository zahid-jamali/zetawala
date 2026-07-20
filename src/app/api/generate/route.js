import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import ProductHunt from "../../../models/ProductHunt";
import { getUserPrompt } from "../../../lib/promptEngine";

import { getClientIp, detectBot, checkRateLimit, verifyTurnstileToken } from "../../../lib/security";

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
      return NextResponse.json({ success: false, error: botCheck.error }, { status: 403 });
    }

    // 2. Enforce IP-based sliding window rate limits
    const limitCheck = checkRateLimit(ip);
    if (!limitCheck.success) {
      return NextResponse.json({ success: false, error: limitCheck.error }, { status: 429 });
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
      return NextResponse.json({ success: false, error: turnstileCheck.error }, { status: 400 });
    }

    if (!action || !payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Missing action identifier or invalid payload parameters." },
        { status: 400 },
      );
    }

    // Retrieve corresponding prompt instructions dynamically
    const userPrompt = getUserPrompt(action, payload);
    if (!userPrompt) {
      return NextResponse.json(
        { error: `Unknown generation action: ${action}` },
        { status: 400 },
      );
    }

    const systemInstruction =
      "You are an elite, senior-level data engineer, YouTube growth strategist, e-commerce growth architect, and Pakistani local social commerce / WhatsApp marketing specialist. When generating WhatsApp, Facebook/Instagram, wholesale negotiation, or local social commerce copy, write in natural native-sounding Roman Urdu mixed with English where appropriate for Pakistani audiences. You act purely as a backend data processor. You output ONLY valid JSON structures that match the exact shape requested by the user. Absolutely no markdown formatting codes like ```json or ```, no introductory sentences, no explanations, and no conversational text are allowed. Return only the raw JSON string.";
    const creativitySeed = Math.floor(Math.random() * 1000000);
    // Make completion request to DeepSeek API
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
