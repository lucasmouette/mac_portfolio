import Desktop from "@/components/Desktop";
import MobileFallback from "@/components/MobileFallback";

export default function Home() {
  
  return (
    <>
      <div className="hidden md:block">
        <Desktop />
      </div>

      <div className="block md:hidden overflow-y-auto h-screen">
        <MobileFallback />
      </div>
    </>
  );
}