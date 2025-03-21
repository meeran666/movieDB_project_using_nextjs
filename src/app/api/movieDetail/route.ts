import getDatabaseConection from '@/lib/db.ts'
import { abreviationTable, genreTable, mainTable } from '@/src/drizzle/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { AllType } from '../types'
function genre_str_create(arr: AllType): string {
  const result: string[] = []
  if (arr.action === '1') {
    result.push('Action')
  }
  if (arr.scienceFiction === '1') {
    result.push('Science Fiction')
  }
  if (arr.adventure === '1') {
    result.push('Adventure')
  }
  if (arr.drama === '1') {
    result.push('Drama')
  }
  if (arr.crime === '1') {
    result.push('Crime')
  }
  if (arr.thriller === '1') {
    result.push('Thriller')
  }
  if (arr.fantasy === '1') {
    result.push('Fantasy')
  }
  if (arr.comedy === '1') {
    result.push('Comedy')
  }
  if (arr.romance === '1') {
    result.push('Romance')
  }
  if (arr.western === '1') {
    result.push('Western')
  }
  if (arr.mystery === '1') {
    result.push('Mystery')
  }
  if (arr.war === '1') {
    result.push('War')
  }
  if (arr.animation === '1') {
    result.push('Animation')
  }
  if (arr.family === '1') {
    result.push('Family')
  }
  if (arr.horror === '1') {
    result.push('Horror')
  }
  if (arr.music === '1') {
    result.push('Music')
  }
  if (arr.history === '1') {
    result.push('History')
  }
  if (arr.tvMovie === '1') {
    result.push('TV Movie')
  }
  if (arr.documentary === '1') {
    result.push('Documentary')
  }
  return result.join('/')
}
async function search_exact_id(id: number): Promise<AllType[]> {
  try {
    const db = await getDatabaseConection()
    const result = await db
      .select({
        id: mainTable.id,
        title: mainTable.title,
        voteAverage: mainTable.voteAverage,
        voteCount: mainTable.voteCount,
        status: mainTable.status,
        releaseDate: mainTable.releaseDate,
        revenue: mainTable.revenue,
        runtime: mainTable.runtime,
        adult: mainTable.adult,
        backdropPath: mainTable.backdropPath,
        budget: mainTable.budget,
        homepage: mainTable.homepage,
        imdbId: mainTable.imdbId,
        languageCode: mainTable.languageCode,
        originalTitle: mainTable.originalTitle,
        overview: mainTable.overview,
        popularity: mainTable.popularity,
        posterPath: mainTable.posterPath,
        tagline: mainTable.tagline,
        productionCompanies: mainTable.productionCompanies,
        productionCountries: mainTable.productionCountries,
        spokenLanguages: mainTable.spokenLanguages,
        keywords: mainTable.keywords,
        originalLanguage: abreviationTable.originalLanguage,
        action: genreTable.action,
        scienceFiction: genreTable.scienceFiction,
        adventure: genreTable.adventure,
        drama: genreTable.drama,
        crime: genreTable.crime,
        thriller: genreTable.thriller,
        fantasy: genreTable.fantasy,
        comedy: genreTable.comedy,
        romance: genreTable.romance,
        western: genreTable.western,
        mystery: genreTable.mystery,
        war: genreTable.war,
        animation: genreTable.animation,
        family: genreTable.family,
        horror: genreTable.horror,
        music: genreTable.music,
        history: genreTable.history,
        tvMovie: genreTable.tvMovie,
        documentary: genreTable.documentary,
      })
      .from(mainTable)
      .innerJoin(abreviationTable, eq(mainTable.languageCode, abreviationTable.languageCode))
      .innerJoin(genreTable, eq(mainTable.id, genreTable.id))
      .where(eq(mainTable.id, id))
      .execute()

    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}
export async function POST(request: NextResponse) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const id = searchParams.get('id')
  if (id === null) {
    throw new Error('id is null')
  }
  try {
    const result = await search_exact_id(parseInt(id))
    const genres = genre_str_create(result[0])
    let cut_str_date: string | null = null
    if (result[0].releaseDate !== null) {
      const dateformat = new Date(result[0].releaseDate)
      cut_str_date = dateformat.toString().substring(0, 15)
    }
    return NextResponse.json({ detail: result[0], date: cut_str_date, genre: genres })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error')
  }
}
