'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/user/credential", {
                username,
                password,
            });

            if (response.status === 200) {
                const user = response.data
                sessionStorage.setItem("token", user.token);
                sessionStorage.setItem("userId", user.user.id);
                router.push("/activities");
            }
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message || "Login failed, please try again."
            );
        }
    };

    return (
        <div className="relative flex flex-col h-screen overflow-hidden antialiased bg-text-[#F6FAFD]">
            <div className="absolute top-0 left-0 w-full h-1/4 overflow-hidden">
                <div
                    className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#0C5A66] opacity-80"
                ></div>
                <div
                    className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#0C5A66] opacity-20"
                ></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col flex-grow items-center text-center px-8 pt-32 bg-[#F6FAFD]">

                    <h1 className="text-xl font-bold mb-4 mt-12 text-[#0C5A66]">
                        ยินดีต้อนรับกลับมา !
                    </h1>

                    <div className="w-full max-w-sm h-64 flex items-center justify-center mb-8">
                        <img
                            src="/media/login.svg"
                            alt="mango?"
                            className="object-contain"
                        />
                    </div>

                    <div className='flex flex-col gap-5 w-[95%]'>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username' className='border rounded-2xl py-3 px-3 font-medium' />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='รหัสผ่าน' className='border rounded-2xl py-3 px-3 font-medium' />
                    </div>

                    <div className="flex-grow"></div>
                </div>

                <div className="w-full p-6 bg-[#F6FAFD] text-center">
                    <a className='font-medium text-gray-500 max-w-xs active:underline'>ลืมรหัสผ่าน</a>

                    <button
                        // Using arbitrary value for the button background color
                        className="w-full py-4 my-6 text-white font-semibold rounded-2xl shadow-lg transition-transform transform hover:scale-[1.01] active:scale-[0.99] bg-[#0C5A66]"
                    >
                        <span className="text-lg">เข้าสู่ระบบ</span>
                    </button>

                    <p className="text-sm text-gray-500">
                        มีบัญชีแล้ว ?
                        <a onClick={() => router.push("/register")}
                            className='font-semibold active:underline ml-1'>ลงทะเบียน</a>
                    </p>
                </div>
            </form>
        </div>
    );
}