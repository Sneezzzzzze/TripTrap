"use client";

import ActivityCards from "@/app/components/ActivityCards";
import CreateActivityBtn from "@/app/components/CreateActivityBtn";

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm py-4 text-center">
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">กิจกรรม</h1>
      </header>

      {/* Hero Banner */}
      <section
        className="relative w-full h-64 flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/media/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative z-10 text-5xl sm:text-7xl font-extrabold text-white tracking-wide drop-shadow-md">
          TRIP TRAP
        </h1>
        <p className="relative z-10 text-white/80 mt-2 text-sm sm:text-base">สร้างและเข้าร่วมกิจกรรมที่คุณชื่นชอบ</p>
      </section>

      {/* My Activities */}
      <section className="px-4 pt-6 pb-10">
        <h2 className="text-gray-800 font-semibold text-lg mb-3">
          กิจกรรมที่สร้าง
        </h2>
        <ActivityCards />
      </section>

      {/* Joined Activities */}
      <section className="px-4 pb-20">
        <h2 className="text-gray-800 font-semibold text-lg mb-3">
          กิจกรรมที่เข้าร่วม
        </h2>
        <ActivityCards />
      </section>

      {/* Floating Create Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <CreateActivityBtn />
      </div>
    </div>
  );
}
