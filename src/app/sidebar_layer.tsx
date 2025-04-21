import { RiArrowDropDownLine } from "react-icons/ri";
import { RefObject, useState } from "react";

type SidebarLayerProp = {
  onHambergerClick: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  buttonref: RefObject<HTMLDivElement | null>;
};
type ButtonProp = {
  buttonref: RefObject<HTMLDivElement | null>;
};
function DropDown() {
  return (
    <>
      <div className="">
        <a className="block pl-7 text-[1.3rem] text-(--hamberger_child_color) hover:bg-(--sidebar_hover_color)">
          Introduction
        </a>
        <a className="block pl-7 text-[1.3rem] text-(--hamberger_child_color) hover:bg-(--sidebar_hover_color)">
          second part
        </a>
      </div>
    </>
  );
}
function CrossButton({ buttonref }: ButtonProp) {
  return (
    <>
      <div ref={buttonref} className="relative h-10 w-10 grow-0">
        <div
          className="absolute top-[50%] left-[50%] h-[0.1rem] w-[1rem] origin-center rotate-[45] bg-white"
          style={{
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        ></div>
        <div
          className="absolute top-[50%] left-[50%] h-[0.1rem] w-[1rem] origin-center rotate-[45] bg-white"
          style={{
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        ></div>
      </div>
    </>
  );
}
export default function SidebarLayer({
  onHambergerClick,
  sidebarRef,
  isSidebarOpen,
  buttonref,
}: SidebarLayerProp) {
  const [dropClicked, setDropClicked] = useState(false);
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
      <ul className="pt-3">
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
        <div
          className={`h-0 overflow-hidden duration-300 ease-in-out ${dropClicked ? "h-16" : null}`}
        >
          <DropDown />
        </div>
        <a
          className="block pl-7 text-2xl text-(--hamberger_child_color) no-underline hover:bg-(--sidebar_hover_color)"
          href=""
        >
          test
        </a>
      </ul>
    </div>
  );
}
