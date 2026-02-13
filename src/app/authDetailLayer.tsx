import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";

export default function AuthDetailLayer() {
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  const { data: session, status } = useSession();

  const name = session?.user?.name;
  const nameFirstChar = name?.[0].toUpperCase();
  const email = session?.user?.email;
  const llmtoken = session?.user?.llmTokens;

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
        <div className="min-h-0 bg-zinc-900 text-(--hamberger_child_color)">
          <div className="flex flex-col items-center p-4">
            <div className="flex flex-col items-center gap-2 pb-7">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-orange-700 pb-2">
                <div className="text-5xl">{nameFirstChar}</div>
              </div>
              <div className="">{name}</div>
            </div>
            <div className="border-b-amber-200">{email}</div>
            <div className="border-b-amber-200">{llmtoken}</div>
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
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-700 pb-1">
          <div className="text-xl">{nameFirstChar}</div>
        </div>
        <div className="w-40 overflow-hidden pl-2 text-xl text-ellipsis whitespace-nowrap">
          {name}
        </div>
      </div>
    </>
  );
}
