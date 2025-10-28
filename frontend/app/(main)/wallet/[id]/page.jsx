"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function BankDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const url = `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/wallet/user/1`;
        const response = await axios.get(url);
        const rawAccounts = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        const walletId = parseInt(id, 10);
        const wallet = rawAccounts.find((acc) => acc.id === walletId);
        setAccount(wallet || null);
      } catch (error) {
        console.error("Error fetching account:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [id]);

  const handleDelete = async () => {
    if (!account) return;
    const confirmDelete = window.confirm(
      `ต้องการลบบัญชี "${account.bank_name}" ใช่หรือไม่?`
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      const deleteUrl = `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/wallet/${account.id}`;
      const response = await axios.delete(deleteUrl);
      if (response.status === 200) {
        alert("ลบบัญชีสำเร็จ");
        router.push("/wallet");
      } else {
        alert("ไม่สามารถลบบัญชีได้");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("เกิดข้อผิดพลาดในการลบบัญชี");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/wallet/${id}/edit`);
  };

  if (loading) return <p className="p-6 text-gray-600">กำลังโหลด...</p>;
  if (!account) return <p className="p-6 text-gray-600">ไม่พบบัญชี</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-gray-800">รายละเอียดบัญชี</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-blue-600 hover:underline"
          >
            กลับ
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-4">
          <h2 className="text-base font-medium text-gray-800 mb-2">
            {account.bank_name}
          </h2>
          <p className="text-gray-600">เลขบัญชี: {account.account_number}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleEdit}
            className="w-full py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition"
          >
            แก้ไข
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`w-full py-2 rounded-lg font-medium transition ${
              deleting
                ? "bg-red-200 text-red-400 cursor-not-allowed"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
          >
            {deleting ? "กำลังลบ..." : "ลบบัญชี"}
          </button>
        </div>
      </main>
    </div>
  );
}
