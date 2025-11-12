"use client";

import { useEffect, useState } from "react";
import TogglePage from "../../../components/TogglePage";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState("/media/PleaseStop.jpg");
  const [currentUserId, setCurrentUserId] = useState(null);

  // ✅ Load current user (from localStorage or sessionStorage)
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    setCurrentUserId(userId);
  }, []);

  // ✅ Fetch activity details
  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/${id}`
        );

        console.log("Activity data:", res.data);
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setActivity(data);

        if (data?.image) {
          try {
            const imgRes = await axios.get(`/api/upload-url`, {
              params: { key: data.image },
            });
            if (imgRes.status === 200) setImgUrl(imgRes.data.url);
          } catch {
            console.warn("Failed to load image URL, using fallback.");
          }
        }
      } catch (err) {
        console.error("Error fetching activity details:", err);
        setError("ไม่สามารถโหลดข้อมูลกิจกรรมได้");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  // ✅ Delete activity
  const handleDelete = async () => {
    if (!window.confirm("คุณแน่ใจหรือว่าต้องการลบกิจกรรมนี้?")) return;
    try {
      await axios.delete(
        `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/${id}`
      );
      alert("ลบกิจกรรมเรียบร้อยแล้ว");
      router.push("/activities");
    } catch (err) {
      console.error("Error deleting activity:", err);
      alert("ไม่สามารถลบกิจกรรมได้");
    }
  };

  // ✅ Loading & error states
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 animate-pulse">กำลังโหลด...</p>
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  if (!activity)
    return <p className="text-center text-gray-400 mt-10">ไม่พบข้อมูลกิจกรรม</p>;

  return (
    <div className="bg-white min-h-screen">
      {/* ✅ Background Image */}
      <div
        className="relative w-full h-[60vh] text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        {/* Back button */}
        <div className="pt-6 w-full text-left font-semibold absolute top-0 left-0">
          <button onClick={() => router.back()} className="ml-3">
            <img
              src="/media/arrowLeft.svg"
              alt="back"
              className="w-8 h-8 hover:scale-110 transition"
            />
          </button>
        </div>

        {/* ✅ Edit & Delete buttons — shown only if current user is creator */}
        {currentUserId === String(activity.creator_id) && (
          <div className="absolute top-6 right-4 flex gap-3">
            <button
              onClick={() => router.push(`/activities/${id}/edit/`)}
              className="p-2 bg-white/80 hover:bg-white rounded-full shadow transition"
              title="แก้ไขกิจกรรม"
            >
              <img src="/media/edit.svg" alt="edit" className="w-6 h-6" />
            </button>

            <button
              onClick={handleDelete}
              className="p-2 bg-white/80 hover:bg-red-100 rounded-full shadow transition"
              title="ลบกิจกรรม"
            >
              <img src="/media/trash.svg" alt="delete" className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Activity title + creator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-16 text-center space-y-2">
          <h1 className="text-black text-4xl font-bold drop-shadow-md">
            {activity.name || "ไม่มีชื่อกิจกรรม"}
          </h1>
          <p className="text-black text-sm">
            สร้างโดย {activity.creator_id || "ไม่ทราบผู้สร้าง"}
          </p>
        </div>

        <div className="absolute bottom-0 h-20 w-full bg-[linear-gradient(to_top,white_0%,rgba(255,255,255,0.5)_40%,transparent_100%)]"></div>
      </div>

      {/* ✅ TogglePage content */}
      <TogglePage activity={activity} />
    </div>
  );
}
