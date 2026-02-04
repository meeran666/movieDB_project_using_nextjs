import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";

export default function AuthDropdownLayer() {
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  // const [sessionUser, setSessionUser] = useState<undefined | Session["user"]>(
  //   undefined,
  // );
  const { data } = useSession();
  const user = data?.user;
  const name = user?.name;
  const nameFirstChar = name?.[0].toUpperCase();
  const email = user?.email;
  const llmtoken = user?.llmTokens;
  const requests = user?.requests;

  // useEffect(() => {
  //   if (isAuthButtonClicked) {
  //     const { data } = useSession();
  //     setSessionUser(data?.user);
  //   }
  // }, [isAuthButtonClicked]);

  return (
    <div className="">
      <div
        onClick={() =>
          setIsAuthButtonClicked((isAuthButtonClicked) => !isAuthButtonClicked)
        }
        className="flex h-15.5 items-center py-3 text-2xl text-(--hamberger_child_color) no-underline"
      >
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-orange-400 pb-1">
          <div className="text-[1rem]">{nameFirstChar}</div>
        </button>
      </div>
      <div
        className={`absolute right-0 z-2 grid overflow-hidden rounded-2xl bg-amber-500 shadow-md shadow-white duration-300 ease-in-out ${isAuthButtonClicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0">
          <div className="flex flex-col items-center p-4">
            <div className="flex flex-col items-center gap-2 pb-7">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-orange-400 pb-2">
                <div className="text-[2.6rem]">{nameFirstChar}</div>
              </div>
              <div className="">{name}</div>
            </div>
            <div className="border-b-amber-200 pb-3">{email}</div>
            <div className="border-b-amber-200">{llmtoken}</div>
            <div className="border-b-amber-200">{requests}</div>

            <button className="flex h-8 w-24 cursor-pointer items-center justify-center rounded-full bg-blue-500">
              <CgLogOut className="" />
              <div
                onClick={() => {
                  signOut();
                }}
                className=""
              >
                logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
