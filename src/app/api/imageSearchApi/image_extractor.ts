import { DuckDuckGoImageResponse } from "../types";

// Type for each image item from DuckDuckGo
interface DuckDuckGoImage {
  thumbnail: string;
  image: string;
  title: string;
  url: string;
  height: number;
  width: number;
  source: string;
}

//  Final Function Type
export async function ImageExtractor(
  query: string,
  no_of_image: number,
  request_signal: AbortSignal,
): Promise<string[]> {
  const res1: Response = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
    { signal: request_signal },
  );

  const text: string = await res1.text();
  console.log("text");
  console.log(text);
  //  Extract vqd token safely
  const vqdMatch: RegExpMatchArray | null = text.match(/vqd=\\?"([0-9-]+)\\?"/);
  console.log(vqdMatch);
  if (!vqdMatch) {
    throw new Error("Failed to extract vqd token from DuckDuckGo");
  }

  const vqd: string = vqdMatch[1];

  //  Image API Call
  const str = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(
    query,
  )}&vqd=${vqd}`;

  const res2: Response = await fetch(str, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36",
      Accept: "application/json, text/javascript, */*; q=0.01",
      Referer: "https://duckduckgo.com/",
    },
  });

  if (!res2.ok) {
    throw new Error(`Image API failed: ${res2.status}`);
  }

  const data: DuckDuckGoImageResponse = await res2.json();

  //  Return only thumbnails as string[]
  const final_result: string[] = data.results
    .map((img: DuckDuckGoImage) => img.thumbnail)
    .slice(0, no_of_image);

  return final_result;
}
