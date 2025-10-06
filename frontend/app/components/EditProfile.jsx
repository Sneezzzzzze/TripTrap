'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import DragDropImageBox from './DragDropImageBox';

export default function EditProfile() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <div className="m-6">
                <h1 className="font-semibold mb-2">username</h1>
                <input type="text" placeholder='username' className='border rounded-2xl py-2 px-3 font-medium w-full mb-2' />
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <h1 className="font-semibold mb-2">ชื่อ</h1>
                        <input type="text" placeholder='ชื่อ' className='border rounded-2xl py-2 px-3 font-medium w-full' />
                    </div>
                    <div>
                        <h1 className="font-semibold mb-2">นามสกุล</h1>
                        <input type="text" placeholder='นามสกุล' className='border rounded-2xl py-2 px-3 font-medium w-full' />
                    </div>
                </div>
                <h1 className="font-semibold mb-2">email</h1>
                <input type="text" placeholder='email' className='border rounded-2xl py-2 px-3 font-medium w-full mb-2' />
                <h1 className="font-semibold mb-2">password</h1>
                <input type="text" placeholder='password' className='border rounded-2xl py-2 px-3 font-medium w-full mb-2' />
            </div>
            <div className='fixed bottom-0 w-full h-[78px] bg-blue-100 border-t-1 z-40 p-4'>
                <button className="w-full p-2 border-black border-1 rounded-2xl bg-blue-400 text-white active:scale-95">บันทึก</button>
            </div>
        </>
    );
};