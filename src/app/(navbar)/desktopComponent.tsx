"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";
import DropDown from "./dropdown";
import AuthDropdownLayer from "./authDropdownLayer";
import AuthNonDropdownLayer from "./authNonDropdownLayer";
import Image from "next/image";

function AuthWrapper() {
  const { status } = useSession();

  if (status === "loading")
    return (
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );

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
  const [isHoverAiSearch, setIsHoverAiSearch] = useState(false);

  // const [isDropped, setIsDropped] = useState(false);
  const browseRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLButtonElement>(null);
  const AiSearchRef = useRef<HTMLAnchorElement>(null);
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
    if (event.target && AiSearchRef.current?.contains(event.target as Node)) {
      setIsHoverAiSearch(true);
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
    if (event.target && AiSearchRef.current?.contains(event.target as Node)) {
      setIsHoverAiSearch(false);
    }
  };
  return (
    <div className="flex grow-0 text-xl 2xl:h-21 2xl:text-2xl">
      <a
        ref={browseRef}
        className={`mr-7 ml-3 content-center px-2 hover:bg-[rgb(25,25,54)] ${isHoverBrowse ? "text-[cyan]" : "text-gray-500"}`}
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        href={"/"}
      >
        Browse movie
      </a>
      <a
        ref={AiSearchRef}
        className={`mr-2 content-center px-2 hover:bg-[rgb(25,25,54)] ${isHoverAiSearch ? "text-[cyan]" : "text-gray-500"}`}
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        href={"/Ai"}
      >
        Ai Search
      </a>
      <button
        onMouseOver={handleMouseIn}
        onMouseOut={handleMouseOut}
        ref={aboutRef}
        className="cursor-pointer"
      >
        <div className="mr-4 flex h-15.5 hover:bg-[rgb(25,25,54)] 2xl:h-21">
          <div className="flex items-center px-8">
            <div
              className={` ${isHoverAbout ? "text-[cyan]" : "text-gray-500"}`}
            >
              About
            </div>
            <Image
              src="/arrow_down.png"
              alt="arrow_down.png"
              width={2}
              height={2}
              className={`ml-2 h-4 w-3 ${isHoverAbout ? "rotate-180" : null}`}
            />
          </div>
        </div>

        <DropDown isHoverAbout={isHoverAbout} />
      </button>

      {pathname === "/sign-in" ? null : <AuthWrapper />}
    </div>
  );
}
