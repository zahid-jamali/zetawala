import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "../../../lib/mongodb";
import BlogPost from "../../../models/BlogPost";

import User from "../../../models/User";

const SESSION_TOKEN_PREFIX = "authenticated_zeta_session_";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session || !session.startsWith(SESSION_TOKEN_PREFIX)) return null;

  await dbConnect();
  const userId = session.replace(SESSION_TOKEN_PREFIX, "");
  const user = await User.findById(userId);
  console.log(`User: ${user}`);
  if (!user || user.role !== "admin") return null;

  return user;
}

// GET: Retrieve all published blog posts (with pagination)
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    const totalPosts = await BlogPost.countDocuments({});
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await BlogPost.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      posts,
      totalPages,
      currentPage: page,
      totalPosts,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

// POST: Create a new blog post (admin only)
export async function POST(request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access." },
        { status: 401 },
      );
    }

    await dbConnect();
    const body = await request.json();
    const { title, content, excerpt, coverImage, tags } = body;

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters." },
        { status: 400 },
      );
    }

    // Auto-generate slug from title parameters
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

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
      coverImage: coverImage || "",
      tags: Array.isArray(tags) ? tags : [],
      author: "Admin",
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
