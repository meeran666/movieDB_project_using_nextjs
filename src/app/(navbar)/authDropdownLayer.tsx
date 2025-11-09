import { useSession } from "next-auth/react";
import AuthDetailDropdown from "./authDetailDropdown";
import { useState } from "react";

export default function AuthDropdownLayer() {
  const [isAuthButtonClicked, setIsAuthButtonClicked] = useState(false);
  const { data: session } = useSession();

  const name = session?.user?.username || session?.user?.name;
  const nameFirstChar = name?.[0].toUpperCase();
  const email = session?.user?.email;

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
      <AuthDetailDropdown
        name={name}
        nameFirstChar={nameFirstChar}
        email={email}
        isAuthButtonClicked={isAuthButtonClicked}
      />
    </div>
  );
}
