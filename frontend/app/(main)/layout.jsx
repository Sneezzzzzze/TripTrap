'use client'
import { usePathname } from "next/navigation";
import Navbar from "../components/์Navbar";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  // ซ่อน Navbar ถ้าอยู่ที่ /main เท่านั้น
  const hideNavbar = pathname === "/main";
  return (
    <div>
        {children}
        {!hideNavbar && <Navbar />}
    </div>
  );
};