"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import DropDown from "./dropdown";
import AuthDropdownLayer from "./authDropdownLayer";
import AuthNonDropdownLayer from "./authNonDropdownLayer";

function AuthWrapper() {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <AuthDropdownLayer />
      ) : (
        <AuthNonDropdownLayer />
      )}
    </>
  );
}

export default function DesktopComponent() {
  const [isHoverAbout, setIsHoverAbout] = useState(false);
  const [isHoverBrowse, setisHoverBrowse] = useState(false);

  // const [isDropped, setIsDropped] = useState(false);
  const browseRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  type MyMouseEvent<T extends HTMLElement> = MouseEvent<T>;

  const handleMouseIn = (
    event: MyMouseEvent<HTMLButtonElement> | MyMouseEvent<HTMLAnchorElement>,
  ) => {
    if (event.target && aboutRef.current?.contains(event.target as Node)) {
      setIsHoverAbout(true);
    }
    if (event.target && browseRef.current?.contains(event.target as Node)) {
      setisHoverBrowse(true);
    }
  };

  const handleMouseOut = (
    event: MyMouseEvent<HTMLButtonElement> | MyMouseEvent<HTMLAnchorElement>,
  ) => {
    if (event.target && aboutRef.current?.contains(event.target as Node)) {
      setIsHoverAbout(false);
    }
    if (event.target && browseRef.current?.contains(event.target as Node)) {
      setisHoverBrowse(false);
    }
  }; // const handleMouseIn = (event: MouseEvent<HTMLButtonElement>) => {
  //   if (event.target && aboutRef.current?.contains(event.target as Node)) {
  //     setIsHoverAbout(true);
  //   }
  //   if (event.target && browseRef.current?.contains(event.target as Node)) {
  //     setisHoverBrowse(true);
  //   }
  // };
  // const handleMouseOut = (
  //   event:
  //     | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  //     | MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  // ) => {
  //   if (event.target && aboutRef.current?.contains(event.target as Node)) {
  //     setIsHoverAbout(false);
  //   }
  //   if (event.target && browseRef.current?.contains(event.target as Node)) {
  //     setisHoverBrowse(false);
  //   }
  // };
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
      <button
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        ref={aboutRef}
        className="cursor-pointer"
      >
        <div className="flex h-15.5 hover:bg-[rgb(25,25,54)]">
          <div className="flex items-center px-[24px]">
            <div
              className={`text-[20px] ${isHoverAbout ? "text-[cyan]" : "text-gray-500"}`}
            >
              About
            </div>
            <RiArrowDropDownLine
              className={`text-4xl text-[white] ${isHoverAbout ? "rotate-180" : null}`}
            />
          </div>
        </div>

        <DropDown isHoverAbout={isHoverAbout} />
      </button>

      {pathname === "/sign-in" ? null : <AuthWrapper />}
    </div>
  );
}
