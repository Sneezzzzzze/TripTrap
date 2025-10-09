'use client'
import { useRouter } from "next/navigation"

export default function ActivityCards() {
  const router = useRouter()

  const activities = [
    { id: 1, title: "ไปงานหนังสือ", date: "เริ่มวันที่ 12 ตุลาคม 2025", image: "/media/PleaseStop.jpg" },
    { id: 2, title: "วิ่งมาราธอนกรุงเทพฯ", date: "เริ่มวันที่ 18 พฤศจิกายน 2025", image: "/media/PleaseStop.jpg" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          onClick={() => router.push("/activities/details")}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 active:scale-95"
        >
          {/* Image */}
          <div className="h-[70%] overflow-hidden">
            <img
              src={activity.image}
              alt={activity.title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-3">
            <h1 className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-600 transition">
              {activity.title}
            </h1>
            <p className="text-xs text-gray-500 truncate">
              {activity.date}
            </p>
          </div>

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
      ))}
    </div>
  )
}
