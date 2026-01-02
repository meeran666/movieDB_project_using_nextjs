import { NextRequest, NextResponse } from "next/server";
import MultipleRunModel from "./multipleRunModel";
// import SingleModel from "./single_model";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get("title");
  // title = "deadpool";
  if (title === null) {
    console.error("title is null");
    return NextResponse.json("Error");
  }

  try {
    const stream = await MultipleRunModel(title, request.signal);
    // const stream = await SingleRunModel(title);
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error");
  }
}
