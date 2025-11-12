'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import axios from "axios";

export default function ActivityCards() {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [joinedActivities, setJoinedActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    console.log(userId)
    if (!userId) {
      setError("ไม่พบข้อมูลผู้ใช้");
      setLoading(false);
      return;
    }

    const fetchJoinedActivities = async () => {
      try {
        // 🔹 Fetch activities
        const response = await axios.get(
          `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/user/join/${userId}`
        );
        console.log(response)

        let activityJoinList = [];
        if (Array.isArray(response.data)) {
          activityJoinList = response.data;
        } else if (Array.isArray(response.data.activities)) {
          activityJoinList = response.data.activities;
        }

        // 🔹 For each activity, get signed image URL if image key exists
        const updatedActivities = await Promise.all(
          activityJoinList.map(async (activity) => {
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

        setJoinedActivities(updatedActivities);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("ไม่สามารถดึงข้อมูลกิจกรรมได้");
      } finally {
        setLoading(false);
      }
    };
    fetchJoinedActivities();
  }, []);


  return (
    <div>
      {/* Joined Activities */}
      <section className="px-2 pb-10">
        {loading && (
          <p className="text-center text-gray-500 mt-6">กำลังโหลดข้อมูล...</p>
        )}
        {error && <p className="text-center text-red-500 mt-6">{error}</p>}

        {!loading && !error && joinedActivities.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mt-4 mb-8">
            {joinedActivities.map((activity) => (
              <div
                key={activity.activity_id}
                onClick={() => router.push(`/activities/${activity.activity_id}`)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 active:scale-95"
              >
                <div className="h-[70%] overflow-hidden">
                  <img
                    src={activity.imageUrl || "/media/PleaseStop.jpg"}
                    alt={activity.name || "กิจกรรม"}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <h1 className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600 transition">
                    {activity.name || "กิจกรรมไม่มีชื่อ"}
                  </h1>
                  <p className="text-xs text-gray-500 truncate mb-13">
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
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-400 mt-6 mb-6">
              ยังไม่มีกิจกรรมที่เข้าร่วม
            </p>
          )
        )}
      </section>
    </div>
  )
}
