import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { db } from "@/lib/db";
import { authTable } from "@/src/drizzle/models";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const existingUser = await db
      .select()
      .from(authTable)
      .where(and(eq(authTable.email, email), eq(authTable.isVerified, true)));

    if (existingUser.length === 0) {
      return Response.json(
        {
          success: false,
          message: "This Email is not registered",
        },
        { status: 400 },
      );
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const date = new Date(Date.now() + 3600000);

    //updateing the field with verify code of existing email

    await db
      .update(authTable)
      .set({
        verifyCode: verifyCode,
        verifyCodeExpiry: date.toISOString(),
      })
      .where(eq(authTable.id, existingUser[0].id));

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      existingUser[0].username!,
      verifyCode,
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Code has been sent to your email",
      },
      { status: 200 },
    );
  } catch (error) {
    // console.error("Error checking email:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking email",
      },
      { status: 500 },
    );
  }
}
