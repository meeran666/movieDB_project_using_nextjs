// pages/api/custom-signout.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import getDatabaseConection from "@/lib/db";
import { eq } from "drizzle-orm";
import { authTable } from "@/src/drizzle/models";
const db = await getDatabaseConection();

export default async function GET(req, res) {
  const session = await getServerSession(req, res, authOptions);

  console.log("ok567");
  if (session?.user?.email) {
    console.log(session?.user?.email);

    await db.delete(authTable).where(eq(authTable.email, session.user.email));
  }

  return null;
}
