// pages/api/custom-signout.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authTable } from "@/src/drizzle/models";

export default async function GET(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.email) {
    console.log(session?.user?.email);

    await db.delete(authTable).where(eq(authTable.email, session.user.email));
  }

  return null;
}
