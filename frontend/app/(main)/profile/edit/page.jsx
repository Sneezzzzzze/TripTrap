

export default function Profile() {
    return (
        <div className="bg-white h-[100vh]">
            <div className="pt-6 w-full text-center font-semibold">
                <p>แก้ไขโปรไฟล์</p>
                <a href="/profile">
                    <img src="/media/arrowLeft.svg" alt="" className="relative bottom-4 ml-3 mb-4 justify-self-start" />
                </a>
            </div>
            <div className="flex flex-col  items-center">
                <div className="border rounded-full w-54 h-54 z-20">
                    <img src="/profilepic/yoda.png" alt="profile pic" fill="true" />
                </div>
            </div>
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
        </div>
    );
}