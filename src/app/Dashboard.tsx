"use client";
import NextTopLoader from "nextjs-toploader";
import SidebarLayer from "./(sidebarLayer)/sidebar_layer";
import Navbar from "./(navbar)/navbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const isFooter = pathname !== "/movieDetail" && pathname !== "/Ai";

  const handleHambergerButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 780);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      } else {
        event.stopPropagation();
      }
    };

    if (isSidebarOpen) {
      setTimeout(() => {
        window.addEventListener("click", handleClickOutside);
      }, 0);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);
  return (
    <>
      <SessionProvider>
        <SidebarLayer
          onHambergerClick={handleHambergerButtonClick}
          sidebarRef={sidebarRef}
          isSidebarOpen={isSidebarOpen}
          buttonref={buttonRef}
        />

        <div className={`${isSidebarOpen ? "" : null} flex grow flex-col`}>
          <NextTopLoader speed={7} initialPosition={0.01} color="#5c57be" />
          <Navbar
            onHambergerClick={handleHambergerButtonClick}
            isMobile={isMobile}
            buttonref={buttonRef}
          />
          <div className="flex grow flex-col bg-(--black_color) pt-12 md:pt-16 2xl:pt-22">
            {children}
          </div>

          <ToastContainer />
        </div>
        {isFooter && <Footer />}
      </SessionProvider>
    </>
  );
}
