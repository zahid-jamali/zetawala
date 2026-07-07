import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../lib/mongodb';
import BlogPost from '../../../models/BlogPost';

const SESSION_TOKEN = 'authenticated_zeta_secret_token';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  return session === SESSION_TOKEN;
}

// GET: Retrieve all published blog posts
export async function GET() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, posts });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Create a new blog post (admin only)
export async function POST(request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { title, content, excerpt, coverImage, tags } = body;

    if (!title || !content || !excerpt) {
      return NextResponse.json({ success: false, error: 'Missing required parameters.' }, { status: 400 });
    }

    // Auto-generate slug from title parameters
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Guarantee uniqueness
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newPost = await BlogPost.create({
      title,
      slug,
      content,
      excerpt,
      coverImage: coverImage || '',
      tags: Array.isArray(tags) ? tags : [],
      author: 'Admin'
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
