import Link from "next/link";
function Option({ children, route }: { children: string; route: string }) {
  return (
    <Link
      href={route}
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
        <Option route="/Introduction">Introduction</Option>
        <Option route="/DatabaseDesign">Database Design</Option>
        <Option route="/AiSearch">Ai Search</Option>
      </div>
    </div>
  );
}
