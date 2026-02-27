"use client";

import { SignupApiResponse } from "@/types/types";
import { verifySchema } from "@/src/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const { register, handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<SignupApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 7000,
      });

      if (response.status === 200) {
        router.replace("/sign-in");
      }
    } catch (error) {
      const axiosError = error as AxiosError<SignupApiResponse>;
      toast.warn(axiosError.response?.data.message, {
        position: "bottom-right",
        autoClose: 7000,
      });
    }
  };

  return (
    <div className="flex h-[94vh] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="verify"
            >
              Verification Code
            </label>
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              {...register("code")}
              id="verify"
            ></input>
          </div>
          <button
            type="submit"
            className="ring-offset-background focus-visible:rinsrc/app/(auth)/sign-instify-center rounded-md bg-black px-4 py-2 text-sm font-bold whitespace-nowrap text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            verify
          </button>
        </form>
      </div>
    </div>
  );
}
