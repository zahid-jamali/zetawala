import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { hashPassword } from '../../../../../lib/authHelper';

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

// PUT: Update user properties (admin only)
export async function PUT(request, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, username, password, role } = body;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User profile not found.' }, { status: 404 });
    }

    if (name) user.name = name;
    if (username) {
      const existing = await User.findOne({ username, _id: { $ne: id } });
      if (existing) {
        return NextResponse.json({ success: false, error: 'Username already registered.' }, { status: 400 });
      }
      user.username = username;
    }
    if (password) {
      user.password = hashPassword(password);
    }
    if (role) {
      // Prevent self-lockout
      if (id === admin._id.toString() && role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Cannot revoke your own admin rights.' }, { status: 400 });
      }
      user.role = role;
    }

    await user.save();
    return NextResponse.json({ success: true, message: 'User updated successfully.' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Remove user account (admin only)
export async function DELETE(request, { params }) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const { id } = await params;

    // Prevent self-destruction
    if (id === admin._id.toString()) {
      return NextResponse.json({ success: false, error: 'Cannot delete your own admin account.' }, { status: 400 });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'User profile not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
