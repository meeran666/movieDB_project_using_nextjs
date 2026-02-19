import { Resend } from "resend";
import VerificationEmail from "./verificationEmail";
import { SignupApiResponse } from "@/types/types";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<SignupApiResponse> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      // from: "support@moviemania.example.com",
      to: email,
      subject: "Mystery Message Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
