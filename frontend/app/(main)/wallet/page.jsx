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
    <div className="min-screen bg-gray-50 font-sans">
      <main className="p-4 pt-0">
        <div className="mt-6">
          <PaymentMethodSection title="บัญชีธนาคาร" helpUrl="#">
            {bankAccountsData.map((account) => (
              <BankAccountItem key={account.lastDigits} account={account} />
            ))}

            <button
              onClick={() => router.push("/wallet/add")}
              className="flex items-center w-full py-3 text-gray-500 border-t border-gray-100 mt-2"
            >
              <PlusSymbol />
              <span className="text-base text-gray-800">
                เพิ่มบัญชีธนาคาร
              </span>
            </button>
          </PaymentMethodSection>
        </div>
      </main>
    </div>
  );
}
