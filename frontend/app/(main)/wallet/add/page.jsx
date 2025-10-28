"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddBankPage() {
  const router = useRouter();

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState(""); // ชื่อบัญชี (ชื่อผู้ใช้)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Load user info from sessionStorage when page opens
  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setAccountName(storedUserName);
    } else {
      // ถ้าไม่มีใน sessionStorage ลองตั้งค่า default หรือแจ้งเตือน
      setAccountName("");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!bankName || !accountNumber || !accountName) {
      setErrorMessage("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      setLoading(true);
      const userId = sessionStorage.getItem("userId");

      if (!userId) {
        setErrorMessage("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/wallet",
        {
          userId,
          account_number: accountNumber,
          bank_name: bankName,
          account_name: accountName,
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("เพิ่มบัญชีธนาคารสำเร็จ!");
        setTimeout(() => router.push("/wallet"), 1500);
      } else {
        setErrorMessage("ไม่สามารถเพิ่มบัญชีได้ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      console.error("Error adding bank:", error);
      setErrorMessage(
        error?.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setLoading(false);
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
          เพิ่มบัญชีธนาคาร
        </h1>
        <div className="w-8" />
      </div>

      {/* Form Section */}
      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ธนาคาร
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
              <option value="">เลือกธนาคาร</option>
              <option value="ไทยพาณิชย์ (SCB)">ไทยพาณิชย์ (SCB)</option>
              <option value="กสิกรไทย (KBank)">กสิกรไทย (KBank)</option>
              <option value="กรุงเทพ (BBL)">กรุงเทพ (BBL)</option>
              <option value="กรุงไทย (KTB)">กรุงไทย (KTB)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หมายเลขบัญชี
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="เช่น 123-456-7890"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* ✅ Show User Name (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อบัญชี
            </label>
            <input
              type="text"
              value={accountName}
              readOnly
              className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 text-gray-700 cursor-not-allowed"
            />
            {!accountName && (
              <p className="text-xs text-gray-500 mt-1">
                *ยังไม่พบชื่อผู้ใช้ในระบบ กรุณาเข้าสู่ระบบก่อนเพิ่มบัญชี
              </p>
            )}
          </div>

          {/* ✅ Error & Success messages */}
          {errorMessage && (
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm font-medium">{successMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "กำลังบันทึก..." : "บันทึกบัญชีธนาคาร"}
          </button>
        </form>
      </main>
    </div>
  );
}
