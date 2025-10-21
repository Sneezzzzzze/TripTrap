"use client";

import EditProfile from "@/app/components/EditProfile";

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative overflow-hidden">
      {/* Header */}
      <div className="relative pt-10 pb-4 w-full text-center font-semibold text-gray-800">
        <p className="text-lg tracking-tight">แก้ไขโปรไฟล์</p>
        <a
          href="/profile"
          className="absolute top-8 left-6 hover:scale-105 active:scale-95 transition-transform"
        >
          <img src="/media/arrowLeft.svg" alt="back" className="w-6 h-6" />
        </a>
      </div>

      {/* Profile Picture */}
      {/* Edit Profile Form */}
      <EditProfile />

      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 translate-x-16 -translate-y-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30 -translate-x-16 translate-y-10 pointer-events-none"></div>
    </div>
  );
}
