'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path) => {
        // ใช้ path === "/" สำหรับหน้าหลัก
        if (path === "/") {
            return pathname === "/";
        }
        // ใช้ pathname.startsWith(path) สำหรับหน้าย่อยทั้งหมดที่ขึ้นต้นด้วย path นั้น
        // เช่น /activities จะ match ทั้ง /activities และ /activities/detail
        return pathname.startsWith(path);
    };

    const NavButton = ({ href, iconName, label }) => {
        const active = isActive(href);

        const iconSrc = active ? `/navbar/white/${iconName}.svg` : `/navbar/black/${iconName}.svg`;
        const className = active ? 'relative bottom-7' : '';

        return (
            <button onClick={() => router.push(href)} className={`flex flex-col items-center text-sm`}>
                {active && (
                    <img src="/navbar/Ellipse.svg" alt="" className="absolute bottom-[49px] z-0" />
                )}
                <img
                    src={iconSrc}
                    alt={label}
                    className={`object-contain mb-1 w-7 h-7 ${className}`}
                />
                {label}
            </button>
        );
    };

    return (
        <div className='fixed bottom-0 w-full bg-blue-100 border-t-1 z-40'>
            <nav className="flex justify-around py-3 text-sm px-[10px]">
                <NavButton href="/friends" iconName="group" label="เพื่อน" />
                <NavButton href="/activities" iconName="Calendar" label="กิจกรรม" />
                <NavButton href="/wallet" iconName="wallet" label="กระเป๋าตังค์" />
                <NavButton href="/piggybank" iconName="piggybank" label="กระปุกหมู" />
                <NavButton href="/profile" iconName="profile" label="โปรไฟล์" />
            </nav>
        </div>
    );
};