import { db } from "@/lib/db";
import { authTable } from "@/src/drizzle/models";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    //finding any username already contanin in database
    const existingNonVerifiedUserByUsername = await db
      .select()
      .from(authTable)
      .where(eq(authTable.username, username));
    if (existingNonVerifiedUserByUsername.length !== 0) {
      //username comming from request.json is not unique

      const existingVerifiedUserByUsername = await db
        .select()
        .from(authTable)
        .where(
          and(
            eq(authTable.id, existingNonVerifiedUserByUsername[0].id),
            eq(authTable.isVerified, true),
          ),
        );
      if (existingVerifiedUserByUsername.length !== 0) {
        // if not unique username comming from request.json is verified
        //not updateing the username row
        return Response.json(
          {
            success: false,
            message: "Username is already taken",
          },
          { status: 400 },
        );
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const existingUserByEmail = await db
      .select()
      .from(authTable)
      .where(eq(authTable.email, email));

    if (existingUserByEmail.length !== 0) {
      if (existingUserByEmail[0].isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 },
        );
      } else {
        const date = new Date(Date.now() + 3600000);
        await db
          .update(authTable)
          .set({
            username: username,
            password: hashedPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: date.toISOString(),
          })
          .where(eq(authTable.id, existingUserByEmail[0].id));
      }
    } else {
      const expiryDate = new Date(Date.now() + 36000000);
      await db
        .insert(authTable)
        .values({
          username: username,
          email: email,
          password: hashedPassword,
          verifyCode: verifyCode,
          verifyCodeExpiry: expiryDate.toISOString(),
          isVerified: false,
        })
        .onConflictDoUpdate({
          target: authTable.id,
          set: {
            username: username,
            email: email,
            password: hashedPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: expiryDate.toISOString(),
            isVerified: false,
          },
        });
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
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
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 },
    );
  }
}
