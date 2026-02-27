"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useDebounce } from "use-debounce";
import { signUpSchema } from "@/src/schemas/signUpSchema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SignupApiResponse } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [username, setUsername] = useState<string>("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debouncedUsername] = useDebounce(username, 300);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get<SignupApiResponse>(
            `/api/check-username-unique?username=${debouncedUsername}`,
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<SignupApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username",
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<SignupApiResponse>(
        "/api/sign-up",
        data,
      );

      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 7000,
        theme: "colored",
      });

      router.replace(`/verify/${data.username}`);

      setIsSubmitting(false);
    } catch (error) {
      const axiosError = error as AxiosError<SignupApiResponse>;

      // Default error message
      const errorMessage =
        axiosError.response?.data.message ||
        "There was a problem with your sign-up. Please try again.";

      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 7000,
        theme: "colored",
      });

      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex h-[94vh] items-center justify-center bg-[rgb(2,48,32)]">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-md md:rounded-lg">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Join True AI journey
          </h1>
          <p className="mb-4">Sign up to access AI features</p>
        </div>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="">
            <label htmlFor="username">Username</label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("username")}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {isCheckingUsername && <Loader2 className="animate-spin" />}
            {!isCheckingUsername && usernameMessage && (
              <p
                className={`text-sm ${
                  usernameMessage === "Username is unique"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {usernameMessage}
              </p>
            )}
          </div>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              id="email"
              {...register("email")}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="">
            <label htmlFor="Password">Password</label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="Password"
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            {`Already a member? `}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
