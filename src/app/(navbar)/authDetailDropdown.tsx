import { signOut } from "next-auth/react";
import { CgLogOut } from "react-icons/cg";
type AuthDetialDropdownProp = {
  name: string | undefined;
  nameFirstChar: string | undefined;
  email: string | undefined;
  isAuthButtonClicked: boolean;
};

export default function AuthDetailDropdown({
  name,
  nameFirstChar,
  email,
  isAuthButtonClicked,
}: AuthDetialDropdownProp) {
  return (
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
  );
}
