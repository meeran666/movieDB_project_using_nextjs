import { RefObject } from "react";

type ButtonProp = {
  buttonref: RefObject<HTMLDivElement | null>;
};
export default function CrossButton({ buttonref }: ButtonProp) {
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
