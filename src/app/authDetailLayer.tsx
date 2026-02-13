import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { LatoFont } from "./fonts";

export default function AuthDetailLayer() {
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  const { data, status } = useSession();
  const user = data?.user;
  const id = user?.id;
  const name = user?.name;
  const nameFirstChar = name?.[0].toUpperCase();
  const email = user?.email;
  const llmtoken = user?.llmTokens;
  const requests = user?.requests;

  const onSignout = async () => {
    signOut();
  };
  if (status === "loading")
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  return (
    <>
      <div
        className={`grid overflow-hidden duration-300 ease-in-out ${isAuthButtonClicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 bg-slate-600 text-(--hamberger_child_color)">
          <div className="flex flex-col items-center p-4">
            <div className="flex flex-col items-center gap-2 pb-7">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-orange-700 pb-2">
                <div className={`${LatoFont.className} text-5xl`}>
                  {nameFirstChar}
                </div>{" "}
              </div>
              <div className="">{name}</div>
            </div>
            <div className="">{email}</div>
            <div className="">{`tokens: ${llmtoken}`}</div>
            <div className="">{`no of requests: ${requests}`}</div>

            <button className="mt-4 flex h-8 w-24 cursor-pointer items-center justify-center rounded-full bg-(--violet_color)">
              <CgLogOut className="" />
              <div onClick={onSignout} className="">
                logout
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() =>
          setIsAuthButtonClicked((isAuthButtonClicked) => !isAuthButtonClicked)
        }
        className="flex py-4 pl-7 text-2xl text-(--hamberger_child_color) no-underline"
      >
        <button
          className={`${LatoFont.className} flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-orange-700 text-xl`}
        >
          {nameFirstChar}
        </button>
      </div>
    </>
  );
}
