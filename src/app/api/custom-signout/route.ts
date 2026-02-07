// pages/api/custom-signout.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { authTable } from "@/src/drizzle/models";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);
//   console.log("`session`");
//   console.log(session);
//   if (session?.user?.email) {
//     await db.delete(authTable).where(eq(authTable.email, session.user.email));
//   }

//   return null;
// }

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("session", session);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
    // await db.delete(authTable).where(eq(authTable.email, session.user.email));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
