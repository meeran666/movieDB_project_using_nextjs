import getDatabaseConection from '@/lib/db.ts'
import { NextRequest, NextResponse } from 'next/server'
async function search_contain(title: string, limit: number) {
  const t = '%' + title + '%'
  const connection = await getDatabaseConection()
  const [result] = await connection.query('select * from main_table where title LIKE ? limit ?;', [
    t,
    limit,
  ])
  console.log('result')
  console.log(result)

  // return NextResponse.json({ data: result })
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const title = searchParams.get('name') || 'no name'
  try {
    const results = await search_contain(title, 1)
    const datearr = []
    for (let i = 0; i < results.length; i++) {
      let dateformat = new Date(results[i].release_date)
      let cut_str_date = dateformat.toString().substring(0, 15)
      datearr.push(cut_str_date)
    }
    return NextResponse.json({ rowdata: results, rowdate: datearr })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error')
  }
}
