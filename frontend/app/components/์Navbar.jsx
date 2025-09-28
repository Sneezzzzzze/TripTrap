'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <div className='fixed bottom-0 w-full bg-cyan-100 border-t-1'>
            <nav className="flex justify-around py-3 text-sm">
                <button onClick={() => router.push("/")} className="text-gray-700 flex flex-col items-center">
                    <img src="/media/group.svg" alt="" className="object-contain w-8 h-8 mb-1" />
                    เพื่อน
                </button>

                <button onClick={() => router.push("/activities")} className="text-gray-700 flex flex-col items-center">
                    <img src="/media/Calendar.svg" alt="" className="object-contain w-8 h-8 mb-1" />
                    กิจกรรม
                </button>

                <button onClick={() => router.push("/wallet")} className="text-gray-700 flex flex-col items-center">
                    <img src="/media/wallet.svg" alt="" className="object-contain w-8 h-8 mb-1" />
                    กระเป๋าตังค์
                </button>

                <button onClick={() => router.push("/")} className="text-gray-700 flex flex-col items-center">
                    <img src="/media/piggybank.svg" alt="" className="object-contain w-8 h-8 mb-1" />
                    กระปุกหมู
                </button>

                <button onClick={() => router.push("/profile")} className="text-gray-700 flex flex-col items-center">
                    <img src="/media/profile.svg" alt="" className="object-contain w-8 h-8 mb-1" />
                    โปรไฟล์
                </button>
            </nav>
        </div>
    );
};