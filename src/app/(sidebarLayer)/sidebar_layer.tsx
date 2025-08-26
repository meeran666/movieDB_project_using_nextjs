import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineLogin } from "react-icons/md";

import { RefObject, useState } from "react";
import Link from "next/link";
import AuthDetailLayer from "../authDetailLayer";
import { useSession } from "next-auth/react";
import DropDown from "./dropdown";
import CrossButton from "./crossButton";

type SidebarLayerProp = {
  onHambergerClick: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  buttonref: RefObject<HTMLDivElement | null>;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SidebarLayer({
  onHambergerClick,
  sidebarRef,
  isSidebarOpen,
  buttonref,
  setIsSideBarOpen,
}: SidebarLayerProp) {
  const [dropClicked, setDropClicked] = useState(false);
  const { status } = useSession();

  const handleDropClick = () => {
    setDropClicked(!dropClicked);
  };
  return (
    <div
      ref={sidebarRef}
      className={`fixed z-4 flex h-screen w-60 flex-col bg-(--hamberger_color) duration-600 ${isSidebarOpen ? "right-0" : "-right-80"}`}
    >
      <div
        className="h-19.5 border-b-3 pt-3 pl-5 hover:bg-(--sidebar_hover_color)"
        onClick={onHambergerClick}
      >
        <CrossButton buttonref={buttonref} />
      </div>
      <ul className="flex grow-1 flex-col pt-3">
        <a
          className="block pl-7 text-2xl text-(--hamberger_child_color) no-underline hover:bg-(--sidebar_hover_color)"
          href={"/"}
        >
          Browse Movie
        </a>
        <a
          className={`block pl-7 text-2xl text-(--hamberger_child_color) no-underline ${dropClicked ? "bg-(--selected_sidebar_color)" : "hover:bg-(--sidebar_hover_color)"}`}
          onClick={handleDropClick}
        >
          About
          <RiArrowDropDownLine
            className={`inline h-9 w-9 text-[white] ${dropClicked ? "rotate-180" : null}`}
          />
        </a>

        <DropDown dropClicked={dropClicked} />
        <a
          className="block pl-7 text-2xl text-(--hamberger_child_color) no-underline hover:bg-(--sidebar_hover_color)"
          href=""
        >
          test
        </a>
        <div className="block grow-1"></div>

        {status === "unauthenticated" ? (
          <Link
            href="/sign-in"
            onClick={() => {
              setIsSideBarOpen((val: boolean) => !val);
            }}
            className="flex items-center gap-1.5 py-4 pl-7 text-2xl text-(--hamberger_child_color) no-underline"
          >
            <MdOutlineLogin />
            login
          </Link>
        ) : (
          <AuthDetailLayer />
        )}
      </ul>
    </div>
  );
}
