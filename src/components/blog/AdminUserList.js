'use client';

import React from 'react';
import { Pencil, Trash2, ShieldCheck, User } from 'lucide-react';

export default function AdminUserList({ users, currentUser, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Date Added</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {users.map((user) => {
              const isSelf = currentUser?.id === user._id;
              return (
                <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <span>
                      {user.name} {isSelf && <span className="text-[9px] uppercase font-extrabold bg-sky-100 dark:bg-sky-950 text-sky-600 px-1.5 py-0.5 rounded-md ml-1.5">You</span>}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                      user.role === 'admin' 
                        ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-400' 
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {user.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                        title="Edit User"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(user._id)}
                        disabled={isSelf}
                        className={`p-2 rounded-lg transition-all ${
                          isSelf 
                            ? 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-350 dark:text-slate-700 cursor-not-allowed opacity-40' 
                            : 'bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-650 dark:text-red-405 cursor-pointer'
                        }`}
                        title={isSelf ? 'Cannot delete yourself' : 'Delete User'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
