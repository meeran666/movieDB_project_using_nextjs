import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  let query = searchParams.get("title") || "Deadpool trailer";
  query = query + " trailer";
  const YT_API_KEY = process.env.YOUTUBE_API_KEY;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query,
    )}&type=video&maxResults=1&key=${YT_API_KEY}`,
  );

  const data = await res.json();
  console.log(data);
  if (!data.items?.length) {
    console.log("eorsaf");
    return NextResponse.json({ error: "No trailer found" }, { status: 404 });
  }

  const videoId = data.items[0].id.videoId;

  return NextResponse.json({
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  });
}
