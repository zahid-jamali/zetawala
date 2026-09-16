'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/uiSlice';
import Navbar from './layout/Navbar';
import Footer from './Footer';

export default function ClientLayoutWrapper({ children }) {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);

  // 1. Initial theme load on client-side mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      dispatch(setTheme(savedTheme));
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setTheme(prefersDark ? 'dark' : 'light'));
    }
  }, [dispatch]);

  // 2. Synchronize theme state to root HTML element & localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen flex flex-col w-full max-w-full overflow-x-hidden transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Top Mega Menu Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full max-w-full min-w-0">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
