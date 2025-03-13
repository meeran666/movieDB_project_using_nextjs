-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `abreviation_table` (
	`original_language` varchar(70) NOT NULL,
	`language_code` varchar(16),
	CONSTRAINT `abreviation_table_original_language` PRIMARY KEY(`original_language`)
);
--> statement-breakpoint
CREATE TABLE `another_join_table` (
	`imdb_id` text,
	`primaryTitle` text,
	`isAdult` tinyint(1),
	`startYear` int,
	`runtimeMinutes` int,
	`revenue` bigint,
	`budget` bigint,
	`nconst` text,
	`category` text,
	`Action` text,
	`Science_Fiction` text,
	`Adventure` text,
	`Drama` text,
	`Crime` text,
	`Thriller` text,
	`Fantasy` text,
	`Comedy` text,
	`Romance` text,
	`Western` text,
	`Mystery` text,
	`War` text,
	`Animation` text,
	`Family` text,
	`Horror` text,
	`Music` text,
	`History` text,
	`TV_Movie` text,
	`Documentary` text
);
--> statement-breakpoint
CREATE TABLE `filter_join_table` (
	`imdb_id` text,
	`primaryTitle` text,
	`isAdult` tinyint(1),
	`startYear` int,
	`runtimeMinutes` int,
	`revenue` bigint,
	`budget` bigint,
	`nconst` text,
	`category` text,
	`primaryName` text,
	`birthYear` int,
	`Action` text,
	`Science_Fiction` text,
	`Adventure` text,
	`Drama` text,
	`Crime` text,
	`Thriller` text,
	`Fantasy` text,
	`Comedy` text,
	`Romance` text,
	`Western` text,
	`Mystery` text,
	`War` text,
	`Animation` text,
	`Family` text,
	`Horror` text,
	`Music` text,
	`History` text,
	`TV_Movie` text,
	`Documentary` text
);
--> statement-breakpoint
CREATE TABLE `genre_table` (
	`id` int NOT NULL,
	`Action` text,
	`Science_Fiction` text,
	`Adventure` text,
	`Drama` text,
	`Crime` text,
	`Thriller` text,
	`Fantasy` text,
	`Comedy` text,
	`Romance` text,
	`Western` text,
	`Mystery` text,
	`War` text,
	`Animation` text,
	`Family` text,
	`Horror` text,
	`Music` text,
	`History` text,
	`TV_Movie` text,
	`Documentary` text,
	CONSTRAINT `genre_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `join_table` (
	`imdb_id` text,
	`primaryTitle` text,
	`isAdult` tinyint(1),
	`startYear` int,
	`runtimeMinutes` int,
	`revenue` bigint,
	`budget` bigint,
	`Action` text,
	`Science_Fiction` text,
	`Adventure` text,
	`Drama` text,
	`Crime` text,
	`Thriller` text,
	`Fantasy` text,
	`Comedy` text,
	`Romance` text,
	`Western` text,
	`Mystery` text,
	`War` text,
	`Animation` text,
	`Family` text,
	`Horror` text,
	`Music` text,
	`History` text,
	`TV_Movie` text,
	`Documentary` text
);
--> statement-breakpoint
CREATE TABLE `main_table` (
	`id` int NOT NULL,
	`title` varchar(512),
	`vote_average` text,
	`vote_count` text,
	`status` text,
	`release_date` text,
	`revenue` bigint,
	`runtime` int,
	`adult` tinyint,
	`backdrop_path` text,
	`budget` bigint,
	`homepage` text,
	`imdb_id` text,
	`language_code` text,
	`original_title` text,
	`overview` text,
	`popularity` text,
	`poster_path` text,
	`tagline` text,
	`production_companies` text,
	`production_countries` text,
	`spoken_languages` text,
	`keywords` text,
	CONSTRAINT `main_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `name_basics` (
	`nconst` varchar(300) NOT NULL,
	`primaryName` text,
	`birthYear` int,
	`deathYear` int,
	`primaryProfession` text,
	`knownForTitles` text,
	CONSTRAINT `name_basics_nconst` PRIMARY KEY(`nconst`)
);
--> statement-breakpoint
CREATE TABLE `title_basics` (
	`imdb_id` varchar(300) NOT NULL,
	`titleType` text,
	`primaryTitle` text,
	`originalTitle` text,
	`isAdult` tinyint(1),
	`startYear` int,
	`endYear` int,
	`runtimeMinutes` int,
	`genres` text,
	CONSTRAINT `title_basics_imdb_id` PRIMARY KEY(`imdb_id`)
);
--> statement-breakpoint
CREATE TABLE `title_crew` (
	`imdb_id` varchar(300) NOT NULL,
	`directors` text,
	`writers` text,
	CONSTRAINT `title_crew_imdb_id` PRIMARY KEY(`imdb_id`)
);
--> statement-breakpoint
CREATE TABLE `title_principals` (
	`imdb_id` varchar(300),
	`ordering` int,
	`nconst` text,
	`category` text,
	`job` text,
	`characters` text
);
--> statement-breakpoint
CREATE TABLE `total_join_table` (
	`imdb_id` text,
	`primaryTitle` text,
	`isAdult` tinyint(1),
	`startYear` int,
	`runtimeMinutes` int,
	`revenue` bigint,
	`budget` bigint,
	`nconst` text,
	`category` text,
	`primaryName` text,
	`birthYear` int,
	`Action` text,
	`Science_Fiction` text,
	`Adventure` text,
	`Drama` text,
	`Crime` text,
	`Thriller` text,
	`Fantasy` text,
	`Comedy` text,
	`Romance` text,
	`Western` text,
	`Mystery` text,
	`War` text,
	`Animation` text,
	`Family` text,
	`Horror` text,
	`Music` text,
	`History` text,
	`TV_Movie` text,
	`Documentary` text
);
--> statement-breakpoint
CREATE INDEX `title_index` ON `main_table` (`title`);
*/