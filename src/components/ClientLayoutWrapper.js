'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './layout/Navbar';
import Footer from './Footer';

export default function ClientLayoutWrapper({ children }) {
  const { theme } = useSelector((state) => state.ui);

  return (
    <div className={`min-h-screen flex flex-col w-full transition-colors duration-200 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Top Mega Menu Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
