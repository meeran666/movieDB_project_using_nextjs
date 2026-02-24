import { useRouter } from "next/navigation";

export default function AuthNonDropdownLayer() {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <button
        className={`h-10 cursor-pointer content-center rounded-full bg-blue-500/50 px-2 text-xl font-bold text-white shadow-lg shadow-cyan-500/50 2xl:h-12 2xl:w-17`}
        onClick={() => {
          router.replace("/sign-in");
        }}
      >
        login
      </button>
    </div>
  );
}
