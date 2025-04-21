"use client";
import Navbar from "./navbar";
import Footer from "./fotter";
import "@/styles/globals.css";
import React, { useState, useEffect, useRef } from "react";
import SidebarLayer from "./sidebar_layer";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
  return (
    <html lang="en">
      <body>
        <SidebarLayer
          onHambergerClick={handleHambergerButtonClick}
          sidebarRef={sidebarRef}
          isSidebarOpen={isSidebarOpen}
          buttonref={buttonRef}
        />
        <div className={`${isSidebarOpen ? "" : null} flex grow flex-col`}>
          <Navbar
            onHambergerClick={handleHambergerButtonClick}
            isMobile={isMobile}
            buttonref={buttonRef}
          />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
