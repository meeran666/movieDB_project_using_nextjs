import { abbreviationTable, genreTable, mainTable } from "@/src/drizzle/models";
import { RefObject } from "react";
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
type HambergerClick = {
  onHambergerClick: () => void;
};
type NavbarProp = HambergerClick & {
  isMobile: boolean;
  buttonref: RefObject<HTMLDivElement | null>;
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

type SignupApiResponse = {
  success: boolean;
  message: string;
};
type SidebarLayerProp = {
  onHambergerClick: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  buttonref: RefObject<HTMLDivElement | null>;
};
interface DuckDuckGoImage {
  thumbnail: string;
  image: string;
  title: string;
  url: string;
  height: number;
  width: number;
  source: string;
}

interface DuckDuckGoImageResponse {
  results: DuckDuckGoImage[];
  next?: string;
}

type ForgotPasswordApiResponse = SignupApiResponse;
export type {
  SignupApiResponse,
  ForgotPasswordApiResponse,
  MovieListType,
  WrappedMovieListType,
  WrappedAllTypeFilter,
  AllTypeFilter,
  PosterDetailType,
  WrappedPosterDetailType,
  DuckDuckGoImageResponse,
  SidebarLayerProp,
  DuckDuckGoImage,
  NavbarProp,
};
