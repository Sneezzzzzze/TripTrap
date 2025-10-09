"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddFriendPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white shadow-sm backdrop-blur-md">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium transition"
        >
          ← กลับ
        </button>
        <h1 className="text-base font-semibold text-gray-800 tracking-tight">
          เพิ่มเพื่อน
        </h1>
        <div className="w-8" />
      </header>

      {/* Search bar */}
      <div className="flex px-6 py-5">
        <div className="relative flex w-full shadow-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 ค้นหาเพื่อน..."
            className="flex-1 rounded-l-xl border border-gray-300 bg-white/80 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <button className="bg-blue-500 text-white px-5 rounded-r-xl hover:bg-blue-600 active:scale-[0.97] transition">
            ค้นหา
          </button>
        </div>
      </div>

      {/* Title */}
      <p className="text-sm text-gray-600 mb-3 px-6 font-medium">
        รายชื่อเพื่อนทั้งหมด
      </p>

      {/* Friend list */}
      <div className="px-4 pb-6 space-y-3">
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            key={id}
            className="flex items-center justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition p-3 border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <img
                src="/profilepic/profile.jpg"
                alt="friend"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div>
                <p className="text-gray-800 font-medium">Bess {id}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
