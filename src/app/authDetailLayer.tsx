import { signOut } from "next-auth/react";
import { LatoFont, OswaldFont } from "./fonts";
import { User } from "next-auth";
import Image from "next/image";

export default function AuthDetailLayer({
  user,
  isAuthButtonClicked,
  status,
}: {
  user?: User;
  isAuthButtonClicked: boolean;
  status: "authenticated" | "loading" | "unauthenticated";
}) {
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
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  return (
    <div
      className={`grid overflow-hidden ${OswaldFont.className} duration-300 ease-in-out ${isAuthButtonClicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="min-h-0 bg-slate-600 text-(--hamberger_child_color)">
        <div className="flex flex-col items-center p-4">
          <div className="flex flex-col items-center gap-2 pb-7">
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-orange-700">
              <div className={`${LatoFont.className} text-3xl`}>
                {nameFirstChar}
              </div>
            </div>
            <div className="">{name}</div>
          </div>
          <div>{email}</div>
          <div>{`tokens: ${llmtoken}`}</div>
          <div>{`no of requests: ${requests}`}</div>

          <button
            className="mt-4 flex h-8 w-29 cursor-pointer items-center justify-center rounded-full bg-(--violet_color)"
            onClick={onSignout}
          >
            <Image
              src="/logout.png"
              width={3}
              height={3}
              alt="logout.png"
              className="mr-1 h-3 w-3"
            />
            <div className="">logout</div>
          </button>
        </div>
      </div>
    </div>
  );
}
