import { RefObject } from "react";

type ButtonProp = {
  buttonref: RefObject<HTMLDivElement | null>;
};
export default function CrossButton({ buttonref }: ButtonProp) {
  return (
    <>
      <div ref={buttonref} className="relative h-10 w-10 grow-0">
        <div
          className="absolute top-1/2 left-1/2 h-[0.1rem] w-4 origin-center rotate-45 bg-white"
          style={{
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 h-[0.1rem] w-4 origin-center rotate-45 bg-white"
          style={{
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        ></div>
      </div>
    </>
  );
}
