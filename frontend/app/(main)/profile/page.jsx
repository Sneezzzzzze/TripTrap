import ProfileCard from "@/app/components/ProfileCard";
import ProfileName from "@/app/components/ProfileName";
import ActivityCards from "@/app/components/ActivityCards";

export default function ProfilePage() {
  return (
    <div className="bg-blue-200 h-[100vh]">
      <div className="pt-6 w-full text-center font-semibold">
        <p>โปรไฟล์</p>
        <a href="/profile/edit">
          <img src="/media/Edit.svg" alt="" className="relative bottom-7 mr-3 justify-self-end" />
        </a>
      </div>
      <div className="flex flex-col  items-center">
        <div className="border rounded-full w-54 h-54 z-20">
          <img src="/profilepic/yoda.png" alt="profile pic" fill="true" />
        </div>
      </div>
      <ProfileName />
      <div className="bg-gray-50 [box-shadow:inset_0px_4px_8px_rgba(0,0,0,0.1),0px_-6px_9px_-8px_rgba(0,0,0,0.3)] rounded-t-4xl p-2 pt-12 pb-26 relative bottom-12 z-0 min-h-120">
        <ProfileCard />
        <div>
          <h1 className="font-semibold">กิจกรรมที่ลงทะเบียน</h1>
          <ActivityCards />
        </div>
      </div>
    </div>
  );
}