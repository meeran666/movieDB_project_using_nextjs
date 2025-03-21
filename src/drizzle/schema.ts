import { pgTable, integer, text, varchar, bigint, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const tableName1 = pgTable("table_name1", {
	columnName1: integer("column_name_1"),
	columnName2: integer("column_name_2"),
});

export const genreTable = pgTable("genre_table", {
	id: integer().primaryKey().notNull(),
	action: text(),
	scienceFiction: text("science_fiction"),
	adventure: text(),
	drama: text(),
	crime: text(),
	thriller: text(),
	fantasy: text(),
	comedy: text(),
	romance: text(),
	western: text(),
	mystery: text(),
	war: text(),
	animation: text(),
	family: text(),
	horror: text(),
	music: text(),
	history: text(),
	tvMovie: text("tv_movie"),
	documentary: text(),
});

export const mainTable = pgTable("main_table", {
	id: integer().primaryKey().notNull(),
	title: varchar({ length: 512 }),
	voteAverage: text("vote_average"),
	voteCount: text("vote_count"),
	status: text(),
	releaseDate: text("release_date"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	revenue: bigint({ mode: "number" }),
	runtime: integer(),
	adult: boolean(),
	backdropPath: text("backdrop_path"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	budget: bigint({ mode: "number" }),
	homepage: text(),
	imdbId: text("imdb_id"),
	languageCode: varchar("language_code", { length: 2 }),
	originalTitle: text("original_title"),
	overview: text(),
	popularity: text(),
	posterPath: text("poster_path"),
	tagline: text(),
	productionCompanies: text("production_companies"),
	productionCountries: text("production_countries"),
	spokenLanguages: text("spoken_languages"),
	keywords: text(),
});

export const abbreviationTable = pgTable("abbreviation_table", {
	originalLanguage: varchar("original_language", { length: 70 }).primaryKey().notNull(),
	languageCode: varchar("language_code", { length: 16 }),
});
