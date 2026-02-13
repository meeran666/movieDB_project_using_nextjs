import { NextRequest, NextResponse } from "next/server";
import { ImageExtractor } from "./image_extractor_testapi.ts";
// import { ImageExtractor } from "./image_extractor.ts";
export async function POST(request: NextRequest) {
  try {
    // const url = new URL(request.url);
    // const searchParams = url.searchParams;
    // const title = searchParams.get("title");

    // if (!title) {
    //   console.log("ok55");
    //   return NextResponse.json({ error: "Title is required" }, { status: 400 });
    // }

    const title = "the batman";

    const no_of_image = 6;

    const image_links = await ImageExtractor(
      `${title} movie`,
      no_of_image,
      request.signal,
    );

    return NextResponse.json({ links: image_links });
  } catch (error) {
    console.error("POST error:", error);

    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}
