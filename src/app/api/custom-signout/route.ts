// pages/api/custom-signout.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authTable } from "@/src/drizzle/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.email) {
    console.log(session?.user?.email);

    await db.delete(authTable).where(eq(authTable.email, session.user.email));
  }

  return null;
}
