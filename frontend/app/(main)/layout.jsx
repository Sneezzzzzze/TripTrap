'use client'
import { usePathname } from "next/navigation";
import Navbar from "../components/์Navbar";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  // ซ่อน Navbar
  const hideNavbar = pathname === "/";
  return (
    <div>
        {children}
        {!hideNavbar && <Navbar />}
    </div>
  );
};