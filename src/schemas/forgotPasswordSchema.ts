import { z } from "zod";

export const sendEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const sendCodeSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

export const sendPasswordSchema = z.object({
  password1: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),

  password2: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
