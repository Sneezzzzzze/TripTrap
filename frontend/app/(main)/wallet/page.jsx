"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import PaymentMethodSection from "../../components/PaymentMethodSection";
import BankAccountItem from "../../components/BankAccountItem";
import PlusSymbol from "../../components/icons/PlusSymbol";

export default function Wallet() {
  const router = useRouter();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          console.error("❌ User ID not found in sessionStorage");
          setLoading(false);
          return;
        }

        const url = `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/wallet/user/${userId}`;
        const response = await axios.get(url);
        console.log("API data:", response.data);

        // Fix: use response.data.data if API wraps it
        const rawAccounts = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const accounts = rawAccounts.map((item) => ({
          id: item.id,
          name: item.bank_name,
          lastDigits: item.account_number.slice(-4),
          account_number: item.account_number,
          user_id: item.user_id,
          default: false,
        }));

setBankAccounts(accounts);
        
      } catch (error) {
        console.error("Error fetching bank accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBankAccounts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] font-sans">
      <main className="p-4 pt-0 max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/60 backdrop-blur-md p-4 rounded-b-xl shadow-sm mb-6">
          <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
            กระเป๋าตังค์
          </h1>
        </div>

        {/* Bank Accounts Section */}
        <div className="mt-2">
          <PaymentMethodSection title="บัญชีธนาคาร" helpUrl="#">
            {loading ? (
              <p className="text-gray-500 text-center py-6">กำลังโหลด...</p>
            ) : bankAccounts.length > 0 ? (
              <div className="space-y-3">
                {bankAccounts.map((account, index) => (
                  <div
                    key={account.id || index}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md hover:scale-[1.01] transition"
                  >
                    <BankAccountItem account={account} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">
                ยังไม่มีบัญชีธนาคาร
              </p>
            )}

            {/* Add Bank Button */}
            <button
              onClick={() => router.push("/wallet/add")}
              className="flex items-center justify-center w-full py-3 mt-4 bg-white text-gray-700 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition"
            >
              <span className="mr-2 text-[#106681]">
                <PlusSymbol />
              </span>
              <span className="text-base font-medium">เพิ่มบัญชีธนาคาร</span>
            </button>
          </PaymentMethodSection>
        </div>
      </main>
    </div>
  );
}
