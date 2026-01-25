"use client";
import { SessionProvider } from "next-auth/react";
import Logo from "@/public/logo.svg";
import MobileComponent from "./mobileComponent";
import DesktopComponent from "./desktopComponent";
import { RefObject } from "react";

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
      <div className="max-[780px]:pl-15px fixed z-3 flex h-16 w-[100dvw] items-center gap-[0.3rem] border-[0.05rem] border-solid border-(--gray_color) bg-(--black_color) pr-[3.7vw] pl-[4vw] max-[780px]:h-[3rem]">
        <div className="flex grow items-center gap-[0.4rem]">
          <Logo
            className="h-[2.1rem] w-auto max-[780px]:h-[1.6rem] max-[780px]:w-auto"
            alt="logo"
          />
          <div className="text-[35px] text-(--violet_color) max-[780px]:text-[1.7rem]">
            Moviemania
          </div>
        </div>
        {isMobile ? (
          <MobileComponent
            onHambergerClick={onHambergerClick}
            buttonref={buttonref}
          />
        ) : (
          <SessionProvider>
            <DesktopComponent />
          </SessionProvider>
        )}
      </div>
    </>
  );
}
