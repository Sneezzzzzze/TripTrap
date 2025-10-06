"use client";

import React from "react";
import CreateActivity from "@/app/components/CreateActivity";

export default function CreateActivityPage() {

    return (
        <>
            <div className="bg-white h-[100vh] mb-16">
                <div className="pt-6 w-full text-center font-semibold">
                    <p>สร้างกิจกรรม</p>
                    <a href="/activities">
                        <img src="/media/arrowLeft.svg" alt="" className="relative bottom-4 ml-3 mb-4 justify-self-start" />
                    </a>
                </div>
                <CreateActivity/>
            </div>
        </>
    );
}
