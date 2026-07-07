'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, LogOut, Loader2, FileText, ShieldAlert } from 'lucide-react';
import AdminBlogList from '../../../components/blog/AdminBlogList';
import AdminBlogForm from '../../../components/blog/AdminBlogForm';
import AdminUserList from '../../../components/blog/AdminUserList';
import AdminUserForm from '../../../components/blog/AdminUserForm';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Tab states: 'blogs' or 'users'
  const [activeTab, setActiveTab] = useState('blogs');
  const [loading, setLoading] = useState(false);

  // Blog states
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  // User states
  const [users, setUsers] = useState([]);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Authenticate admin session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (!data.authenticated) {
          router.replace('/blog/admin/login');
        } else {
          setCurrentUser(data.user);
          fetchPosts();
        }
      } catch (err) {
        console.error(err);
        router.replace('/blog/admin/login');
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [router]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setCurrentPost(null);
    setIsEditing(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditingUser(true);
  };

  const handleSavePost = async (postData) => {
    try {
      const url = currentPost ? `/api/blog/${currentPost.slug}` : '/api/blog';
      const method = currentPost ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
        fetchPosts();
      } else {
        alert(data.error || 'Failed to save post.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (slug) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      const url = selectedUser ? `/api/admin/users/${selectedUser._id}` : '/api/admin/users';
      const method = selectedUser ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.success) {
        setIsEditingUser(false);
        fetchUsers();
      } else {
        alert(data.error || 'Failed to save user.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user profile?')) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchUsers();
      else alert(data.error || 'Failed to delete user.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth', { method: 'DELETE' });
      if (res.ok) router.push('/blog/admin/login');
    } catch (err) {
      console.error(err);
    }
  };

  if (checking) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 bg-slate-50 dark:bg-slate-955">
        <Loader2 className="w-8 h-8 text-sky-550 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-955 py-12 px-6 md:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center shrink-0">
              {activeTab === 'blogs' ? <FileText className="w-6 h-6 text-sky-600 dark:text-sky-400" /> : <ShieldAlert className="w-6 h-6 text-sky-600 dark:text-sky-400" />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {activeTab === 'blogs' ? 'Blog Manager' : 'User Administrator'}
              </h2>
              <p className="text-xs text-slate-550 dark:text-slate-400 font-medium">
                {activeTab === 'blogs' ? 'Create, publish, edit, and delete ZetaWala articles' : 'Manage registered accounts and assign security roles'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {!isEditing && !isEditingUser && (
              <button
                onClick={activeTab === 'blogs' ? handleCreatePost : handleCreateUser}
                className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-lg shadow-sky-500/10"
              >
                <Plus className="w-4 h-4" />
                {activeTab === 'blogs' ? 'New Post' : 'New User'}
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-505 hover:text-slate-800 dark:hover:text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all bg-white dark:bg-slate-900"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        {!isEditing && !isEditingUser && (
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-bold uppercase tracking-wider text-slate-500">
            <button
              onClick={() => {
                setActiveTab('blogs');
                fetchPosts();
              }}
              className={`pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'blogs' ? 'border-sky-500 text-slate-900 dark:text-white' : 'border-transparent hover:text-slate-700 dark:hover:text-slate-350'
              }`}
            >
              Blog Articles
            </button>
            <button
              onClick={() => {
                setActiveTab('users');
                fetchUsers();
              }}
              className={`pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'users' ? 'border-sky-500 text-slate-900 dark:text-white' : 'border-transparent hover:text-slate-700 dark:hover:text-slate-350'
              }`}
            >
              User Management
            </button>
          </div>
        )}

        {/* Workspace views */}
        {activeTab === 'blogs' ? (
          isEditing ? (
            <AdminBlogForm
              post={currentPost}
              onSave={handleSavePost}
              onCancel={() => setIsEditing(false)}
            />
          ) : loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-sky-550 animate-spin" />
            </div>
          ) : (
            <AdminBlogList
              posts={posts}
              onEdit={(post) => {
                setCurrentPost(post);
                setIsEditing(true);
              }}
              onDelete={handleDeletePost}
            />
          )
        ) : (
          isEditingUser ? (
            <AdminUserForm
              user={selectedUser}
              onSave={handleSaveUser}
              onCancel={() => setIsEditingUser(false)}
            />
          ) : loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-sky-550 animate-spin" />
            </div>
          ) : (
            <AdminUserList
              users={users}
              currentUser={currentUser}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditingUser(true);
              }}
              onDelete={handleDeleteUser}
            />
          )
        )}

      </div>
    </div>
  );
}
