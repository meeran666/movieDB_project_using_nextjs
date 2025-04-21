"use client";
import { RiArrowDropDownLine } from "react-icons/ri";
import Logo from "@/public/logo.svg";
import { MouseEvent, RefObject, useRef, useState } from "react";
import DropDown from "./dropdown";
type HambergerClick = {
  onHambergerClick: () => void;
};
type MobileComponentProp = HambergerClick & {
  buttonref: RefObject<HTMLDivElement | null>;
};

type NavbarProp = HambergerClick & {
  isMobile: boolean;
  buttonref: RefObject<HTMLDivElement | null>;
};

function MobileComponent({ onHambergerClick, buttonref }: MobileComponentProp) {
  return (
    <div
      className="flex flex-col gap-[3px]"
      onClick={onHambergerClick}
      ref={buttonref}
    >
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
    </div>
  );
}
function DesktopComponent() {
  const [isHoverAbout, setIsHoverAbout] = useState(false);
  const [isHoverBrowse, setisHoverBrowse] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const browseRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const handleAboutClick = () => {
    setIsDropped(!isDropped);
  };

  const handleMouseIn = (
    event:
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    if (event.target && aboutRef.current?.contains(event.target as Node)) {
      setIsHoverAbout(true);
    }
    if (event.target && browseRef.current?.contains(event.target as Node)) {
      setisHoverBrowse(true);
    }
  };
  const handleMouseOut = (
    event:
      | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
      | MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    if (event.target && aboutRef.current?.contains(event.target as Node)) {
      setIsHoverAbout(false);
    }
    if (event.target && browseRef.current?.contains(event.target as Node)) {
      setisHoverBrowse(false);
    }
  };

  return (
    <div className="flex grow-0">
      <a
        ref={browseRef}
        className={`content-center px-[10px] text-[20px] hover:bg-[rgb(25,25,54)] ${isHoverBrowse ? "text-[cyan]" : "text-gray-500"}`}
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        href={"/"}
      >
        Browse movie
      </a>
      <div
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        onClick={handleAboutClick}
        ref={aboutRef}
        className=""
      >
        <div className="flex h-15.5 hover:bg-[rgb(25,25,54)]">
          <div className="flex items-center px-[10px]">
            <div
              className={`text-[20px] ${isHoverAbout ? "text-[cyan]" : "text-gray-500"}`}
            >
              About
            </div>
            <RiArrowDropDownLine
              className={`text-4xl text-[white] ${isDropped ? "rotate-180" : null}`}
            />
          </div>
        </div>

        <DropDown isDropped={isDropped} isHoverAbout={isHoverAbout} />
      </div>
    </div>
  );
}
export default function Navbar({
  onHambergerClick,
  isMobile,
  buttonref,
}: NavbarProp) {
  return (
    <>
      <div className="max-[780px]:pl-15px flex h-16 w-[100dvw] items-center gap-[0.3rem] border-[0.05rem] border-solid border-(--gray_color) bg-(--black_color) pr-[3.7vw] pl-[4vw] max-[780px]:h-[3rem]">
        <div className="flex grow items-center gap-[0.4rem]">
          <Logo
            className="h-[2.1rem] w-auto max-[780px]:h-[1.6rem] max-[780px]:w-auto"
            alt="logo"
          />
          <div className="text-[35px] text-(--voilet_color) max-[780px]:text-[1.7rem]">
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
