"use client";

import { useRouter } from "next/navigation";

export default function AddBankPage() {
  const router = useRouter();

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
          เพิ่มบัญชีธนาคาร
        </h1>
        <div className="w-8" /> {/* spacer */}
      </div>

      {/* Form Section */}
      <main className="p-4">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ธนาคาร
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              defaultValue=""
            >
              <option value="" disabled>
                เลือกธนาคาร
              </option>
              <option value="scb">ไทยพาณิชย์ (SCB)</option>
              <option value="kbank">กสิกรไทย (KBank)</option>
              <option value="bbl">กรุงเทพ (BBL)</option>
              <option value="ktb">กรุงไทย (KTB)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมายเลขบัญชี
            </label>
            <input
              type="text"
              placeholder="เช่น 123-456-7890"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อบัญชี
            </label>
            <input
              type="text"
              placeholder="ชื่อเจ้าของบัญชี"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            บันทึกบัญชีธนาคาร
          </button>
        </form>
      </main>
    </div>
  );
}
