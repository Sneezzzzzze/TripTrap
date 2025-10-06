import EditProfile from "@/app/components/EditProfile";

export default function EditProfilePage() {
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
            <EditProfile/>
        </div>
    );
}