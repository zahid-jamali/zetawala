import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "../../../lib/mongodb";
import ProductHunt from "../../../models/ProductHunt";

// Initialize the Gemini AI SDK safely
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Helper to clean potential markdown backticks if application/json fails to enforce raw output
function parseGeminiJson(rawText) {
  try {
    const cleaned = rawText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse Gemini output as JSON:", rawText);
    throw new Error("Generative AI did not return a valid JSON structure.");
  }
}

export async function POST(request) {
  try {
    // 1. Check API Key configuration
    if (!genAI) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not defined. Please add your Gemini API key to your environment variables.",
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

    // 3. Define and resolve prompts based on action
    let systemInstruction =
      "You are a Senior SEO Prompt Engineer and E-Commerce/Video Metadata Specialist. You output ONLY strictly valid JSON structures matching the requested output format. Do not wrap outputs in markdown block code wrappers like ```json if possible, just return the raw JSON object/array. No conversational filler.";
    let userPrompt = "";
    let responseMimeType = "application/json";

    switch (action) {
      // --- YOUTUBE AUTOMATION PIPELINE ---
      case "video-ideas": {
        const { niche } = payload;
        if (!niche)
          return NextResponse.json(
            { error: "Missing niche parameter." },
            { status: 400 },
          );

        userPrompt = `Given the YouTube niche/category '${niche}', generate 7 highly distinct, viral, and trending video ideas. Return ONLY a structured JSON array of strings containing the raw ideas.
        
        Format:
        ["Idea 1", "Idea 2", ...]`;
        break;
      }

      case "title-generator": {
        const { idea, niche } = payload;
        if (!idea || !niche)
          return NextResponse.json(
            { error: "Missing idea or niche parameter." },
            { status: 400 },
          );

        userPrompt = `Given the raw video idea '${idea}' and target niche '${niche}', act as a professional YouTube copywriter and create 5 high-CTR, clickbait-free, algorithm-optimized video titles. Return ONLY a structured JSON array of strings.
        
        Format:
        ["Title 1", "Title 2", ...]`;
        break;
      }

      case "hook-architect": {
        const { title } = payload;
        if (!title)
          return NextResponse.json(
            { error: "Missing title parameter." },
            { status: 400 },
          );

        userPrompt = `Given the video title '${title}', write an elite 30-45 second video introductory 'Hook' that ensures high audience retention. Provide tone guidelines and word-for-word spoken narrative. No fluff. 
        
        Return ONLY a JSON object:
        {
          "toneGuidelines": "Tone styling and pacing guidelines",
          "script": "Word-for-word spoken script here"
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

        userPrompt = `Given the video title '${title}', write a high-ranking, SEO-optimized YouTube description rich in structural keywords but natural to read. Include placeholder spaces for social links.
        
        Return ONLY a JSON object:
        {
          "description": "Full formatted description, including tags and social placeholders"
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

        userPrompt = `Given the video title '${title}', extract and generate exactly 20 high-score, long-tail and short-tail SEO tags/keywords for the YouTube tag box.
        
        Return ONLY a JSON object containing the list:
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

        userPrompt = `Given the video title '${title}', generate 3 highly detailed, descriptive prompts for AI image generators (like Midjourney or DALL-E 3) to create eye-catching visual thumbnails. Include camera angles, color grading, and psychological triggers.
        
        Return ONLY a JSON array of objects:
        [
          {
            "prompt": "Full Midjourney/DALL-E prompt with details",
            "psychologicalTrigger": "Reasoning behind design and visual triggers"
          },
          ...
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

        userPrompt = `Given the video title '${title}' and requested duration '${duration}' minutes, write a full, comprehensive, word-for-word YouTube video script split into engaging structural segments.
        
        Return ONLY a JSON object:
        {
          "introduction": "Word-for-word spoken intro script",
          "bodyPoints": [
            {
              "sectionTitle": "Title of section/point",
              "content": "Word-for-word script content for this section"
            }
          ],
          "outro": "Outro call-to-action script"
        }`;
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

        userPrompt = `Act as an expert 7-figure Daraz product hunting specialist. Given a root niche or seed product query '${seed}', perform a comprehensive market analysis simulation. 
        
        Generate ONLY a JSON report containing:
        {
          "marketDemandScore": {
            "score": 85,
            "reasoning": "Explain demand factors on Daraz"
          },
          "competitionLevel": {
            "level": "Low" | "Medium" | "High",
            "reasoning": "Analyze active Daraz listings, price points, and review scores"
          },
          "estimatedProfitMargin": "Provide margin breakdown considering product costs vs Daraz commission/shipping fees",
          "winningCriteria": "Explain key competitive advantages or pitfalls to avoid",
          "sourcingTips": "Detailed local sourcing or international (Alibaba/1688) sourcing recommendations",
          "customerPainPoints": [
            "Pain point 1 extracted from review analysis",
            "Pain point 2",
            "Pain point 3"
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

        userPrompt = `Given the specific product focus '${product}', extract 20 high-volume e-commerce search terms tailored strictly to Daraz customer search intent in Pakistan (mixing localized Roman Urdu and English search behavior).
        
        Return ONLY a JSON array of strings:
        ["keyword 1", "keyword 2", ...]`;
        break;
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 },
        );
    }

    // 4. Generate content from Gemini Model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: responseMimeType,
        temperature: 0.2, // Lower temperature to ensure strict formatted compliance
      },
    });

    const text = result.response.text();
    const parsedData = parseGeminiJson(text);

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
        // Log the database error but do not crash the request, ensuring robustness in offline/local mock settings
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
