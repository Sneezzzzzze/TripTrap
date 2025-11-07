"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateActivityBtn from "@/app/components/CreateActivityBtn";
import axios from "axios";

export default function ActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setError("ไม่พบข้อมูลผู้ใช้");
      setLoading(false);
      return;
    }

    const fetchActivities = async () => {
      try {
        // 🔹 Fetch activities
        const response = await axios.get(
          `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/user/${userId}`
        );

        let activityList = [];
        if (Array.isArray(response.data)) {
          activityList = response.data;
        } else if (Array.isArray(response.data.activities)) {
          activityList = response.data.activities;
        }

        // 🔹 For each activity, get signed image URL if image key exists
        const updatedActivities = await Promise.all(
          activityList.map(async (activity) => {
            if (activity.image) {
              try {
                const res = await axios.get(`/api/upload-url`, {
                  params: { key: activity.image },
                });
                if (res.status === 200 && res.data.url) {
                  return { ...activity, imageUrl: res.data.url };
                }
              } catch (err) {
                console.warn(`Error fetching image for ${activity.name}`, err);
              }
            }
            // fallback
            return { ...activity, imageUrl: "/media/PleaseStop.jpg" };
          })
        );

        setActivities(updatedActivities);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("ไม่สามารถดึงข้อมูลกิจกรรมได้");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm py-4 text-center">
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          กิจกรรม
        </h1>
      </header>

      {/* Hero Banner */}
      <section
        className="relative w-full h-64 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/media/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative z-10 text-5xl sm:text-7xl font-extrabold text-white tracking-wide drop-shadow-md">
          TRIP TRAP
        </h1>
        <p className="relative z-10 text-white/80 mt-2 text-sm sm:text-base">
          สร้างและเข้าร่วมกิจกรรมที่คุณชื่นชอบ
        </p>
      </section>

      {/* My Activities */}
      <section className="px-4 pt-6 pb-10">
        <h2 className="text-gray-800 font-semibold text-lg mb-3">กิจกรรมที่สร้าง</h2>

        {loading && (
          <p className="text-center text-gray-500 mt-6">กำลังโหลดข้อมูล...</p>
        )}
        {error && <p className="text-center text-red-500 mt-6">{error}</p>}

        {!loading && !error && activities.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {activities.map((activity) => (
              <div
                key={activity.activity_id || activity.id}
                onClick={() =>
                  router.push(
                    `/activities/${activity.activity_id || activity.id}`
                  )
                }
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 active:scale-95"
              >
                {/* Image */}
                <div className="h-[70%] overflow-hidden">
                  <img
                    src={activity.imageUrl || "/media/PleaseStop.jpg"}
                    alt={activity.name || "กิจกรรม"}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h1 className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600 transition">
                    {activity.name || "กิจกรรมไม่มีชื่อ"}
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    {activity.start_date
                      ? `เริ่มวันที่ ${new Date(activity.start_date).toLocaleDateString(
                          "th-TH"
                        )}`
                      : "ยังไม่ระบุวันที่"}
                  </p>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && activities.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            ยังไม่มีกิจกรรมที่สร้าง
          </p>
        )}
      </section>

      {/* Joined Activities */}
      <section className="px-4 pb-20">
        <h2 className="text-gray-800 font-semibold text-lg mb-3">
          กิจกรรมที่เข้าร่วม
        </h2>
        <p className="text-center text-gray-400 mt-6">
          (ยังไม่รองรับข้อมูลกิจกรรมที่เข้าร่วม)
        </p>
      </section>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <CreateActivityBtn />
      </div>
    </div>
  );
}
