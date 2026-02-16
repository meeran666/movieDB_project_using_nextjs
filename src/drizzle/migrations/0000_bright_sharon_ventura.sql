-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "abbreviation_table" (
	"original_language" varchar(70) PRIMARY KEY NOT NULL,
	"language_code" varchar(16),
	CONSTRAINT "abbreviation_table_original_language_not_null" CHECK (NOT NULL original_language)
);
--> statement-breakpoint
CREATE TABLE "auth_table" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"username" varchar(512),
	"googleAuthUsername" varchar(512),
	"email" text NOT NULL,
	"password" text,
	"verifyCode" text,
	"verifyCodeExpiry" timestamp with time zone NOT NULL,
	"isVerified" boolean DEFAULT false,
	CONSTRAINT "auth_table_email_key" UNIQUE("email"),
	CONSTRAINT "auth_table_googleAuthUsername_key" UNIQUE("googleAuthUsername"),
	CONSTRAINT "auth_table_username_key" UNIQUE("username"),
	CONSTRAINT "auth_table_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "auth_table_email_not_null" CHECK (NOT NULL email),
	CONSTRAINT "auth_table_verifyCodeExpiry_not_null" CHECK (NOT NULL "verifyCodeExpiry")
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
	"documentary" boolean,
	CONSTRAINT "genre_table_id_not_null" CHECK (NOT NULL id)
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
	"keywords" text,
	CONSTRAINT "main_table_id_not_null" CHECK (NOT NULL id)
);
--> statement-breakpoint
CREATE INDEX "title_btree" ON "main_table" USING btree ("title" text_ops);
*/