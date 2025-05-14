import {
  abbreviationTable,
  genreTable,
  mainTable,
} from "@/src/drizzle/schema.ts";
type MovieListTypeUnfilter = typeof mainTable.$inferSelect;
type MovieListType = Pick<
  MovieListTypeUnfilter,
  "id" | "title" | "releaseDate"
>;
type WrappedMovieListType = {
  rowdata: MovieListType[];
  rowdate: string[];
};
type AllType = typeof genreTable.$inferSelect &
  typeof mainTable.$inferSelect &
  typeof abbreviationTable.$inferSelect;

type AllTypeFilter = Omit<AllType, "originalLanguage"> & {
  originalLanguage: string | null;
};

type WrappedAllTypeFilter = {
  detail: AllTypeFilter;
  date: string;
  genre: string;
};
type PosterDetailType = {
  posterPath: string | null;
  id: number;
  title: string | null;
};
type WrappedPosterDetailType = {
  posterData: PosterDetailType[];
};

export type {
  MovieListType,
  WrappedMovieListType,
  WrappedAllTypeFilter,
  AllTypeFilter,
  PosterDetailType,
  WrappedPosterDetailType,
};
