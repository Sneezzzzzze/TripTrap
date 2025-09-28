"use client"

import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

export default function WelcomeScreen() {
  const router = useRouter();

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
            
            {/* Illustration Placeholder */}
            <div className="w-full max-w-sm h-64 flex items-center justify-center mb-10">
                <img 
                    src="/media/trip.svg"
                    alt="Illustrated couple loading luggage onto a jeep"
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                        // Fallback if placehold.co fails
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/400x300/F5F5F7/333333?text=Travel+Scene";
                    }}
                />
            </div>

            {/* Text Content */}
            <h1 
                // Using arbitrary value for the primary text color
                className="text-2xl font-bold mb-4 text-[#0C5A66]"
            >
                จัดทริป ทำกิจกรรม ไม่ต้องวุ่นวาย
            </h1>
            
            <p className="text-sm text-gray-500 max-w-xs mb-16">
                วางแผนการเดินทางและกิจกรรมของคุณได้อย่างง่ายดายในที่เดียว ไม่ว่าจะเป็นทริปใกล้หรือไกล TripTrap พร้อมให้ทุกเรื่องราบรื่น
            </p>

            {/* Spacer to push button down */}
            <div className="flex-grow"></div> 
        </div>

        {/* 3. Bottom Action Button */}
        <div className="w-full p-6 bg-[#F6FAFD]">
            <button
                onClick={() => router.push("/register")}
                // Using arbitrary value for the button background color
                className="w-full py-4 mb-11 text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-[1.01] active:scale-[0.99] bg-[#0C5A66]"
            >
                <span className="text-lg">เริ่มต้นเลย</span> {/* Start Now */}
                <ChevronRight className="inline-block ml-2 w-5 h-5" />
            </button>
        </div>
    </div>
  );
}
