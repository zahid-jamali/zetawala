import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String, default: '' },
  tags: { type: [String], default: [] },
  category: { type: String, default: 'youtube', enum: ['youtube', 'daraz', 'local-commerce', 'seo-webmaster', 'calculators', 'pdf-utilities', 'writing', 'study', 'freelancer', 'shopee', 'lazada'] },
  author: { type: String, default: 'Admin' },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
