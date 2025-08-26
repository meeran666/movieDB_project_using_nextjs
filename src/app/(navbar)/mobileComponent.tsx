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
      className="flex flex-col gap-[3px]"
      onClick={onHambergerClick}
      ref={buttonref}
    >
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
    </div>
  );
}
