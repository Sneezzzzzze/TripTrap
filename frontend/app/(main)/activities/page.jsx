import ActivityCards from "@/app/components/ActivityCards";

export default function Activities() {
  return (
    <div className="bg-gray-50 h-[100vh]">
      <div className="py-6 w-full text-center font-semibold">
        <p>กิจกรรม</p>
      </div>
      <div className="w-full h-64 text-center" style={{ backgroundImage: "url('/media/background.png')" }}>
        <h1 className="text-white text-7xl">TRIP TRAP</h1>
      </div>
      <div className="px-2 pt-4 pb-26">
        <h1 className="font-semibold">กิจกรรมทั้งหมด</h1>
        <ActivityCards />
      </div>
    </div>
  );
}