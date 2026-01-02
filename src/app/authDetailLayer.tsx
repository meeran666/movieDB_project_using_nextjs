import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";

export default function AuthDetailLayer() {
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  const { data: session } = useSession();

  const name = session?.user?.username || session?.user?.name;
  const nameFirstChar = name?.[0].toUpperCase();
  const email = session?.user?.email;
  const onSignout = async () => {
    console.log("custom-signout");
    await axios("/api/custom-signout");
    signOut();
  };
  return (
    <>
      <div
        className={`grid overflow-hidden duration-300 ease-in-out ${isAuthButtonClicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 bg-amber-500">
          <div className="flex flex-col items-center p-4">
            <div className="flex flex-col items-center gap-2 pb-7">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-orange-400 pb-2">
                <div className="text-[2.6rem]">{nameFirstChar}</div>
              </div>
              <div className="">{name}</div>
            </div>
            <div className="border-b-amber-200">{email}</div>
            <div className="flex items-center">
              <CgLogOut className="" />
              <div onClick={onSignout} className="">
                logout
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() =>
          setIsAuthButtonClicked((isAuthButtonClicked) => !isAuthButtonClicked)
        }
        className="flex py-4 pl-7 text-2xl text-(--hamberger_child_color) no-underline"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 pb-1">
          <div className="text-[1rem]">{nameFirstChar}</div>
        </div>
        <div className="w-40 overflow-hidden pl-2 text-[1.2rem] text-ellipsis whitespace-nowrap">
          {name}
        </div>
      </div>
    </>
  );
}
