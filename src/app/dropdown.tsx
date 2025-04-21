type DropDownProp = {
  isDropped: boolean;
  isHoverAbout: boolean;
};
export default function DropDown({ isDropped, isHoverAbout }: DropDownProp) {
  return (
    <div
      className={`absolute grid w-30 overflow-hidden shadow-md shadow-white duration-300 ease-in-out ${isDropped || isHoverAbout ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="min-h-0 bg-[rgb(145,180,48)]">
        <a className="text-1xl flex h-10 content-center items-center hover:bg-amber-200">
          test1
        </a>
        <a className="text-1xl flex h-10 content-center items-center hover:bg-amber-200">
          test2
        </a>
      </div>
    </div>
  );
}
