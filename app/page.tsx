import Image from "next/image";
import ToggleNav from "./Components/toggleNav";

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">User Panel (Default)</h2>
          <ToggleNav userType="user" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
          <ToggleNav userType="admin" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Back Office Panel</h2>
          <ToggleNav userType="backoffice" />
        </div>
      </main>
    </div>
  );
}
