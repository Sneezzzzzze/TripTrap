"use client";

import { useRouter } from "next/navigation";

export default function FriendsPage() {
  const router = useRouter();

  const friends = [
    { id: 1, name: "Bess 1", img: "/profilepic/profile.jpg" },
    { id: 2, name: "Bess 2", img: "/profilepic/profile.jpg" },
    { id: 3, name: "Bess 3", img: "/profilepic/profile.jpg" },
    { id: 4, name: "Bess 4", img: "/profilepic/profile.jpg" },
    { id: 5, name: "Bess 5", img: "/profilepic/profile.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] px-6 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white/30 backdrop-blur-md rounded-xl px-4 py-2 shadow-sm border border-white/40">
        <h1 className="text-lg font-semibold text-gray-800 tracking-wide">เพื่อน</h1>
        <button
          onClick={() => router.push("/friends/add")}
          className="bg-[#106681] text-white w-8 h-8 flex justify-center items-center rounded-full text-lg font-bold shadow-md hover:shadow-lg hover:bg-[#0d4f62] transition"
        >
          +
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">รายชื่อเพื่อนทั้งหมด</p>

      {/* Friend List */}
      <div className="space-y-3">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center p-3 rounded-xl bg-white shadow-sm hover:shadow-md hover:scale-[1.01] transition border border-gray-100"
          >
            <img
              src={friend.img}
              alt={friend.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#106681]/20"
            />
            <span className="ml-4 text-gray-800 font-medium">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
