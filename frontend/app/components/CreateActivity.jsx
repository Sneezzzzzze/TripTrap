'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DragDropImageBox from './DragDropImageBox';

export default function CreateActivity() {
  const router = useRouter();

  // 🌟 Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [walletId, setWalletId] = useState('');
  const [wallets, setWallets] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageKey, setImageKey] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 📸 Handle file selection
  const handleFiles = (files) => {
    if (files.length > 0) {
      setImageFile(files[0]);
    }
  };

  // 🧩 Fetch user's wallet list
  useEffect(() => {
    const fetchWallets = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        setError("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาเข้าสู่ระบบอีกครั้ง");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/wallet/user/${userId}`
        );
        const rawBanks = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        const banks = rawBanks.map((item) => ({
          id: item.id,
          name: item.bank_name,
          lastDigits: item.account_number.slice(-4),
          account_number: item.account_number,
          user_id: item.user_id,
        }));

        setWallets(banks);
      } catch (err) {
        console.error("Error fetching wallets:", err);
        setError("ไม่สามารถโหลดบัญชีธนาคารได้");
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  // 🧠 Upload image to S3 (same logic as profile)
  const uploadImageToS3 = async () => {
    if (!imageFile) return null;
    try {
      const res = await axios.post("/api/upload-url", {
        fileName: imageFile.name,
        fileType: imageFile.type,
      });

      const { url, key } = res.data;
      await axios.put(url, imageFile, {
        headers: { "Content-Type": imageFile.type },
      });

      setImageKey(key);
      return key;
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("อัปโหลดรูปภาพไม่สำเร็จ");
    }
  };

  // 📨 Handle activity creation
  const handleCreateActivity = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
      return;
    }

    if (!title || !description || !startDate || !endDate || !walletId) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      setSubmitting(true);

      let uploadedKey = imageKey;
      if (imageFile && !uploadedKey) {
        uploadedKey = await uploadImageToS3();
      }

      const payload = {
        title,
        description,
        userId,
        location,
        start_date: startDate,
        end_date: endDate,
        budget: Number(budget) || 0,
        wallet_id: walletId,
        image: uploadedKey || null, // ✅ attach S3 key if uploaded
      };

      await axios.post(
        "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity",
        payload
      );

      alert("สร้างกิจกรรมสำเร็จ!");
      router.push("/activities");
    } catch (err) {
      console.error("Error creating activity:", err);
      alert("เกิดข้อผิดพลาดในการสร้างกิจกรรม");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Image upload */}
        <div className="mb-6">
          <DragDropImageBox maxSizeMB={4} onChange={handleFiles} />
          {imageFile && (
            <p className="text-sm text-gray-600 mt-2">ไฟล์ที่เลือก: {imageFile.name}</p>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl px-1 py-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ตั้งชื่อกิจกรรม
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ชื่อกิจกรรม"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                วันเริ่มกิจกรรม
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                วันสิ้นสุดกิจกรรม
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              รายละเอียดกิจกรรม
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="รายละเอียด..."
              rows={4}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              สถานที่
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="สถานที่จัดกิจกรรม"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ตั้งเป้าหมาย
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="จำนวนเงิน"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              เลือกบัญชีธนาคารรับเงิน
            </label>
            {loading ? (
              <p className="text-gray-500 text-sm">กำลังโหลดบัญชี...</p>
            ) : (
              <select
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 transition-all"
              >
                <option value="">-- กรุณาเลือก --</option>
                {wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name} (xxx-xxx-{wallet.lastDigits})
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={handleCreateActivity}
            disabled={submitting}
            className={`w-full py-3 rounded-xl font-semibold text-lg text-white shadow-md transition-all duration-300 ${
              submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg active:scale-[0.97]'
            }`}
          >
            {submitting ? 'กำลังสร้าง...' : 'สร้าง'}
          </button>

          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
