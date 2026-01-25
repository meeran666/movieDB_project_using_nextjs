"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname().split("/")[1];
  const [isMobile, setIsMobile] = useState(false);

  const [activeItem, setActiveItem] = useState<string | undefined>(pathname);
  const menuItems = [
    { path: "Introduction", name: "Introduction" },
    { path: "DatabaseDesign", name: "Database Design" },
    { path: "FutureUpdate", name: "Future Update" },
  ];
  const handleItemClick = (path: string) => {
    setActiveItem(path);
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
      <div className="relative grid w-[min(75rem,100%)] grid-cols-[minmax(0,1fr)_minmax(0,300px)] border-x-2 border-solid text-white [border-image-slice:30%] [border-image-source:linear-gradient(to_bottom,white,black)]">
        <div className="grow">
          <div className="flex flex-col justify-center p-6">{children}</div>
        </div>
        {isMobile ? null : (
          <Sidebar
            menuItems={menuItems}
            handleItemClick={handleItemClick}
            activeItem={activeItem}
          />
        )}
      </div>
    </div>
  );
}
