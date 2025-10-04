"use client";

import { useRouter } from "next/navigation";
import RightArrow from "../components/icons/RightArrow";

export default function BankAccountItem({ account }) {
  const router = useRouter();
  const { name, lastDigits, default: isDefault } = account;

  return (
    <button
      onClick={() => router.push(`/wallet/detail`)}
      className="flex items-center justify-between w-full py-2 hover:bg-gray-50 transition"
    >
      <div className="flex items-center">
        {/* Placeholder for Bank Logo */}
        <div className="h-8 w-8 mr-3 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">A</span>
        </div>

        <div>
          <span className="text-base font-medium text-gray-800">{name}</span>
          <div className="text-sm text-gray-500 mt-1 flex space-x-2">
            {isDefault && (
              <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                ค่าเริ่มต้น
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <span className="text-base font-medium text-gray-800 mr-1">
          *{lastDigits}
        </span>
        <RightArrow />
      </div>
    </button>
  );
}
