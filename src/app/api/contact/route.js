import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import ContactMessage from '../../../models/ContactMessage';

import { getClientIp, detectBot, checkRateLimit } from '../../../lib/security';

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

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing name, email, or message field.' },
        { status: 400 }
      );
    }

    await dbConnect();
    const contactRecord = await ContactMessage.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true, data: contactRecord });
  } catch (error) {
    console.error('Error saving contact request to MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error encountered while saving support request.' },
      { status: 505 }
    );
  }
}
