import { toast } from "react-toastify";
import { ForgotPasswordApiResponse, SignupApiResponse } from "../../api/types";
import axios, { AxiosError } from "axios";
import { verifySchema } from "@/src/schemas/verifySchema";
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  sendCodeSchema,
  sendEmailSchema,
} from "@/src/schemas/forgotPasswordSchema";
import { Dispatch, SetStateAction } from "react";

export default function FirstStepForm({
  handleSubmitEmail,
  registerEmail,
  errorsEmail,
  setIsCodeVerified,
  isValidEmail,
  email,
}: {
  handleSubmitEmail: UseFormHandleSubmit<
    {
      email: string;
    },
    {
      email: string;
    }
  >;
  registerEmail: UseFormRegister<{
    email: string;
  }>;
  errorsEmail: FieldErrors<{
    email: string;
  }>;
  setIsCodeVerified: Dispatch<SetStateAction<boolean>>;
  isValidEmail: boolean;
  email: string;
}) {
  const formCode = useForm<z.infer<typeof sendCodeSchema>>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });
  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: errorsCode },
    setValue: setValueCode,
  } = formCode;

  const onSubmitEmail = async (data: z.infer<typeof sendEmailSchema>) => {
    try {
      const response = await axios.post<ForgotPasswordApiResponse>(
        `/api/verify-email`,
        data,
      );
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 7000,
        theme: "colored",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ForgotPasswordApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ||
        "There was a problem with sending you a Code. Please try again.";

      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 7000,
        theme: "colored",
      });
    }
  };

  const onSubmitCode = async (data: z.infer<typeof verifySchema>) => {
    if (!isValidEmail) {
      return;
    }
    try {
      const response = await axios.post<SignupApiResponse>(`/api/verify-code`, {
        code: data.code,
        email: email,
      });
      setValueCode("code", "");
      setIsCodeVerified(true);
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 7000,
        theme: "colored",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ForgotPasswordApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ||
        "There was a problem with sending you a Code. Please try again.";

      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 7000,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmitEmail(onSubmitEmail)}>
        <label
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          {...registerEmail("email")}
          id="email"
          type="text"
        ></input>

        <p className="text-red-500">{errorsEmail.email?.message}</p>
        <button
          type="submit"
          className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 mt-2.5 inline-flex h-10 w-26 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Send Code
        </button>
      </form>
      <form className="space-y-2" onSubmit={handleSubmitCode(onSubmitCode)}>
        <label
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="code"
        >
          Code
        </label>
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          {...registerCode("code")}
          id="code"
          type="text"
        ></input>
        <p className="text-red-500">{errorsCode.code?.message}</p>
        <button
          type="submit"
          className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 mt-2.5 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </>
  );
}
