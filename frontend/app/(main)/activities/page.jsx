import ActivityCards from "@/app/components/ActivityCards";
import CreateActivityBtn from "@/app/components/CreateActivityBtn";

export default function ActivitiesPage() {
  return (
    <>
      <div className="bg-gray-50 h-[100vh] mb-26">
        <div className="py-6 w-full text-center font-semibold">
          <p>กิจกรรม</p>
        </div>
        <div className="w-full h-64 text-center" style={{ backgroundImage: "url('/media/background.png')" }}>
          <h1 className="text-white text-7xl">TRIP TRAP</h1>
        </div>
        <div className="px-2 pt-4 pb-6">
          <h1 className="font-semibold">กิจกรรมที่สร้าง</h1>
          <ActivityCards />
        </div>
        <div className="px-2 pt-4">
          <h1 className="font-semibold">กิจกรรมที่เข้าร่วม</h1>
          <ActivityCards />
        </div>
      </div>
      <CreateActivityBtn/>
    </>
  );
}