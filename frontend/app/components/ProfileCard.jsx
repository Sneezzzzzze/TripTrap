'use client'

export default function ProfileCard() {
    return (
        <>
            <div className="border rounded-4xl p-2 px-6 mb-5 bg-white">
                <table className="w-full">
                    <tbody>
                        <tr className="border-b">
                            <td className="font-semibold pt-3 pb-1">ชื่อ - นามสกุล</td>
                            <td className="text-right">ปานชีวา สุ่มมาตย์</td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-semibold pt-3 pb-1">Username</td>
                            <td className="text-right">Folk parncheeva</td>
                        </tr>
                        <tr className="border-b">
                            <td className="font-semibold pt-3 pb-1">อีเมล</td>
                            <td className="text-right">mark_pokee@gmail.com</td>
                        </tr>
                        <tr>
                            <td className="font-semibold pt-3 pb-1">Password</td>
                            <td className="text-right">auauaua</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}