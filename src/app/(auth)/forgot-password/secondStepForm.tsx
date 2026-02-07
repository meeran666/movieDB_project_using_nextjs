import { sendPasswordSchema } from "@/src/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ForgotPasswordApiResponse } from "../../../../types/types";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SecondStepForm({ email }: { email: string }) {
  // email = "meeran.equebal@gmail.com";
  const formCode = useForm<z.infer<typeof sendPasswordSchema>>({
    resolver: zodResolver(sendPasswordSchema),
    defaultValues: {
      password1: "",
      password2: "",
    },
    mode: "onChange",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = formCode;
  const password1 = watch("password1");
  const { onChange, ...rest } = register("password2");
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof sendPasswordSchema>) => {
    try {
      const response = await axios.post<ForgotPasswordApiResponse>(
        `/api/resetPassword`,
        { ...data, email },
      );
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 7000,
        theme: "colored",
      });
      router.replace("/sign-in");
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
  const onChangePassword2 = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    const password2 = event.target.value;
    const splitlength = password2.length;
    if (password1.substring(0, splitlength) !== password2) {
      console.log("okwow");
      setIsPasswordSame(false);
    } else {
      setIsPasswordSame(true);
    }
  };
  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          {...register("password1")}
          id="email"
          type="text"
        ></input>
        <p className="text-red-500">{errors.password1?.message}</p>
      </div>
      <div className="mb-14">
        <input
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          {...rest}
          onChange={onChangePassword2}
          id="email"
          type="text"
        ></input>
        <p className="text-red-500">
          {isPasswordSame ? errors.password2?.message : "password is not same"}
        </p>
      </div>
      <button
        type="submit"
        className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 mt-2.5 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        Reset Password
      </button>
    </form>
  );
}
