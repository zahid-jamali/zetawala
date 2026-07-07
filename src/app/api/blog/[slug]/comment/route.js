import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongodb';
import BlogPost from '../../../../../models/BlogPost';

// POST: Add a new comment to a blog post by slug
export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, comment } = body;

    if (!name || !comment) {
      return NextResponse.json(
        { success: false, error: 'Name and comment text are required.' },
        { status: 400 }
      );
    }

    await dbConnect();
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return NextResponse.json({ success: false, error: 'Blog post not found.' }, { status: 404 });
    }

    // Push new comment
    post.comments.push({ name, comment, createdAt: new Date() });
    await post.save();

    return NextResponse.json({ success: true, comments: post.comments });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
