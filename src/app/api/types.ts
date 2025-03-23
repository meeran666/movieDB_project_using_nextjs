import { abbreviationTable, genreTable, mainTable } from '@/src/drizzle/schema.ts'
type MovieListType = typeof mainTable.$inferSelect
type WrappedMovieListType = {
  rowdata: MovieListType[]
  rowdate: string[]
}
type AllType = typeof genreTable.$inferSelect &
  typeof mainTable.$inferSelect &
  typeof abbreviationTable.$inferSelect

type WrappedAllType = {
  detail: AllType
  date: string
  genre: string
}
type PosterDetailType = {
  posterPath: string | null
  id: number
  title: string | null
}
type WrappedPosterDetailType = {
  posterData: PosterDetailType[]
}

export type {
  MovieListType,
  WrappedMovieListType,
  AllType,
  WrappedAllType,
  PosterDetailType,
  WrappedPosterDetailType,
}
