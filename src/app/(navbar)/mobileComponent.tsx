import { RefObject } from "react";

type HambergerClick = {
  onHambergerClick: () => void;
};

type MobileComponentProp = HambergerClick & {
  buttonref: RefObject<HTMLDivElement | null>;
};

export default function MobileComponent({
  onHambergerClick,
  buttonref,
}: MobileComponentProp) {
  return (
    <div
      className="flex flex-col gap-1"
      onClick={onHambergerClick}
      ref={buttonref}
    >
      <div className="h-1 w-4 rounded-sm bg-[cyan]"></div>
      <div className="h-1 w-4 rounded-sm bg-[cyan]"></div>
      <div className="h-1 w-4 rounded-sm bg-[cyan]"></div>
    </div>
  );
}
