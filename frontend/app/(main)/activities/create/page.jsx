"use client";

import React from "react";
import CreateActivity from "@/app/components/CreateActivity";

export default function CreateActivityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans relative overflow-hidden">

      {/* Header */}
      <header className="top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm py-4 px-4 sm:px-6 text-center flex items-center justify-center relative">
        {/* Back button */}
        <a
          href="/activities"
          className="absolute left-4 sm:left-6 hover:scale-105 active:scale-95 transition-transform"
        >
          <img src="/media/arrowLeft.svg" alt="back" className="w-6 h-6" />
        </a>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
          สร้างกิจกรรม
        </h1>
      </header>

      {/* Create Activity Form */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-lg sm:max-w-xl lg:max-w-full mx-auto bg-white rounded-3xl shadow-md p-6 sm:p-8">
          <CreateActivity />
        </div>
      </main>

    </div>
  );
}
