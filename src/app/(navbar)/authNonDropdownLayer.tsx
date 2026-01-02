import { useRouter } from "next/navigation";

export default function AuthNonDropdownLayer() {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <button
        className={`h-10 cursor-pointer content-center rounded-full bg-blue-500/50 px-[10px] text-[20px] text-[white] shadow-lg shadow-blue-500/50 shadow-cyan-500/50`}
        onClick={() => {
          router.replace("/sign-in");
        }}
      >
        login
      </button>
    </div>
  );
}
