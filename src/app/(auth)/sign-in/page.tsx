"use client";
import { FcGoogle } from "react-icons/fc";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signInSchema } from "@/src/schemas/signInSchema";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const { register, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast.warn("Incorrect username or password", {
          position: "bottom-right",
          autoClose: 7000,
        });
      } else {
        toast.warn(result.error, {
          position: "bottom-right",
          autoClose: 7000,
        });
      }
    }
    if (result?.url) {
      router.replace("/");
    }
  };
  const googleSignIn = async () => {
    signIn("google");
  };
  return (
    <div className="flex h-[75vh] items-center justify-center bg-[rgb(2,48,32)]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sign in for AI use
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <form className="space-y-6" action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="identifier"
            >
              Email/Username
            </label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("identifier")}
              id="identifier"
              type="text"
            ></input>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("password")}
              id="password"
              type="text"
            ></input>
          </div>
          <div className="">
            <button className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
              Sign In
            </button>
            <div className="flex">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
              <div className="grow-1"></div>
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
        <button
          className="ring-offset-background focus-visible:ring-ring text-primary-foreground hover:bg-primary/90 bg-primary inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          onClick={googleSignIn}
        >
          <div className="">
            <FcGoogle className="h-10 w-10 pr-4" />
          </div>
          Log in with Google
        </button>
      </div>
    </div>
  );
}
