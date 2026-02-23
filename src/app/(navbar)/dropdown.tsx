import Link from "next/link";
function Option({ children }: { children: string }) {
  return (
    <Link
      href="/Introduction"
      className="text-1xl flex h-13 content-center items-center pl-2 font-medium text-white"
    >
      <div className="flex h-12 w-54 items-center justify-center rounded-md border-0 hover:bg-[rgb(23,103,96)]">
        {children}
      </div>
    </Link>
  );
}
export default function DropDown({ isHoverAbout }: { isHoverAbout: boolean }) {
  return (
    <div
      className={`absolute z-2 grid w-57 overflow-hidden shadow-xs shadow-white duration-300 ease-in-out ${isHoverAbout ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="min-h-0 bg-neutral-800">
        <Option>Introduction</Option>
        <Option>Database Design</Option>
        <Option>Ai Search</Option>
      </div>
    </div>
  );
}
