import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineLogin } from "react-icons/md";

import { useState } from "react";
import Link from "next/link";
import AuthDetailLayer from "../authDetailLayer";
import { useSession } from "next-auth/react";
import DropDown from "./dropdown";
import CrossButton from "./crossButton";
import { LatoFont } from "../fonts";
import { useRouter } from "next/navigation";
import { SidebarLayerProp } from "@/types/types";
import Image from "next/image";

export default function SidebarLayer({
  onHambergerClick,
  sidebarRef,
  isSidebarOpen,
  buttonref,
}: SidebarLayerProp) {
  const [dropClicked, setDropClicked] = useState(false);
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  const router = useRouter();
  const handleDropClick = () => {
    setDropClicked(!dropClicked);
  };
  const { data, status } = useSession();
  const user = data?.user;
  const name = user?.name;
  const nameFirstChar = name?.[0].toUpperCase();
  return (
    <div
      ref={sidebarRef}
      className={`fixed z-4 flex h-screen w-60 flex-col bg-slate-900 duration-600 ${isSidebarOpen ? "right-0" : "-right-80"}`}
    >
      <div
        className="h-19.5 border-b-3 pt-3 pl-5 hover:bg-slate-950"
        onClick={onHambergerClick}
      >
        <CrossButton buttonref={buttonref} />
      </div>
      <ul className="flex grow flex-col pt-3">
        <a
          className="block pl-7 text-2xl font-bold text-(--hamberger_child_color) no-underline hover:bg-slate-950"
          href={"/"}
        >
          Browse Movie
        </a>
        <a
          className={`block pl-7 text-2xl font-bold text-(--hamberger_child_color) no-underline ${dropClicked ? "bg-slate-950" : "hover:bg-slate-950"}`}
          onClick={handleDropClick}
        >
          About
          <RiArrowDropDownLine
            className={`inline h-9 w-9 text-white ${dropClicked ? "rotate-180" : null}`}
          />
        </a>

        <DropDown dropClicked={dropClicked} />
        <a
          className="block pl-7 text-2xl font-bold text-(--hamberger_child_color) no-underline hover:bg-slate-950"
          href="/Ai"
        >
          Ai Search
        </a>
        <div className="block grow"></div>
        <AuthDetailLayer
          user={user}
          isAuthButtonClicked={isAuthButtonClicked}
          status={status}
        ></AuthDetailLayer>
        <div className="flex h-14 items-center justify-center bg-linear-to-b from-gray-950 to-slate-950 text-2xl text-(--hamberger_child_color) no-underline">
          {status === "unauthenticated" ? (
            <Link
              href="/sign-in"
              onClick={() => {
                router.replace("/sign-in");
              }}
              className="flex h-4 items-center gap-1.5 text-2xl no-underline"
            >
              <Image
                src="/login.png"
                width={3}
                height={3}
                alt="login.png"
                className="h-6 w-6"
              />
              login
            </Link>
          ) : (
            <button
              onClick={() =>
                setIsAuthButtonClicked(
                  (isAuthButtonClicked) => !isAuthButtonClicked,
                )
              }
              className={`${LatoFont.className} flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-orange-700 text-xl`}
            >
              {nameFirstChar}
            </button>
          )}
        </div>
        <div className="h-11 w-full bg-slate-950"></div>
      </ul>
    </div>
  );
}
