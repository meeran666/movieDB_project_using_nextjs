import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { LatoFont, OswaldFont } from "../fonts";
import Image from "next/image";

export default function AuthDropdownLayer() {
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  const { data, status } = useSession();
  const user = data?.user;
  const id = user?.id;
  const name = user?.name;
  const nameFirstChar = name?.[0].toUpperCase();
  const email = user?.email;
  const llmtoken = user?.llmTokens;
  const requests = user?.requests;

  useEffect(() => {
    if (!isAuthButtonClicked) {
      return;
    }
  }, [isAuthButtonClicked, id]);

  const onSignout = async () => {
    signOut();
  };
  if (status === "loading") return null;
  return (
    <div className="">
      <div
        onClick={() =>
          setIsAuthButtonClicked((isAuthButtonClicked) => !isAuthButtonClicked)
        }
        className="flex h-15.5 items-center py-3 text-(--hamberger_child_color) no-underline 2xl:h-20"
      >
        <button
          className={`${LatoFont.className} flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-orange-700 text-xl 2xl:h-10 2xl:w-10 2xl:text-2xl`}
        >
          {nameFirstChar}
        </button>
      </div>
      <div
        className={`${OswaldFont.className} absolute right-0 z-2 grid overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-xs shadow-white duration-300 ease-in-out ${isAuthButtonClicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} `}
      >
        <div className="min-h-0">
          <div className="flex flex-col items-center p-7">
            <div className="flex flex-col items-center gap-2 pb-7">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-orange-700 pb-2">
                <div className={`${LatoFont.className} text-5xl`}>
                  {nameFirstChar}
                </div>
              </div>
              <div className="">{name}</div>
            </div>
            <div className="pb-3">{email}</div>
            <div className="">{`tokens left: ${llmtoken}`}</div>
            <div className="">{`no of requests left: ${requests}`}</div>

            <button
              onClick={onSignout}
              className="mt-4 flex h-9 w-29 cursor-pointer items-center justify-center rounded-full bg-(--violet_color)"
            >
              <Image
                src="/logout.png"
                width={3}
                height={3}
                alt="logout.png"
                className="mr-2 h-3 w-3"
              />
              <div className="h-9">logout</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
