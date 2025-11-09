// "use client";
import NextTopLoader from "nextjs-toploader";
import SidebarLayer from "./(sidebarLayer)/sidebar_layer";
import Navbar from "./(navbar)/navbar";
import Footer from "./fotter";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useEffect, useRef, useState } from "react";

export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

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
        console.log("inside menu ok");
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
  if (status === "loading") return <p>Loading session...</p>;
  return (
    <>
      <SidebarLayer
        onHambergerClick={handleHambergerButtonClick}
        setIsSideBarOpen={setIsSidebarOpen}
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
        {children}

        <ToastContainer />
      </div>
    </>
  );
}
