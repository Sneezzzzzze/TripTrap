'use client'
import { useRouter } from "next/navigation"

export default function ActivityCards() {
    const router = useRouter()
    return (
        <>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <a onClick={() => router.push("/activities/details")}
                    className="rounded-2xl w-full h-48 bg-white border border-gray-100 active:scale-95 shadow-lg">
                    <img src="/media/PleaseStop.jpg" alt="" className="objext-fit w-full h-[70%] rounded-t-2xl" />
                    <div className="p-2 px-3 w-full overflow-hidden">
                        <h1 className="text-sm truncate">ไปงานหนังสือ</h1>
                        <p className="text-[10px] truncate">เริ่มวันที่ .................</p>
                    </div>
                </a>
                <a onClick={() => router.push("/activities/details")}
                    className="rounded-2xl w-full h-48 bg-white border border-gray-100 active:scale-95 shadow-lg">
                    <img src="/media/PleaseStop.jpg" alt="" className="objext-fit w-full h-[70%] rounded-t-2xl" />
                    <div className="p-2 px-3 w-full overflow-hidden">
                        <h1 className="text-sm truncate">ไปงานหนังสือ</h1>
                        <p className="text-[10px] truncate">เริ่มวันที่ .................</p>
                    </div>
                </a>
            </div>
        </>
    )
}