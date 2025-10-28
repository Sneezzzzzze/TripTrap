"use client";

import { useRouter } from "next/navigation";
import RightArrow from "../components/icons/RightArrow";

export default function BankAccountItem({ account }) {
  const router = useRouter();
  const { id, name, account_number, lastDigits, default: isDefault } = account;

  const maskedNumber =
    account_number && account_number.length > 4
      ? `****${account_number.slice(-4)}`
      : account_number || "";

  return (
    <button
      onClick={() => router.push(`/wallet/${id}`)}
      className="flex items-center justify-between w-full py-2 hover:bg-gray-50 transition"
    >
      <div className="flex items-center">
        <div className="h-8 w-8 mr-3 bg-[#106681] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {name?.charAt(0).toUpperCase() || "?"}
          </span>
        </div>

        <div>
          <span className="text-base font-medium text-gray-800">{name}</span>
          <div className="text-sm text-gray-500 mt-1 flex space-x-2 items-center">
            <span>{maskedNumber}</span>
            {isDefault && (
              <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                ค่าเริ่มต้น
              </span>
            )}
          </div>
        </div>
      </div>

      <RightArrow />
    </button>
  );
}
