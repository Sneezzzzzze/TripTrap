'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import DragDropImageBox from './DragDropImageBox';

export default function CreateActivity() {
  const router = useRouter();

  const handleFiles = (files) => {
    console.log("รูปที่เลือก:", files);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Drag & Drop Image */}
        <div className="mb-6">
          <DragDropImageBox maxSizeMB={4} onChange={handleFiles} />
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl px-1    py-6 space-y-4">
          {/* Activity Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ตั้งชื่อกิจกรรม
            </label>
            <input
              type="text"
              placeholder="ชื่อกิจกรรม"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>

          {/* Start & End Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                วันเริ่มกิจกรรม
              </label>
              <input
                type="date"
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                วันสิ้นสุดกิจกรรม
              </label>
              <input
                type="date"
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              รายละเอียดกิจกรรม
            </label>
            <textarea
              placeholder="รายละเอียด..."
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              สถานที่
            </label>
            <input
              type="text"
              placeholder="สถานที่จัดกิจกรรม"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ตั้งเป้าหมาย
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="number"
                placeholder="จำนวนเงิน"
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Bank Account */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              เลือกบัญชีธนาคารรับเงิน
            </label>
            <select
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
            >
              <option value="">-- กรุณาเลือก --</option>
            </select>
          </div>

          {/* Create Button */}
          <button
            onClick={() => router.push("/activities")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-300"
          >
            สร้าง
          </button>
        </div>
      </div>
    </div>
  );
}
