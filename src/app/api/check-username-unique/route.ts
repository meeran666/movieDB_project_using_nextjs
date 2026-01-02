import { db } from "@/lib/db";
import { authTable } from "@/src/drizzle/models";
import { z } from "zod";
import { usernameValidation } from "@/src/schemas/signUpSchema";
import { and, eq } from "drizzle-orm";
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 },
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await db
      .select()
      .from(authTable)
      .where(
        and(eq(authTable.username, username), eq(authTable.isVerified, true)),
      );

    if (existingVerifiedUser.length !== 0) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 },
    );
  }
}
