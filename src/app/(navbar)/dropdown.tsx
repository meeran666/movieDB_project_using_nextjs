import Link from "next/link";

export default function DropDown({ isHoverAbout }: { isHoverAbout: boolean }) {
  return (
    <div
      className={`absolute z-2 grid w-43 overflow-hidden shadow-xs shadow-white duration-300 ease-in-out ${isHoverAbout ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="min-h-0 bg-neutral-800">
        <Link
          href="/Introduction"
          className="text-1xl flex h-10 content-center items-center pl-2 font-medium text-white"
        >
          <div className="flex h-9 w-37 items-center justify-center rounded-md border-0 hover:bg-[rgb(23,103,96)]">
            Introduction
          </div>
        </Link>
        <Link
          href="/DatabaseDesign"
          className="text-1xl ` flex h-10 content-center items-center pl-2 font-medium text-white"
        >
          <div className="flex h-9 w-37 items-center justify-center rounded-md border-0 hover:bg-[rgb(23,103,96)]">
            Database Design
          </div>
        </Link>
        <Link
          href="/AiSearch"
          className="text-1xl flex h-10 content-center items-center pl-2 font-medium text-white"
        >
          <div className="flex h-9 w-37 items-center justify-center rounded-md border-0 hover:bg-[rgb(23,103,96)]">
            Ai Search
          </div>
        </Link>
      </div>
    </div>
  );
}
