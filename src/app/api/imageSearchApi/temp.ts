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
  try {
    const res1: Response = await fetch(
      `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
      { signal: request_signal },
    );
    if (!res1.ok) {
      throw new Error(`DuckDuckGo page fetch failed: ${res1.status}`);
    }
    const text: string = await res1.text();

    //  Extract vqd token safely
    const vqdMatch: RegExpMatchArray | null = text.match(
      /vqd=\\?"([0-9-]+)\\?"/,
    );
    if (!vqdMatch?.[1]) {
      throw new Error("Failed to extract vqd token from DuckDuckGo");
    }

    const vqd = vqdMatch[1];
    console.log("vqd");
    console.log(vqd);

    //  Image API Call
    const imageApiUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(
      query,
    )}&vqd=${vqd}`;

    const res2: Response = await fetch(imageApiUrl, {
      signal: request_signal,
    });

    console.log("what is this ");
    if (!res2.ok) {
      throw new Error(`Image API failed: ${res2.status}`);
    }

    const data: DuckDuckGoImageResponse = await res2.json();

    //  Return only thumbnails as string[]
    const final_result: string[] = data.results
      .map((img: DuckDuckGoImage) => img.thumbnail)
      .slice(0, no_of_image);

    return final_result;
  } catch (err) {
    // if (err?.name === "AbortError") {
    //   console.log("ImageExtractor request aborted");
    //   return [];
    // }

    console.error("ImageExtractor error:", err);
    throw err; // rethrow so caller can decide how to handle
  }
}
