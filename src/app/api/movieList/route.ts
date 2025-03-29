import getDatabaseConection from '@/lib/db.ts'
import { mainTable } from '@/src/drizzle/schema.ts'
import type { MovieListType } from '@/src/app/api/types'
import { and, desc, ilike, isNotNull, sql } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
async function search_contain(title: string | null, limit: number): Promise<MovieListType[]> {
  const wrapped_title = '%' + title + '%'
  const db = await getDatabaseConection()
  let result: MovieListType[] = []
  try {
    result = await db
      .select()
      .from(mainTable)
      .where(and(ilike(mainTable.title, wrapped_title), isNotNull(mainTable.releaseDate)))
      .orderBy(sql`CASE WHEN main_table.title ilike ${title} THEN 1 ELSE 2 END ASC`,desc(mainTable.title))
      .limit(limit)
      .execute()
      console.log("result")
      console.log(result)
  } catch (error) {
    console.log(error)
  }
  return result
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const title = searchParams.get('name')
  try {
    const results = await search_contain(title, 50)
    const datearr = []
    for (let i = 0; i < results.length; i++) {
      if (results[i].releaseDate != null) {
        const dateformat = new Date(results[i].releaseDate as string)
        const cut_str_date = dateformat.toString().substring(0, 15)
        datearr.push(cut_str_date)
      }
    }

    return NextResponse.json({ rowdata: results, rowdate: datearr })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error')
  }
}
