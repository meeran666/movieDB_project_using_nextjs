import React from "react";

export default function Documentation() {
  return (
    <div className="flex w-dvw justify-center bg-[black]">
      <div className="relative h-500 w-[70rem] bg-amber-800">
        <div className="fixed right-0 flex h-100 w-70 flex-col items-center justify-self-end bg-[green]">
          <div className="flex flex-col items-center">
            <div className="flex w-60 pl-2 text-2xl text-white">About</div>
            <div className="flex w-60 pl-2 text-xl text-white hover:rounded-[5px] hover:bg-green-500">
              Introduction
            </div>
            <div className="flex w-60 pl-2 text-xl text-white hover:rounded-[5px] hover:bg-green-500">
              text2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
