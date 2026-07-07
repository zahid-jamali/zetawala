import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { hashPassword } from '../../../../lib/authHelper';

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

// GET: Retrieve all users (admin only)
export async function GET() {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, users });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Register a new user (admin only)
export async function POST(request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const body = await request.json();
    const { name, username, password, role } = body;

    if (!name || !username || !password || !role) {
      return NextResponse.json({ success: false, error: 'Missing required parameters.' }, { status: 400 });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Username already registered.' }, { status: 400 });
    }

    const hashed = hashPassword(password);
    const newUser = await User.create({
      name,
      username,
      password: hashed,
      role
    });

    return NextResponse.json({
      success: true,
      user: { id: newUser._id, name: newUser.name, username: newUser.username, role: newUser.role }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
