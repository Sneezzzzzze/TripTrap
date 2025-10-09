"use client";
import { useState } from "react";

export default function TogglePage() {
    const [active, setActive] = useState("left");

    const friends = [
        { id: 1, name: "Bess 1", img: "/profilepic/profile.jpg" },
        { id: 2, name: "Bess 2", img: "/profilepic/profile.jpg" },
        { id: 3, name: "Bess 3", img: "/profilepic/profile.jpg" },
        { id: 4, name: "Bess 4", img: "/profilepic/profile.jpg" },
        { id: 5, name: "Bess 5", img: "/profilepic/profile.jpg" },
        { id: 6, name: "Bess 6", img: "/profilepic/profile.jpg" },
    ];

    return (
        <div className="max-w-md mx-auto pb-30">
            {/* ปุ่มเลือก */}
            <div className="flex gap-4 mb-2 p-4">
                <a onClick={() => setActive("left")} className={`text-xl ${active === "left" ? "border-b" : ""}`}>รายละเอียดกิจกรรม</a>
                <a onClick={() => setActive("right")} className={`text-xl ${active === "right" ? "border-b" : ""}`}>สมาชิก</a>
            </div>

            {/* เนื้อหา */}
            <div className="px-5 rounded-xl">
                {active === "left" ? (
                    <>
                        <div className="flex gap-12 mb-5">
                            <div className="space-y-3 text-left">
                                <p>วันเริ่มกิจกรรม</p>
                                <p>วันสิ้นสุดกิจกรรม</p>
                            </div>
                            <div className="space-y-3  text-right">
                                <p>dd/mm/yyyy</p>
                                <p>dd/mm/yyyy</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-5">
                            <p>สถานที่</p>
                            <div className="flex gap-2">
                                <img src="/media/location.svg" alt="" className="" />
                                <p>ที่อยู่ สถานที่</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-5">
                            <p>ค่าใช้จ่ายรวม</p>
                            <div className="flex gap-2">
                                <p>3,000,000</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <p>รายละเอียดกิจกรรม</p>
                            <textarea className="p-4 border rounded-2xl w-full h-24" name="" id="" readOnly></textarea>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-5 place-items-center gap-3">
                        {friends.map((friend) => (
                            <div
                                key={friend.id}
                                className="flex flex-col items-center bg-white hover:shadow-md hover:scale-[1.01] transition w-fit"
                            >
                                <img
                                    src={friend.img}
                                    alt={friend.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#106681]/20"
                                />
                                <span className="text-gray-800 text-sm overflow-hidden whitespace-nowrap text-ellipsis">{friend.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
