"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

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

      alert("บัญชีถูกลบเรียบร้อยแล้ว!");
      router.push("/wallet"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        <button
          onClick={() => router.back()}
          className="text-gray-500 text-sm font-medium"
        >
          ← กลับ
        </button>
        <h1 className="text-base font-semibold text-gray-800">
          รายละเอียดบัญชี
        </h1>
        <div className="w-8" />
      </div>

      {/* Details */}
      <main className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">
            {bankAccount.name}
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>หมายเลขบัญชี: {bankAccount.number}</p>
            <p>ชื่อบัญชี: {bankAccount.owner}</p>
          </div>

          <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100">
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
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></span>
            </label>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
        >
          ลบบัญชีนี้
        </button>
      </main>
    </div>
  );
}
