"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./sidebar";
export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname().split("/")[1];
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  console.log("pathname");
  console.log(pathname);
  const menuItems = [
    { path: "Introduction", name: "Introduction" },
    { path: "DatabaseDesign", name: "Database Design" },
    { path: "AiSearch", name: "Ai Search" },
  ];
  const handleItemClick = (path: string) => {
    router.push(`/${encodeURIComponent(path)}`);
  };
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 780);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex w-dvw justify-center bg-[black]">
      <div className="relative grid w-[min(75rem,100%)] grid-cols-[minmax(0,1fr)_auto] border-x-2 border-solid text-white [border-image-slice:30%] [border-image-source:linear-gradient(to_bottom,white,black)]">
        <div className="grow">
          <div className="flex flex-col justify-center p-6 text-sm">
            {children}
          </div>
        </div>
        {isMobile ? null : (
          <Sidebar
            menuItems={menuItems}
            handleItemClick={handleItemClick}
            activeItem={pathname}
          />
        )}
      </div>
    </div>
  );
}
