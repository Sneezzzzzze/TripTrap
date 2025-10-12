"use client";

import ProfileCard from "@/app/components/ProfileCard";
import ProfileName from "@/app/components/ProfileName";
import ActivityCards from "@/app/components/ActivityCards";
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  
  const handleLogout = async (e) => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 font-sans relative overflow-hidden">
      {/* Top Bar */}
      <div className="pt-8 w-full text-center font-semibold text-gray-800 relative">
        <p className="text-lg tracking-tight">โปรไฟล์</p>
        <a
          href="/profile/edit"
          className="absolute top-6 left-6 hover:scale-105 active:scale-95 transition-transform"
        >
          <img src="/media/Edit.svg" alt="edit" className="w-6 h-6" />
        </a>
          <button onClick={() => handleLogout()} className="absolute top-6 right-6">logout</button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6">
        <div className="relative w-32 h-32">
          <img
            src="/profilepic/profile.jpg"
            alt="profile"
            className="w-full h-full rounded-full object-cover shadow-md ring-4 ring-white"
          />
        </div>

        <div className="mt-3">
          <ProfileName />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white rounded-t-[2rem] shadow-[0_-6px_20px_rgba(0,0,0,0.1)] px-6 pt-10 pb-20 mt-3 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          <ProfileCard />

          <div>
            <h1 className="font-semibold text-gray-800 text-lg mb-3">
              กิจกรรมที่ลงทะเบียน
            </h1>
            <ActivityCards />
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-30 -translate-x-16 -translate-y-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 translate-x-16 translate-y-20 pointer-events-none"></div>
    </div>
  );
}
