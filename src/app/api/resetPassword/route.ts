import { db } from "@/lib/db";
import { authTable } from "@/src/drizzle/models";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password2 } = await request.json();
    const hashedPassword = await bcrypt.hash(password2, 10);

    await db
      .update(authTable)
      .set({ password: hashedPassword })
      .where(and(eq(authTable.email, email), eq(authTable.isVerified, true)))
      .returning();
    return Response.json(
      { success: false, message: "reset password succesfull" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error reseting password: ", error);
    return Response.json(
      { success: false, message: "reset password succesfull" },
      { status: 200 },
    );
  }
}
