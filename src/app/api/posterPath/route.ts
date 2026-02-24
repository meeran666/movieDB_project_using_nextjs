import { db } from "@/lib/db.ts";
import { mainTable } from "@/src/drizzle/models";
import { and, desc, eq, ilike, not, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { PosterDetailType } from "../../../../types/types";
import redis from "@/lib/redis";

async function search_in_redis(finalkey: string) {
  const cached = await redis.get(finalkey);
  if (cached) {
    return cached;
  } else {
    return null;
  }
}
async function search_contain(
  title: string,
  selfid: number,
  limit: number,
): Promise<PosterDetailType[]> {
  const wrapped_title = "%" + title + "%";

  const result = await db
    .select({
      id: mainTable.id,
      title: mainTable.title,
      posterPath: mainTable.posterPath,
    })
    .from(mainTable)
    .where(
      and(ilike(mainTable.title, wrapped_title), not(eq(mainTable.id, selfid))),
    )
    .orderBy(
      sql`CASE WHEN main_table.title ilike ${title} THEN 1 ELSE 2 END ASC`,
      desc(mainTable.title),
    )
    .limit(limit);

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const title = searchParams.get("title");
    const selfid = searchParams.get("selfid");
    if (title === null || selfid === null) {
      return NextResponse.json(
        { error: "title or selfid is missing" },
        { status: 400 }, // Bad Request
      );
    }
    const finalkey = title + ":" + selfid;

    // Check Redis first
    const cached = await search_in_redis(finalkey);
    if (cached != null) {
      return NextResponse.json(JSON.parse(cached));
    }
    //finding posterdetail in db
    const MovieList = await search_contain(title, parseInt(selfid), 5);
    const responseData = {
      posterData: MovieList,
    };
    // Cache result in Redis
    await redis.set(finalkey, JSON.stringify(responseData), "EX", 60 * 5);

    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
