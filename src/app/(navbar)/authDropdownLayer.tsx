import axios from "axios";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { Courier_Prime, Lato, Oswald } from "next/font/google";

const courierPrime = Lato({
  subsets: ["latin"],
  weight: "700", // Courier Prime supports 400, 700 (bold), 400-italic, 700-italic
});
const courierPrime1 = Oswald({
  subsets: ["latin"],
  weight: "400", // Courier Prime supports 400, 700 (bold), 400-italic, 700-italic
});

export default function AuthDropdownLayer() {
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  // const [sessionUser, setSessionUser] = useState<null | Session["user"]>(null);

  const { data } = useSession();
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

  return (
    <div className="">
      <div
        onClick={() =>
          setIsAuthButtonClicked((isAuthButtonClicked) => !isAuthButtonClicked)
        }
        className="flex h-15.5 items-center py-3 text-2xl text-(--hamberger_child_color) no-underline"
      >
        <button
          className={`${courierPrime.className} flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-orange-700 text-xl`}
        >
          {nameFirstChar}
        </button>
      </div>
      <div
        className={`${courierPrime.className} absolute right-0 z-2 grid overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-xs shadow-white duration-300 ease-in-out ${isAuthButtonClicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} `}
      >
        <div className="min-h-0">
          <div className="flex flex-col items-center p-7">
            <div className="flex flex-col items-center gap-2 pb-7">
              <div className="flex h-18 w-18 items-center justify-center rounded-full bg-orange-700 pb-2">
                <div className={`${courierPrime.className} text-5xl`}>
                  {nameFirstChar}
                </div>
              </div>
              <div className="">{name}</div>
            </div>
            <div className="border-b-amber-200 pb-3">{email}</div>
            <div className="border-b-amber-200">{`tokens: ${llmtoken}`}</div>
            <div className="border-b-amber-200">{`no of requests: ${requests}`}</div>

            <button className="mt-4 flex h-8 w-24 cursor-pointer items-center justify-center rounded-full bg-blue-500">
              <CgLogOut className="" />
              <div onClick={onSignout} className="">
                logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
