'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import DragDropImageBox from './DragDropImageBox';

export default function CreateActivity() {
    const router = useRouter();
    const pathname = usePathname();
    const handleFiles = (files) => {
        console.log("รูปที่เลือก:", files);
    };

    return (
        <>
            <DragDropImageBox maxSizeMB={4} onChange={handleFiles} />
            <div className="m-6">
                <h1 className="font-semibold mb-2">ตั้งชื่อกิจกรรม</h1>
                <input type="text" placeholder='ชื่อกิจกรรม' className='border rounded-2xl py-2 px-3 font-medium w-full mb-2' />
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <h1 className="font-semibold mb-2">วันเริ่มกิจกรรม</h1>
                        <input type="date" placeholder='' className='border rounded-2xl py-2 px-3 font-medium w-full' />
                    </div>
                    <div>
                        <h1 className="font-semibold mb-2">วันสิ้นสุดกิจกรรม</h1>
                        <input type="date" placeholder='' className='border rounded-2xl py-2 px-3 font-medium w-full' />
                    </div>
                </div>
                <h1 className="font-semibold mb-2">รายละเอียดกิจกรรม</h1>
                <textarea placeholder='' className='border rounded-2xl py-2 px-3 font-medium w-full mb-2' />
                <h1 className="font-semibold mb-2">สถานที่</h1>
                <input type="text" placeholder='' className='border rounded-2xl py-2 px-3 font-medium w-full mb-2' />
                <h1 className="font-semibold mb-2">ตั้งเป้าหมาย</h1>
                <div className="flex gap-2">
                    <input type="number" placeholder='' className='border rounded-2xl py-2 px-3 font-medium w-[80%] mb-2' />
                    <h1 className='border rounded-2xl py-2 px-3 font-medium w-[20%] mb-2 text-center'>บาท</h1>
                </div>
                <h1 className="font-semibold mb-2">เลือกบัญชีธนาคารรับเงิน</h1>
                <select className="border rounded-2xl py-2 px-3 font-medium w-full mb-2">
                    <option value="">-- กรุณาเลือก --</option>
                </select>
            </div>
            <div className='fixed bottom-0 w-full h-[78px] bg-blue-100 border-t-1 z-40 p-4'>
                <button className="w-full p-2 border-black border-1 rounded-2xl bg-blue-400 text-white active:scale-95">สร้าง</button>
            </div>
        </>
    );
};