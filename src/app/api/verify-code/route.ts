import { authTable } from "@/src/drizzle/models";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { username, email, code } = await request.json();
    const decodedValue = decodeURIComponent(username ? username : email);
    const columnbName = username ? authTable.username : authTable.email;
    const user = await db
      .select()
      .from(authTable)
      .where(eq(columnbName, decodedValue));

    if (user.length === 0 || user[0].verifyCodeExpiry === null) {
      const message = username
        ? "User not found, please first register your self"
        : "this Email is not registered, please first register the email";
      return Response.json(
        { success: false, message: message },
        { status: 400 },
      );
    }

    // Check if the code is correct and not expired

    const isCodeValid = user[0]?.verifyCode === code;

    const isCodeNotExpired = new Date(user[0].verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      await db
        .update(authTable)
        .set({ isVerified: true })
        .where(eq(authTable.id, user[0].id));

      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 },
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 },
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 },
    );
  }
}
