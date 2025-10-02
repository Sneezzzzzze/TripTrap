'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter()

  return (
    <div className="relative flex flex-col h-screen overflow-hidden antialiased bg-text-[#F6FAFD]">
        {/* 1. Top Decorative Circles */}
        <div className="absolute top-0 left-0 w-full h-1/4 overflow-hidden">
            {/* Large circle - Darker Teal */}
            <div 
                // Using arbitrary value for primary color and opacity for depth
                className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#0C5A66] opacity-80"
            ></div>
            {/* Medium circle - Lighter Teal/Blue */}
            <div 
                // Using arbitrary value for primary color with more transparency
                className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#0C5A66] opacity-20"
            ></div>
        </div>

        {/* 2. Main Content Area */}
        <div 
            // Using arbitrary value for the light background color
            className="flex flex-col flex-grow items-center text-center px-8 pt-32 bg-[#F6FAFD]"
        >

            {/* Text Content */}
            <h1 
                // Using arbitrary value for the primary text color
                className="text-xl font-bold mb-4 mt-16 text-[#0C5A66]"
            >
                ยินดีต้อนรับสู่ระบบ
            </h1>
            
            <p className="text-sm text-gray-500 max-w-xs mb-16">
                ให้เราช่วยคุณนัดเจอเพื่อนๆ
            </p>

            <div className='flex flex-col gap-5 w-[95%]'>
              <input type="text" placeholder='ชื่อ' className='border rounded-2xl py-3 px-3 font-medium'/>
              <input type="text" placeholder='นามสกุล' className='border rounded-2xl py-3 px-3 font-medium'/>
              <input type="text" placeholder='อีเมล' className='border rounded-2xl py-3 px-3 font-medium'/>
              <input type="text" placeholder='รหัสผ่าน' className='border rounded-2xl py-3 px-3 font-medium'/>
              <input type="text" placeholder='ยืนยันรหัสผ่าน' className='border rounded-2xl py-3 px-3 font-medium'/>
            </div>

            {/* Spacer to push button down */}
            <div className="flex-grow"></div> 
        </div>

        {/* 3. Bottom Action Button */}
        <div className="w-full p-6 bg-[#F6FAFD]">
            <button
                // Using arbitrary value for the button background color
                className="w-full py-4 mb-6 text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-[1.01] active:scale-[0.99] bg-[#0C5A66]"
            >
                <span className="text-lg">ลงทะเบียน</span>
            </button>
            <p className="text-sm text-gray-500 text-center">
                มีบัญชีแล้ว ?
                <a onClick={() => router.push("/login")} className='font-semibold active:underline ml-1'>เข้าสู่ระบบ</a>
            </p>
        </div>
    </div>
  );
}