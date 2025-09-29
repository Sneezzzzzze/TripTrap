import ProfileCard from "@/app/components/Profile/ProfileCard";
import ProfileName from "@/app/components/Profile/ProfileName";

export default function Profile() {
  return (
    <div className="bg-blue-200 h-[100vh]">
      <div className="pt-6 w-full text-center font-semibold">
        <p>โปรไฟล์</p>
      </div>
      <div className="flex flex-col pt-8 items-center">
        <div className="border rounded-full w-54 h-54 z-20">
          <img src="/profilepic/yoda.png" alt="profile pic" fill="true" />
        </div>
      </div>
      <ProfileName/>
      <div className="bg-white rounded-t-4xl p-2 pt-12 relative bottom-12 z-0 min-h-120">
        <ProfileCard />
      </div>
    </div>
  );
}