import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

const SESSION_TOKEN_PREFIX = 'authenticated_zeta_session_';

// Helper to authenticate admin status
async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (!session || !session.startsWith(SESSION_TOKEN_PREFIX)) return null;

  await dbConnect();
  const userId = session.replace(SESSION_TOKEN_PREFIX, '');
  const user = await User.findById(userId);
  if (!user || user.role !== 'admin') return null;

  return user;
}

// POST: Parse file data and forward to Cloudinary API using native fetch
export async function POST(request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary environment variables (CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET) are not defined.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }

    // Convert file to base64 Data URL format
    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type;
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    // POST directly to Cloudinary upload REST API
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const uploadBody = new URLSearchParams();
    uploadBody.append('file', dataUrl);
    uploadBody.append('upload_preset', uploadPreset);

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadBody,
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, error: result.error?.message || 'Cloudinary upload failed.' }, { status: response.status });
    }

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

