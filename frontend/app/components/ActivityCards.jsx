'use client'

export default function ActivityCards() {
    return (
        <>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <a className="rounded-2xl w-full h-44 bg-white border border-gray-100 active:scale-95 shadow-lg">
                    <img src="/media/PleaseStop.jpg" alt="" className="objext-contain w-full h-[70%] rounded-t-2xl" />
                    <div className="p-2 px-3 w-full overflow-hidden">
                        <h1 className="text-sm truncate">ไปงานหนังสือ</h1>
                        <p className="text-[10px] truncate">เริ่มวันที่ .................</p>
                    </div>
                </a>
                <a className="rounded-2xl w-full h-44 bg-white border border-gray-100 active:scale-95 shadow-lg">
                    <img src="/media/PleaseStop.jpg" alt="" className="objext-contain w-full h-[70%] rounded-t-2xl" />
                    <div className="p-2 px-3 w-full overflow-hidden">
                        <h1 className="text-sm truncate">ไปงานหนังสือ</h1>
                        <p className="text-[10px] truncate">เริ่มวันที่ .................</p>
                    </div>
                </a>
            </div>
        </>
    )
}