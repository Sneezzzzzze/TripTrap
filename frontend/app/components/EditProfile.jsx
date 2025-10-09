'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const router = useRouter();

  return (
    <>
      <div className="px-6 pb-28 space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="BessKanisorn"
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
          />
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ชื่อ
            </label>
            <input
              type="text"
              placeholder="ชื่อ"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              นามสกุล
            </label>
            <input
              type="text"
              placeholder="นามสกุล"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="bess@example.com"
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => router.push('/profile')}
          className="w-full py-3 rounded-xl bg-gradient-to-r bg-blue-600 text-white font-semibold text-lg shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-300"
        >
          บันทึก
        </button>
      </div>
    </>
  );
}
