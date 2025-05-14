"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import { Context } from "./context";
export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname().split("/")[2];
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
      <div className="relative flex w-[min(65rem,100%)] bg-amber-800">
        <div className="grow">
          <Context.Provider value={isMobile}>{children}</Context.Provider>
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
