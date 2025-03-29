import getDatabaseConection from '@/lib/db.ts'
import { mainTable } from '@/src/drizzle/schema'
import { and, desc, eq, ilike, like, not, sql } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { PosterDetailType } from '../types'
async function search_contain(
  title: string,
  selfid: number,
  limit: number,
): Promise<PosterDetailType[]> {
  const wrapped_title = '%' + title + '%'
  const db = await getDatabaseConection()
 
  const result = await db
    .select({ id: mainTable.id, title: mainTable.title, posterPath: mainTable.posterPath })
    .from(mainTable)
    .where(and(ilike(mainTable.title, wrapped_title), not(eq(mainTable.id, selfid))))
    .orderBy(sql`CASE WHEN main_table.title ilike ${title} THEN 1 ELSE 2 END ASC`,desc(mainTable.title))
    .limit(limit)

  return result
}
export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const title = searchParams.get('title')
  const selfid = searchParams.get('selfid')
  if (title === null || selfid === null) {
    throw Error('title is null or selfid is null')
  }
  try {
    //finding posterdetail in db
    const MovieList = await search_contain(title, parseInt(selfid), 5)

    return NextResponse.json({
      posterData: MovieList,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error')
  }
}
