import { useRouter } from "next/navigation";

export default function AuthNonDropdownLayer() {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <button
        className={`h-10 cursor-pointer content-center rounded-full bg-blue-500/50 px-2 text-xl text-white shadow-lg shadow-cyan-500/50`}
        onClick={() => {
          router.replace("/sign-in");
        }}
      >
        login
      </button>
    </div>
  );
}
