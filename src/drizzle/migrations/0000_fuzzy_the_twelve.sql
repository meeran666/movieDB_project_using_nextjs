-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "table_name1" (
	"column_name_1" integer,
	"column_name_2" integer
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
--> statement-breakpoint
CREATE TABLE "genre_table" (
	"id" integer PRIMARY KEY NOT NULL,
	"action" boolean,
	"science_fiction" boolean,
	"adventure" boolean,
	"drama" boolean,
	"crime" boolean,
	"thriller" boolean,
	"fantasy" boolean,
	"comedy" boolean,
	"romance" boolean,
	"western" boolean,
	"mystery" boolean,
	"war" boolean,
	"animation" boolean,
	"family" boolean,
	"horror" boolean,
	"music" boolean,
	"history" boolean,
	"tv_movie" boolean,
	"documentary" boolean
);
--> statement-breakpoint
CREATE INDEX "title_btree" ON "main_table" USING btree ("title" text_ops);
*/