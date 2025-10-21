'use client'

import React from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function EditProfile() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);


  async function handleUpload() {
    if (!file) return alert("กรุณาเลือกไฟล์!");

    try {
      // ขอ signed URL จาก backend
      const res = await axios.post("/api/upload-url", {
        fileName: file.name,
        fileType: file.type,
      });

      const { url, key } = res.data;

      // Upload ไฟล์ไป S3 ผ่าน signed URL
      const uploadRes = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (uploadRes.status !== 200) throw new Error("Upload failed!");

      const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
      setUploadedFiles(prev => [...prev, { name: file.name, url: fileUrl }]);
      setFile(null);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  }


  return (
    <>
      <div className="flex flex-col items-center mt-2 mb-6">
        <div className="relative w-32 h-32 rounded-full ring-4 ring-white shadow-md">
          <img
            src={file ? URL.createObjectURL(file) : '/profilepic/profile.jpg'}
            alt="profile pic"
            className="w-full h-full rounded-full object-cover"
          />
          <label className="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-md cursor-pointer transition">
            <img src="/media/camera.svg" alt="camera" className="w-4 h-4" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
        <p className="mt-3 text-gray-800 font-semibold text-lg">Bess Kanisorn</p>
      </div>

      <div className="bg-white rounded-t-[2rem] shadow-[0_-6px_20px_rgba(0,0,0,0.1)] px-6 pt-10 pb-20 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          <div className="px-6 pb-28 space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
              <input type="text" placeholder="BessKanisorn" className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" />
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">ชื่อ</label>
                <input type="text" placeholder="ชื่อ" className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">นามสกุล</label>
                <input type="text" placeholder="นามสกุล" className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="bess@example.com" className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" />
            </div>
          </div>

          {/* Floating Save Button */}
          <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <button
              onClick={handleUpload}
              className="w-full py-3 rounded-xl bg-gradient-to-r bg-[#106681] text-white font-semibold text-lg shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-300"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
