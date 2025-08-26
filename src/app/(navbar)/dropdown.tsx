import Link from "next/link";

type DropDownProp = {
  isHoverAbout: boolean;
};
export default function DropDown({ isHoverAbout }: DropDownProp) {
  return (
    <div
      className={`absolute z-2 grid w-35 overflow-hidden shadow-md shadow-white duration-300 ease-in-out ${isHoverAbout ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="min-h-0 bg-[rgb(46,177,166)]">
        <Link
          href="/Introduction"
          className="text-1xl flex h-10 content-center items-center pl-2 font-medium text-white hover:bg-[rgb(23,103,96)]"
        >
          Introduction
        </Link>
        <Link
          href="/DatabaseDesign"
          className="text-1xl hover:bg-[rgb(23,103,96)]` flex h-10 content-center items-center pl-2 font-medium text-white hover:bg-[rgb(23,103,96)]"
        >
          Database Design
        </Link>
        <Link
          href="/FutureUpdate"
          className="text-1xl flex h-10 content-center items-center pl-2 font-medium text-white hover:bg-[rgb(23,103,96)]"
        >
          Future Update
        </Link>
        <Link
          href="/sign-up"
          className="text-1xl flex h-10 content-center items-center pl-2 font-medium text-white hover:bg-[rgb(23,103,96)]"
        >
          sign-up
        </Link>
      </div>
    </div>
  );
}
