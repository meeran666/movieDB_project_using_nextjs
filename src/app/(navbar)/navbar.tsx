"use client";
import Logo from "@/public/logo.svg";
import MobileComponent from "./mobileComponent";
import DesktopComponent from "./desktopComponent";
import { RefObject } from "react";
import Image from "next/image";

type HambergerClick = {
  onHambergerClick: () => void;
};

type NavbarProp = HambergerClick & {
  isMobile: boolean;
  buttonref: RefObject<HTMLDivElement | null>;
};

export default function Navbar({
  onHambergerClick,
  isMobile,
  buttonref,
}: NavbarProp) {
  return (
    <>
      <div className="fixed z-3 flex h-12 w-dvw items-center gap-1 border border-solid border-(--gray_color) bg-(--black_color) pr-[3.7vw] pl-4 md:h-16 md:pl-[4vw]">
        <div className="flex grow items-center gap-2">
          <Image
            src="/logo.png"
            className="h-6 w-auto md:h-8"
            alt="logo.png"
            width={4}
            height={4}
          />
          <div className="text-2xl text-(--violet_color) md:text-4xl">
            Moviemania
          </div>
        </div>
        {isMobile ? (
          <MobileComponent
            onHambergerClick={onHambergerClick}
            buttonref={buttonref}
          />
        ) : (
          <DesktopComponent />
        )}
      </div>
    </>
  );
}
