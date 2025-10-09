"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BankDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isDefault, setIsDefault] = useState(false);

  const [bankAccount, setBankAccount] = useState({
    id,
    name: "ไทยพาณิชย์ (SCB)",
    number: "123-456-1725",
    owner: "นายสมชาย ใจดี",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bankAccounts") || "[]");
    const found = stored.find((acc) => acc.lastDigits === id);
    if (found) {
      setBankAccount(found);
      setIsDefault(found.default || false);
    }
  }, [id]);

  const handleToggleDefault = (checked) => {
    setIsDefault(checked);
    const stored = JSON.parse(localStorage.getItem("bankAccounts") || "[]");
    const updated = stored.map((acc) => ({
      ...acc,
      default: checked ? acc.lastDigits === id : false,
    }));
    localStorage.setItem("bankAccounts", JSON.stringify(updated));
  };

  const handleDelete = () => {
    const confirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีนี้?");
    if (confirmed) {
      const stored = JSON.parse(localStorage.getItem("bankAccounts") || "[]");
      const filtered = stored.filter((acc) => acc.lastDigits !== id);
      localStorage.setItem("bankAccounts", JSON.stringify(filtered));
      alert("บัญชีถูกลบเรียบร้อยแล้ว!");
      router.push("/wallet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="text-gray-500 text-sm font-medium hover:text-gray-700 transition"
        >
          ← กลับ
        </button>
        <h1 className="text-base font-semibold text-gray-800">
          รายละเอียดบัญชี
        </h1>
        <div className="w-8" />
      </div>

      {/* Details */}
      <main className="p-5 max-w-md mx-auto space-y-5">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {bankAccount.name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">เลขท้าย {id}</p>
          </div>

          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">หมายเลขบัญชี</span>
              <span className="font-medium">{bankAccount.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ชื่อบัญชี</span>
              <span className="font-medium">{bankAccount.owner}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 mt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-700">
              ตั้งเป็นบัญชีค่าเริ่มต้น
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => handleToggleDefault(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#106681] rounded-full peer peer-checked:bg-[#106681] transition"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 shadow-sm transition-transform"></span>
            </label>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2.5 rounded-xl font-medium hover:bg-red-600 shadow-sm hover:shadow-md transition"
        >
          ลบบัญชีนี้
        </button>
      </main>
    </div>
  );
}
