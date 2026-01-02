import { NextRequest, NextResponse } from "next/server";
import { ImageExtractor } from "./image_extractor";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get("title");

  try {
    if (title === null) {
      return NextResponse.json("Error");
    }

    let no_of_image = 5;
    const image_links = await ImageExtractor(
      `${title} movie`,
      no_of_image,
      request.signal,
    );

    no_of_image = 1;
    const poster_image_link = await ImageExtractor(
      `poster of ${title} movie`,
      no_of_image,
      request.signal,
    );

    return NextResponse.json({ image_links, poster_image_link });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error");
  }
}
