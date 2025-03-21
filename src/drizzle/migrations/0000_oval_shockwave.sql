-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "table_name1" (
	"column_name_1" integer,
	"column_name_2" integer
);
--> statement-breakpoint
CREATE TABLE "genre_table" (
	"id" integer PRIMARY KEY NOT NULL,
	"action" text,
	"science_fiction" text,
	"adventure" text,
	"drama" text,
	"crime" text,
	"thriller" text,
	"fantasy" text,
	"comedy" text,
	"romance" text,
	"western" text,
	"mystery" text,
	"war" text,
	"animation" text,
	"family" text,
	"horror" text,
	"music" text,
	"history" text,
	"tv_movie" text,
	"documentary" text
);
--> statement-breakpoint
CREATE TABLE "main_table" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(512),
	"vote_average" text,
	"vote_count" text,
	"status" text,
	"release_date" text,
	"revenue" bigint,
	"runtime" integer,
	"adult" boolean,
	"backdrop_path" text,
	"budget" bigint,
	"homepage" text,
	"imdb_id" text,
	"language_code" varchar(2),
	"original_title" text,
	"overview" text,
	"popularity" text,
	"poster_path" text,
	"tagline" text,
	"production_companies" text,
	"production_countries" text,
	"spoken_languages" text,
	"keywords" text
);
--> statement-breakpoint
CREATE TABLE "abbreviation_table" (
	"original_language" varchar(70) PRIMARY KEY NOT NULL,
	"language_code" varchar(16)
);

*/