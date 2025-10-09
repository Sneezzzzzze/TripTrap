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
      <div className="flex flex-col items-center mt-2 mb-6">
        <div className="relative w-32 h-32 rounded-full ring-4 ring-white shadow-md">
          <img
            src="/profilepic/profile.jpg"
            alt="profile pic"
            className="w-full h-full rounded-full object-cover"
          />
          <label className="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-md cursor-pointer transition">
            <img src="/media/camera.svg" alt="camera" className="w-4 h-4" />
            <input type="file" className="hidden" />
          </label>
        </div>
        <p className="mt-3 text-gray-800 font-semibold text-lg">Bess Kanisorn</p>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white rounded-t-[2rem] shadow-[0_-6px_20px_rgba(0,0,0,0.1)] px-6 pt-10 pb-20 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          <EditProfile />
        </div>
      </div>

      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 translate-x-16 -translate-y-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30 -translate-x-16 translate-y-10 pointer-events-none"></div>
    </div>
  );
}
