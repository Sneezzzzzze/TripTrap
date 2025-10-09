"use client";

import { useRouter } from "next/navigation";
import PaymentMethodSection from "../../components/PaymentMethodSection";
import BankAccountItem from "../../components/BankAccountItem";
import PlusSymbol from "../../components/icons/PlusSymbol";

const bankAccountsData = [
  {
    name: "ไทยพาณิชย์ (SCB)",
    lastDigits: "1725",
    default: true,
  },
];

export default function Wallet() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] font-sans">
      <main className="p-4 pt-0 max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/60 backdrop-blur-md p-4 rounded-b-xl shadow-sm mb-6">
          <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
            กระเป๋าตังค์
          </h1>
        </div>

        {/* Bank Accounts */}
        <div className="mt-2">
          <PaymentMethodSection title="บัญชีธนาคาร" helpUrl="#">
            <div className="space-y-3">
              {bankAccountsData.map((account) => (
                <div
                  key={account.lastDigits}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-md hover:scale-[1.01] transition"
                >
                  <BankAccountItem account={account} />
                </div>
              ))}
            </div>

            {/* Add Bank Button */}
            <button
              onClick={() => router.push("/wallet/add")}
              className="flex items-center justify-center w-full py-3 mt-4 bg-white text-gray-700 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition"
            >
              <span className="mr-2 text-[#106681]">
                <PlusSymbol />
              </span>
              <span className="text-base font-medium">
                เพิ่มบัญชีธนาคาร
              </span>
            </button>
          </PaymentMethodSection>
        </div>
      </main>
    </div>
  );
}
