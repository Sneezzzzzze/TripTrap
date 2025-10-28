"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditWalletPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    bank_name: "",
    account_number: "",
    user_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const url = `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/wallet/${id}`;
        const response = await axios.get(url);
        const wallets = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        const wallet = wallets.find((w) => w.id === parseInt(id, 10));
        if (wallet) {
          setForm({
            bank_name: wallet.bank_name,
            account_number: wallet.account_number,
            user_id: wallet.user_id,
          });
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/wallet/${id}`;
      const response = await axios.put(url, form);
      if (response.status === 200) {
        alert("อัปเดตข้อมูลสำเร็จ");
        router.push(`/wallet/${id}`);
      } else {
        alert("อัปเดตไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Error updating wallet:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-gray-600">กำลังโหลด...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-gray-800">แก้ไขบัญชี</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-blue-600 hover:underline"
          >
            กลับ
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-xl p-4 space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              ชื่อธนาคาร
            </label>
            <input
              type="text"
              name="bank_name"
              value={form.bank_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              เลขบัญชี
            </label>
            <input
              type="text"
              name="account_number"
              value={form.account_number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-2 rounded-lg font-medium transition ${
              saving
                ? "bg-orange-200 text-orange-400 cursor-not-allowed"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            }`}
          >
            {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </button>
        </form>
      </main>
    </div>
  );
}
