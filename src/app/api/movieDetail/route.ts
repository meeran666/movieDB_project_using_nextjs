import { db } from "@/lib/db.ts";
import { abbreviationTable, genreTable, mainTable } from "@/src/drizzle/models";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { AllTypeFilter } from "../types";
import redis from "@/lib/redis";

async function search_in_redis(key: string) {
  const cached = await redis.get(key);
  if (cached) {
    return cached;
  } else {
    return null;
  }
}

function genre_str_create(arr: AllTypeFilter) {
  const result: string[] = [];
  if (arr?.action === true) {
    result.push("Action");
  }
  if (arr?.scienceFiction === true) {
    result.push("Science Fiction");
  }
  if (arr?.adventure === true) {
    result.push("Adventure");
  }
  if (arr?.drama === true) {
    result.push("Drama");
  }
  if (arr?.crime === true) {
    result.push("Crime");
  }
  if (arr?.thriller === true) {
    result.push("Thriller");
  }
  if (arr?.fantasy === true) {
    result.push("Fantasy");
  }
  if (arr?.comedy === true) {
    result.push("Comedy");
  }
  if (arr?.romance === true) {
    result.push("Romance");
  }
  if (arr?.western === true) {
    result.push("Western");
  }
  if (arr?.mystery === true) {
    result.push("Mystery");
  }
  if (arr?.war === true) {
    result.push("War");
  }
  if (arr?.animation === true) {
    result.push("Animation");
  }
  if (arr?.family === true) {
    result.push("Family");
  }
  if (arr?.horror === true) {
    result.push("Horror");
  }
  if (arr?.music === true) {
    result.push("Music");
  }
  if (arr?.history === true) {
    result.push("History");
  }
  if (arr?.tvMovie === true) {
    result.push("TV Movie");
  }
  if (arr?.documentary === true) {
    result.push("Documentary");
  }
  return result.join("/");
}
async function search_exact_id(id: number): Promise<AllTypeFilter[]> {
  try {
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
        originalLanguage: abbreviationTable.originalLanguage,
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
      .leftJoin(
        abbreviationTable,
        eq(mainTable.languageCode, abbreviationTable.languageCode),
      )
      .innerJoin(genreTable, eq(mainTable.id, genreTable.id))
      .where(eq(mainTable.id, id))
      .execute();
    // result[0].;
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("id");
  if (id === null) {
    throw new Error("id is null");
  }
  try {
    // Check Redis first
    const cached = await search_in_redis(id);
    if (cached != null) {
      return NextResponse.json(JSON.parse(cached));
    }

    const result = await search_exact_id(parseInt(id));
    const genres = genre_str_create(result[0]);
    let cut_str_date: string | null = null;
    if (result[0].releaseDate !== null) {
      const dateformat = new Date(result[0].releaseDate);
      cut_str_date = dateformat.toString().substring(0, 15);
    }

    const responseData = {
      detail: result[0],
      date: cut_str_date,
      genre: genres,
    };
    // Cache result in Redis
    await redis.set(id, JSON.stringify(responseData), "EX", 60 * 5);

    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error");
  }
}
