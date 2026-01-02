import { pgTable, index, integer, varchar, text, bigint, boolean, unique, uuid, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



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
}, (table) => [
	index("title_btree").using("btree", table.title.asc().nullsLast().op("text_ops")),
]);

export const authTable = pgTable("auth_table", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	username: varchar({ length: 512 }),
	googleAuthUsername: varchar({ length: 512 }),
	email: text().notNull(),
	password: text(),
	verifyCode: text(),
	verifyCodeExpiry: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	isVerified: boolean().default(false),
}, (table) => [
	unique("auth_table_username_key").on(table.username),
	unique("auth_table_googleAuthUsername_key").on(table.googleAuthUsername),
	unique("auth_table_email_key").on(table.email),
]);

export const abbreviationTable = pgTable("abbreviation_table", {
	originalLanguage: varchar("original_language", { length: 70 }).primaryKey().notNull(),
	languageCode: varchar("language_code", { length: 16 }),
});

export const genreTable = pgTable("genre_table", {
	id: integer().primaryKey().notNull(),
	action: boolean(),
	scienceFiction: boolean("science_fiction"),
	adventure: boolean(),
	drama: boolean(),
	crime: boolean(),
	thriller: boolean(),
	fantasy: boolean(),
	comedy: boolean(),
	romance: boolean(),
	western: boolean(),
	mystery: boolean(),
	war: boolean(),
	animation: boolean(),
	family: boolean(),
	horror: boolean(),
	music: boolean(),
	history: boolean(),
	tvMovie: boolean("tv_movie"),
	documentary: boolean(),
});
