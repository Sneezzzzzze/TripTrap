"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddFriendPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(null);
  const [friendships, setFriendships] = useState([]);
  const [received, setReceived] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const storedUserId = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");

      if (!storedUserId || !token) {
        alert("กรุณาเข้าสู่ระบบก่อน");
        router.push("/login");
        return;
      }

      setUserId(parseInt(storedUserId, 10));

      try {
        const res = await axios.get(
          "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setFriendships(data);

        // ✅ fetch received (pending requests)
        try {
          const rec = await axios.get(
            "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship/sent",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const recData = Array.isArray(rec.data) ? rec.data : [];
          setReceived(recData);
        } catch (e) {
          console.error("Error fetching received requests:", e);
        }
      } catch (err) {
        console.error("Error fetching friendships:", err);
      }
    };

    init();
  }, [router]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("กรุณากรอกคำค้นหา");
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/user?keyword=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      const filtered = data.filter((u) => u.id !== Number(userId));
      setUsers(filtered);
    } catch (error) {
      console.error("❌ Error searching users:", error);
      alert("ค้นหาไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (receiver_id) => {
    try {
      setAdding(receiver_id);
      const token = sessionStorage.getItem("token");

      const body = { receiver_id };

      await axios.post(
        "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("🎉 ส่งคำขอเป็นเพื่อนเรียบร้อยแล้ว!");

      setFriendships((prev) => [
        ...prev,
        { friend_id: receiver_id, status: "Pending" },
      ]);
    } catch (error) {
      console.error("❌ Error adding friend:", error);
      alert("ไม่สามารถส่งคำขอได้ ลองใหม่อีกครั้ง");
    } finally {
      setAdding(null);
    }
  };

  const isAlreadyFriend = (targetId) => {
    return friendships.some(
      (f) => f.friend_id === targetId && f.status === "Accepted"
    );
  };

  const isPending = (targetId) => {
    return received.some((r) => r.friend_id === targetId && r.status === "Pending");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
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

      <div className="flex px-6 py-5">
        <div className="relative flex w-full shadow-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 ค้นหาเพื่อนด้วยชื่อหรือชื่อผู้ใช้..."
            className="flex-1 rounded-l-xl border border-gray-300 bg-white/80 px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-[#106681] focus:ring-2 focus:ring-[#106681]/30 outline-none transition"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-[#106681] text-white px-5 rounded-r-xl active:scale-[0.97] transition disabled:opacity-50"
          >
            {loading ? "ค้นหา..." : "ค้นหา"}
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 px-6 font-medium">ผลการค้นหา</p>

      <div className="px-4 pb-6 space-y-3">
        {loading ? (
          <p className="text-center text-gray-500 py-6">กำลังค้นหา...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            {searchTerm ? "ไม่พบผู้ใช้ที่ตรงกับคำค้นหา" : "พิมพ์ชื่อเพื่อค้นหาเพื่อน"}
          </p>
        ) : (
          users.map((user) => {
            const accepted = isAlreadyFriend(user.id);
            const pending = isPending(user.id);

            return (
              <div
                key={user.id}
                className="flex items-center justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition p-3 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src="/profilepic/profile.jpg"
                    alt="friend"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>

                {accepted ? (
                  <span className="text-sm text-green-600 font-medium">
                    👥 เป็นเพื่อนแล้ว
                  </span>
                ) : pending ? (
                  <span className="text-sm text-gray-500 font-medium">
                    รอการตอบรับ
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddFriend(user.id)}
                    disabled={adding === user.id}
                    className="px-4 py-1.5 bg-[#106681] text-white rounded-lg text-sm font-medium hover:bg-[#0d4f62] active:scale-95 transition disabled:opacity-50"
                  >
                    {adding === user.id ? "กำลังส่ง..." : "เพิ่มเพื่อน"}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
