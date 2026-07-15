import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '../../../../lib/mongodb';
import BlogPost from '../../../../models/BlogPost';

import User from '../../../../models/User';

const SESSION_TOKEN_PREFIX = 'authenticated_zeta_session_';

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

// GET: Fetch single blog post by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT: Edit post variables (admin only)
export async function PUT(request, { params }) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const { slug } = await params;
    await dbConnect();
    const body = await request.json();
    const { title, content, excerpt, coverImage, tags, category } = body;

    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }

    // Update fields
    if (title) {
      post.title = title;
      // Auto-generate fresh slug if title updates
      let newSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      if (newSlug !== post.slug) {
        const existing = await BlogPost.findOne({ slug: newSlug });
        if (existing) {
          newSlug = `${newSlug}-${Date.now().toString().slice(-4)}`;
        }
        post.slug = newSlug;
      }
    }
    
    if (content) post.content = content;
    if (excerpt) post.excerpt = excerpt;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (tags) post.tags = tags;
    if (category) post.category = category;
    post.updatedAt = new Date();

    await post.save();
    return NextResponse.json({ success: true, post });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Delete post (admin only)
export async function DELETE(request, { params }) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized access.' }, { status: 401 });
    }

    const { slug } = await params;
    await dbConnect();
    const deleted = await BlogPost.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully.' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
