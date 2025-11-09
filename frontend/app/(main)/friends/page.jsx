"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function FriendsPage() {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const token = typeof window !== "undefined"
    ? sessionStorage.getItem("token")
    : null;

  // ✅ โหลดรายชื่อเพื่อนใหม่หลังยืนยัน/ปฏิเสธ
  const reloadFriends = async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const list = Array.isArray(res.data) ? res.data : [];
      setFriends(list);
    } catch (err) {
      console.error("❌ reloadFriends error:", err);
      setFriends([]);
    }
  };

  useEffect(() => {
    const fetchFriendsAndRequests = async () => {
      try {
        if (!token) {
          setFriends([]);
          setRequests([]);
          setLoading(false);
          return;
        }

        // ✅ load requests
        let requestList = [];
        try {
          const reqRes = await axios.get(
            "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship/received",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          requestList = Array.isArray(reqRes.data) ? reqRes.data : [];
        } catch (e) {
          requestList = [];
        }
        setRequests(requestList);

        // ✅ load friends
        let friendList = [];
        try {
          const frRes = await axios.get(
            "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          friendList = Array.isArray(frRes.data) ? frRes.data : [];
        } catch (e) {
          friendList = [];
        }
        setFriends(friendList);
      } catch (err) {
        console.error(err);
        setFriends([]);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsAndRequests();
  }, []);

  // ✅ ตอบรับ/ปฏิเสธคำขอเพื่อน + โหลด friendlist ใหม่
  const handleRespond = async (friend_id, newStatus) => {
    try {
      setUpdating(friend_id);

      if (!token) {
        alert("Token หาย กรุณา login ใหม่");
        return;
      }

      const body = {
        requester_id: friend_id,
        status: newStatus,
      };

      await axios.patch(
        "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ เอา request ที่จัดการแล้วออก
      setRequests((prev) => prev.filter((req) => req.friend_id !== friend_id));

      // ✅ โหลด friend list ใหม่ทันที
      await reloadFriends();

      alert(
        newStatus === "Accepted"
          ? "✅ ยืนยันการเป็นเพื่อนเรียบร้อย!"
          : "❌ ปฏิเสธคำขอเป็นเพื่อนแล้ว"
      );
    } catch (err) {
      console.error("❌ update error:", err);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setUpdating(null);
    }
  };

  // ✅ ลบเพื่อน
  const handleDeleteFriend = async (friend_id) => {
    if (!confirm("คุณต้องการลบเพื่อนคนนี้ใช่หรือไม่?")) {
      return;
    }

    try {
      setDeleting(friend_id);

      if (!token) {
        alert("Token หาย กรุณา login ใหม่");
        return;
      }

      await axios.delete(
        "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/friendship",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            receiver_id: friend_id,
          },
        }
      );

      // ✅ เอาเพื่อนที่ลบแล้วออกจาก state
      setFriends((prev) => prev.filter((f) => f.friend_id !== friend_id));

      alert("✅ ลบเพื่อนเรียบร้อยแล้ว");
    } catch (err) {
      console.error("❌ delete error:", err);
      alert("เกิดข้อผิดพลาดในการลบเพื่อน");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] px-6 py-6">
      <div className="flex justify-between items-center mb-6 bg-white/30 backdrop-blur-md rounded-xl px-4 py-2 shadow-sm border border-white/40">
        <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
          เพื่อน
        </h1>
        <button
          onClick={() => router.push("/friends/add")}
          className="bg-[#106681] text-white w-8 h-8 flex justify-center items-center rounded-full text-lg font-bold shadow-md hover:shadow-lg hover:bg-[#0d4f62] transition"
        >
          +
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">กำลังโหลดข้อมูล...</p>
      ) : (
        <>
          {/* ✅ Friend Request Section */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3 font-medium">
              คำขอเป็นเพื่อน
            </p>

            {requests.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">
                ไม่มีคำขอเป็นเพื่อนใหม่
              </p>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.friendship_id}
                    className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md border border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src="/profilepic/profile.jpg"
                        alt="profile"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#106681]/20"
                      />
                      <div>
                        <p className="text-gray-800 font-medium">
                          {req.first_name} {req.last_name}
                        </p>
                        <p className="text-sm text-gray-500">@{req.username}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleRespond(req.friend_id, "Accepted")
                        }
                        disabled={updating === req.friend_id}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
                      >
                        {updating === req.friend_id
                          ? "กำลังยืนยัน..."
                          : "ยืนยัน"}
                      </button>

                      <button
                        onClick={() =>
                          handleRespond(req.friend_id, "Rejected")
                        }
                        disabled={updating === req.friend_id}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-50"
                      >
                        {updating === req.friend_id
                          ? "กำลังยกเลิก..."
                          : "ปฏิเสธ"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Friend List */}
          <p className="text-sm text-gray-600 mb-4">รายชื่อเพื่อนทั้งหมด</p>

          {friends.length === 0 ? (
            <p className="text-gray-500 text-center">ยังไม่มีเพื่อน</p>
          ) : (
            <div className="space-y-3">
              {friends.map((friend) => (
                <div
                  key={friend.friendship_id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm hover:shadow-md border border-gray-100"
                >
                  <div className="flex items-center">
                    <img
                      src="/profilepic/profile.jpg"
                      alt={friend.username}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#106681]/20"
                    />
                    <div className="ml-4">
                      <p className="text-gray-800 font-medium">
                        {friend.first_name} {friend.last_name}
                      </p>
                      <p className="text-sm text-gray-500">@{friend.username}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteFriend(friend.friend_id)}
                    disabled={deleting === friend.friend_id}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-50 transition"
                  >
                    {deleting === friend.friend_id ? "กำลังลบ..." : "ลบ"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}