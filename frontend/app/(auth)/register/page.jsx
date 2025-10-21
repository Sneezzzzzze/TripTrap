'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // ✅ ตรวจสอบข้อมูลเบื้องต้น
        if (!username || !firstname || !lastname || !email || !password || !confirmpassword) {
            setErrorMessage("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }

        if (password !== confirmpassword) {
            setErrorMessage("รหัสผ่านและการยืนยันไม่ตรงกัน");
            return;
        }

        try {
            const response = await axios.post(
                "https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/user",
                {
                    username,
                    firstname,
                    lastname,
                    email,
                    password
                }
            );

            if (response.status === 201) {
                setSuccessMessage("ลงทะเบียนสำเร็จ! กำลังนำทางไปหน้าเข้าสู่ระบบ...");
                setTimeout(() => router.push("/login"), 1500);
            } else {
                setErrorMessage("ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง");
            }
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
            );
        }
    };

    return (
        <div className="relative flex flex-col h-screen overflow-hidden bg-[#F6FAFD]">
            {/* วงกลมตกแต่งด้านบน */}
            <div className="absolute top-0 left-0 w-full h-1/4 overflow-hidden">
                <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#0C5A66] opacity-80"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#0C5A66] opacity-20"></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col flex-grow items-center text-center px-8 pt-32 bg-[#F6FAFD]">
                    <h1 className="text-xl font-bold mb-4 mt-16 text-[#0C5A66]">
                        ยินดีต้อนรับสู่ระบบ
                    </h1>
                    <p className="text-sm text-gray-500 max-w-xs mb-8">
                        ให้เราช่วยคุณนัดเจอเพื่อนๆ
                    </p>

                    {/* ฟอร์มกรอกข้อมูล */}
                    <div className="flex flex-col gap-4 w-[95%]">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='border rounded-2xl py-3 px-3 font-medium' />
                        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder='ชื่อ' className='border rounded-2xl py-3 px-3 font-medium' />
                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder='นามสกุล' className='border rounded-2xl py-3 px-3 font-medium' />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='อีเมล' className='border rounded-2xl py-3 px-3 font-medium' />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='รหัสผ่าน' className='border rounded-2xl py-3 px-3 font-medium' />
                        <input type="password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} placeholder='ยืนยันรหัสผ่าน' className='border rounded-2xl py-3 px-3 font-medium' />
                    </div>

                    {/* แสดงข้อความแจ้งเตือน */}
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                    {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
                </div>

                {/* ปุ่มดำเนินการ */}
                <div className="w-full p-6 bg-[#F6FAFD]">
                    <button
                        type="submit"
                        className="w-full py-4 mb-6 text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-[1.01] active:scale-[0.99] bg-[#0C5A66]"
                    >
                        <span className="text-lg">ลงทะเบียน</span>
                    </button>
                    <p className="text-sm text-gray-500 text-center">
                        มีบัญชีแล้ว ?
                        <a onClick={() => router.push("/login")} className='font-semibold active:underline ml-1 cursor-pointer'>เข้าสู่ระบบ</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
