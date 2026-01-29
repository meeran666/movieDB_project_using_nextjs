import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    let query = searchParams.get("title") || "titanic trailer";
    query = `${query} trailer`;

    const YT_API_KEY = process.env.YOUTUBE_API_KEY;

    if (!YT_API_KEY) {
      return NextResponse.json(
        { error: "YouTube API key not configured" },
        { status: 500 },
      );
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query,
      )}&type=video&maxResults=1&key=${YT_API_KEY}`,
      { signal: req.signal },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from YouTube API" },
        { status: res.status },
      );
    }

    const data = await res.json();

    if (!data.items?.length) {
      return NextResponse.json({ error: "No trailer found" }, { status: 404 });
    }

    const videoId = data.items[0].id.videoId;

    return NextResponse.json({
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    });
  } catch (error: any) {
    // AbortController / request cancelled
    if (error?.name === "AbortError") {
      return NextResponse.json({ error: "Request aborted" }, { status: 499 });
    }

    console.error("YouTube trailer error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
