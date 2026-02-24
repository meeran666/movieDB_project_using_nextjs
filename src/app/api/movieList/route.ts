import { db } from "@/lib/db.ts";
import { mainTable } from "@/src/drizzle/models";
import type { MovieListType } from "@/types/types";
import { and, desc, ilike, isNotNull, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
async function search_in_redis(key: string) {
  const cached = await redis.get(key);
  if (cached) {
    return cached;
  } else {
    return null;
  }
}
async function search_contain(
  title: string | null,
  limit: number,
): Promise<MovieListType[]> {
  const wrapped_title = "%" + title + "%";
  // const db = await getDatabaseConection();

  let result: MovieListType[] = [];
  try {
    result = await db
      .select({
        id: mainTable.id,
        title: mainTable.title,
        releaseDate: mainTable.releaseDate,
      })
      .from(mainTable)
      .where(
        // and(
        ilike(mainTable.title, wrapped_title),
        // isNotNull(mainTable.releaseDate),
        // ),
      )
      .orderBy(
        sql`CASE WHEN main_table.title ilike ${title} THEN 1 ELSE 2 END ASC`,
        desc(mainTable.title),
      )
      .limit(limit)
      .execute();
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get("name");
  try {
    if (title == null) {
      throw new Error("id is null");
    }
    // Check Redis first
    const cached = await search_in_redis(title);
    if (cached != null) {
      return NextResponse.json(JSON.parse(cached));
    }
    // Check Postgress second
    const results = await search_contain(title, 50);
    const datearr = [];
    for (let i = 0; i < results.length; i++) {
      if (results[i].releaseDate != null) {
        const dateformat = new Date(results[i].releaseDate as string);
        const cut_str_date = dateformat.toString().substring(0, 15);
        datearr.push(cut_str_date);
      }
    }
    const responseData = { rowdata: results, rowdate: datearr };
    // Cache result in Redis
    await redis.set(title, JSON.stringify(responseData), "EX", 60 * 5);
    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error");
  }
}
