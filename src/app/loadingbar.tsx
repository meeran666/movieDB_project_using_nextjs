"use client";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { WrappedMovieListType } from "./api/types";

// export default function Loadingbar({
//   isClicked,
//   result,
//   setIsClicked,
// }: {
//   isClicked: boolean;
//   result: WrappedMovieListType | null;
//   setIsClicked: Dispatch<SetStateAction<boolean>>;
// }) {
//   const [prog_width, setProg_width] = useState<number>(0);
//   useEffect(() => {
//     let end = 75;
//     let delay = 50;
//     if (result != null) {
//       console.log("woun");
//       end = 101;
//       delay = 100;
//     }
//     if (isClicked == true) {
//       console.log("ds");
//       const id = setInterval(frame, delay);
//       function frame() {
//         setProg_width((prev) => {
//           if (prev >= end) {
//             clearInterval(id);
//             // setIsClicked(false);
//             setProg_width(0);

//             return prev;
//           } else {
//             return prev + 1;
//           }
//         });
//       }
//     }
//   }, [isClicked, result, setIsClicked]);

//   return (
//     <div className="flex h-[0.2rem] w-[100dvw]">
//       <div
//         className={`width_id bg-(--violet_color)`}
//         style={{ width: `${prog_width}%` }}
//       ></div>
//       <div className="grow bg-[red]"></div>;
//     </div>
//   );
// }

export default function Loadingbar() {
  return <></>;
}
