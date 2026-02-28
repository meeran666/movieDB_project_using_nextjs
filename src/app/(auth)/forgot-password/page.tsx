"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { sendEmailSchema } from "@/src/schemas/forgotPasswordSchema";
import { useState } from "react";
import FirstStepForm from "./firstStepForm";
import SecondStepForm from "./secondStepForm";

export default function SignInForm() {
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const formEmail = useForm<z.infer<typeof sendEmailSchema>>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    watch: watchEmail,
    formState: { errors: errorsEmail, isValid: isValidEmail },
  } = formEmail;

  const email = watchEmail("email");

  return (
    <div className="flex h-[94vh] items-center justify-center bg-[rgb(2,48,32)]">
      <div className="flex w-full max-w-md flex-col space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Reset password
          </h1>
          {isCodeVerified ? (
            <p className="mb-4">
              Enter a new password below to change your password for {email}.
            </p>
          ) : (
            <p className="mb-4">
              Enter your email address and we will send you a verification code
              to reset your password.
            </p>
          )}
        </div>
        <div className="space-y-6">
          {isCodeVerified ? (
            <SecondStepForm email={email} />
          ) : (
            <FirstStepForm
              handleSubmitEmail={handleSubmitEmail}
              registerEmail={registerEmail}
              errorsEmail={errorsEmail}
              setIsCodeVerified={setIsCodeVerified}
              isValidEmail={isValidEmail}
              email={email}
            />
          )}
        </div>
        <div className="flex w-full justify-center">
          {isCodeVerified ? (
            <button
              onClick={() => setIsCodeVerified(false)}
              className="cursor-pointer font-bold text-blue-600"
            >
              Get back
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
