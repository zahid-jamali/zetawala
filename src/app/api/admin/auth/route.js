import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { hashPassword, seedDefaultAdmin } from '../../../../lib/authHelper';

const SESSION_TOKEN_PREFIX = 'authenticated_zeta_session_';

// POST: Sign in admin and configure HTTP-only cookie using database profile validation
export async function POST(request) {
  try {
    await dbConnect();
    await seedDefaultAdmin(User);

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials.' }, { status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    // Only allow admin role users to log in
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized role assignment.' }, { status: 403 });
    }

    const hashedInput = hashPassword(password);
    if (user.password !== hashedInput) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    // Set cookie session
    const cookieStore = await cookies();
    cookieStore.set('admin_session', `${SESSION_TOKEN_PREFIX}${user._id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day session
      path: '/'
    });

    return NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, username: user.username, role: user.role }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Authentication error: ' + err.message }, { status: 500 });
  }
}

// GET: Validate active session status from DB record
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;

    if (!session || !session.startsWith(SESSION_TOKEN_PREFIX)) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    await dbConnect();
    const userId = session.replace(SESSION_TOKEN_PREFIX, '');
    const user = await User.findById(userId).select('-password');

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { id: user._id, name: user.name, username: user.username, role: user.role }
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

// DELETE: Sign out admin and wipe cookie
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/'
    });

    return NextResponse.json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    return NextResponse.json({ error: 'Logout server error.' }, { status: 500 });
  }
}
