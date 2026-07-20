// Local Social Commerce & WhatsApp Suite Prompts
export function getLocalCommercePrompt(action, payload) {
  switch (action) {
    case "whatsapp-broadcast": {
      const { productName, productDetails, targetAudience } = payload;
      return `Act as an elite Pakistani WhatsApp marketing copywriter specializing in social commerce. Given product '${productName}', offer/details '${productDetails}', and target audience '${targetAudience}', generate highly converting WhatsApp broadcast messages and Status copy using the AIDA formula (Attention, Interest, Desire, Action).

CRITICAL LANGUAGE RULES:
- Write in natural, native-sounding Roman Urdu mixed with English where locals naturally do (e.g., "order karo", "limited stock", "cash on delivery").
- Use emojis strategically for WhatsApp readability.
- Cater to Pakistani local e-commerce buyers (COD mindset, price sensitivity, trust signals).

Return ONLY a valid JSON object:
{
  "results": [
    { "title": "Broadcast Message (AIDA)", "content": "Full WhatsApp broadcast text with emojis, Roman Urdu + English mix" },
    { "title": "WhatsApp Status Copy (Short)", "content": "Punchy status-length version under 150 characters feel" },
    { "title": "Follow-up Nudge Message", "content": "Soft reminder / scarcity follow-up for non-responders" }
  ]
}`;
    }

    case "local-ad-script": {
      const { productCategory, usp, videoLength } = payload;
      return `Act as a top Pakistani Meta Ads creative strategist for Facebook and Instagram. Given product category '${productCategory}', USP '${usp}', and video length '${videoLength}', create short ad scripts and captions optimized for local Pakistani social media audiences.

CRITICAL LANGUAGE RULES:
- Use a natural Roman Urdu / English mix that sounds native to Pakistani sellers and buyers.
- Optimize for scroll-stopping hooks, local trust cues (COD, delivery, price), and clear CTAs.
- Match pacing and word count roughly to the requested video length (${videoLength}).

Return ONLY a valid JSON object:
{
  "results": [
    { "title": "Ad Script (Spoken Voiceover)", "content": "Scene-by-scene or timed script for ${videoLength}" },
    { "title": "Primary Caption (Feed/Reels)", "content": "Caption with Roman Urdu + English mix and CTA" },
    { "title": "Hook Variations (3 Options)", "content": "1. ...\\n2. ...\\n3. ..." }
  ]
}`;
    }

    case "wholesale-negotiation": {
      const { productToSource, expectedQuantity, targetPriceQuestions } = payload;
      return `Act as an experienced Pakistani wholesale buyer who regularly sources from Shah Alami (Lahore), Bolton Market (Karachi), and similar local wholesale hubs. Given product to source '${productToSource}', expected quantity '${expectedQuantity}', and target price/questions '${targetPriceQuestions}', draft professional WhatsApp inquiry and negotiation templates.

CRITICAL LANGUAGE RULES:
- Write in polite, professional Roman Urdu mixed with English (how real traders chat on WhatsApp).
- Include practical sourcing etiquette for local wholesale vendors (MOQ, rate, sample, delivery, payment terms).

Return ONLY a valid JSON object:
{
  "results": [
    { "title": "Initial Inquiry Message", "content": "First WhatsApp message to vendor" },
    { "title": "Price Negotiation Follow-up", "content": "Polite bargaining / rate discussion template" },
    { "title": "Order Confirmation Checklist Message", "content": "Confirm quantity, rate, payment, and delivery details" }
  ]
}`;
    }

    case "social-comment-responder": {
      const { customerComment, desiredTone } = payload;
      return `Act as a conversion-focused Pakistani social media community manager for Facebook, Instagram, and WhatsApp Business. Given customer's comment '${customerComment}' and desired tone '${desiredTone}', generate polite, conversion-focused auto-replies.

CRITICAL LANGUAGE RULES:
- Respond in natural Roman Urdu mixed with English.
- Tone must match: ${desiredTone}.
- For price inquiries, invite DM/inbox and build trust without sounding pushy.
- For complaints, de-escalate and offer a clear next step.

Return ONLY a valid JSON object:
{
  "results": [
    { "title": "Primary Reply", "content": "Best single reply ready to paste" },
    { "title": "Alternate Reply (Softer)", "content": "Slightly softer variation" },
    { "title": "DM Follow-up Invite", "content": "Short message that moves chat to inbox/WhatsApp" }
  ]
}`;
    }

    case "product-storyboard": {
      const { productFeatures, customerPainPoint } = payload;
      return `Act as a Pakistani social commerce storyteller for Facebook, Instagram, and WhatsApp Status. Given product features '${productFeatures}' and customer pain point '${customerPainPoint}', generate a short, story-driven social media post that addresses the customer's problem BEFORE pitching the product.

CRITICAL LANGUAGE RULES:
- Write in natural Roman Urdu mixed with English.
- Structure: Pain → Empathy → Solution (product) → Soft CTA.
- Keep it scroll-friendly for local audiences.

Return ONLY a valid JSON object:
{
  "results": [
    { "title": "Story Post (Problem → Solution)", "content": "Full story-driven post" },
    { "title": "Short Caption Version", "content": "Compressed caption for Reels/Status" },
    { "title": "WhatsApp Status Storyboard Beats", "content": "Beat 1: ...\\nBeat 2: ...\\nBeat 3: ...\\nBeat 4: CTA" }
  ]
}`;
    }

    default:
      return null;
  }
}
