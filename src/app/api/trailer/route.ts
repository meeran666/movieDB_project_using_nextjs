import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  let query = searchParams.get("title") || "titanic trailer";
  query = query + " trailer";
  const YT_API_KEY = process.env.YOUTUBE_API_KEY;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query,
    )}&type=video&maxResults=1&key=${YT_API_KEY}`,
    { signal: req.signal },
  );

  const data = await res.json();
  if (!data.items?.length) {
    return NextResponse.json({ error: "No trailer found" }, { status: 404 });
  }

  const videoId = data.items[0].id.videoId;

  return NextResponse.json({
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  });
}
