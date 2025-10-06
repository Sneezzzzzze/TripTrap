'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function CreateActivityBtn() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="justify-self-end bg-[#4D616B] text-white rounded-full p-[2px] px-3 mr-4 text-4xl bottom-22 z-50 fixed">
            <a onClick={() => router.push("/activities/create")}>+</a>
        </div>
    );
};