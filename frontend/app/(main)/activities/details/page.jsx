import TogglePage from "@/app/components/TogglePage";

export default async function ActivityDetails() {
  return (
    <>
      <div className="bg-white h-[100vh] mb-16">
        
        <div className="relative w-full h-[60%] text-center bg-[url('/media/PleaseStop.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="pt-6 w-full text-center font-semibold">
          <p>&nbsp;</p>
          <a href="/activities">
            <img src="/media/arrowLeft.svg" alt="" className="relative bottom-4 ml-3 mb-4 justify-self-start" />
          </a>
        </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-16 text-center space-y-2">
            <h1 className="text-white text-4xl">งานหนังสือ</h1>
            <p className="text-white text-sm">สร้างโดย...</p>
          </div>
          <div className="absolute bottom-0 h-20 w-full bg-[linear-gradient(to_top,white_0%,rgba(255,255,255,0.5)_40%,transparent_100%)]"></div>
        </div>
        <TogglePage/>

      </div>
    </>
  );
}
