import fs from "fs/promises";
import path from "path";
import { DuckDuckGoImageResponse } from "../../../../types/types";
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
export async function ImageExtractor(
  query: string,
  no_of_image: number,
  request_signal: AbortSignal,
): Promise<string[]> {
  try {
    query = "batman movie poster";
    const filePath = path.join(process.cwd(), "global.json");
    const MY_GLOBAL_VAR = await fs.readFile(filePath, "utf-8");
    const json_MY_GLOBAL_VAR = JSON.parse(MY_GLOBAL_VAR);

    const API_CONNECTION_NO = json_MY_GLOBAL_VAR.api_connection_no;
    let images: string[] = [];
    const url1 =
      `https://serpapi.com/search.json` +
      `?engine=google_images` +
      `&q=${encodeURIComponent(query)}` +
      `&api_key=${process.env.SERP_API_KEY}`;
    const url2 = `https://api.scrapingdog.com/google_images/?api_key=${process.env.SCRAPINGDOG_API_KEY}&query=${encodeURIComponent(
      query,
    )}&num=10`;
    const url3 = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    // if (API_CONNECTION_NO === 0) {
    //   //serp api
    //   const res = await fetch(url1, { signal: request_signal });

    //   if (!res.ok) {
    //     // connecting to scrapingdog api
    //     const jsonString = JSON.stringify({ api_connection_no: 1 }, null, 2);

    //     try {
    //       await fs.writeFile(filePath, jsonString);
    //       console.log("Successfully wrote file");
    //     } catch (err) {
    //       console.error("Error writing file", err);
    //     }
    //     throw new Error(`Request failed with status ${res.status}`);
    //   }
    //   const data = await res.json();
    //   if (data.error) {
    //     throw new Error(data.error);
    //   }
    //   images = data.jsonObject.images_results
    //     ?.map((img: { original: string })) => img.original)
    //     .slice(0, no_of_image);
    // } else if (API_CONNECTION_NO === 1) {
    //   //scrapingdog api
    //   const res = await fetch(url2, { signal: request_signal });
    //   if (!res.ok) {
    //     // connecting to google api

    //     const jsonString = JSON.stringify({ api_connection_no: 2 }, null, 2);

    //     try {
    //       await fs.writeFile(filePath, jsonString);
    //       console.log("Successfully wrote file");
    //     } catch (err) {
    //       console.error("Error writing file", err);
    //     }
    //     throw new Error(`Request failed with status ${res.status}`);
    //   }
    //   const data = await res.json();
    //   if (data.error) {const expire = await redis.ttl(key);
    // console.log(expire);
    // const value = await redis.get(key);
    // console.log(
    //     throw new Error(data.error);
    //   }
    //   images = data.jsonObject.images_results
    //     ?.map((img: { original: string })) => img.original)
    //     .slice(0, no_of_image);
    // } else {
    //   //google api
    //   const res = await fetch(url3, { signal: request_signal });
    //   if (!res.ok) {
    //     // connecting to serp api
    //     await fs.writeFile(filePath, "0", "utf-8");

    //     throw new Error(`Image API failed: ${res.status}`);
    //   }
    //   const text: string = await res.text();
    //   //  Extract vqd token safely
    //   const vqdMatch: RegExpMatchArray | null = text.match(
    //     /vqd=\\?"([0-9-]+)\\?"/,
    //   );
    //   if (!vqdMatch) {
    //     throw new Error("Failed to extract vqd token from DuckDuckGo");
    //   }

    //   const vqd: string = vqdMatch[1];

    //   //  Image API Call
    //   const str = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(
    //     query,
    //   )}&vqd=${vqd}`;

    //   const res2: Response = await fetch(str, {
    //     headers: {
    //       "User-Agent":
    //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36",
    //       Accept: "application/json, text/javascript, */*; q=0.01",
    //       Referer: "https://duckduckgo.com/",
    //     },
    //     signal: request_signal,
    //   });

    //   if (!res2.ok) {
    //     // connecting to serp api

    //     const jsonString = JSON.stringify({ api_connection_no: 0 }, null, 2);

    //     try {
    //       await fs.writeFile(filePath, jsonString);
    //       console.log("Successfully wrote file");
    //     } catch (err) {
    //       console.error("Error writing file", err);
    //     }

    //     throw new Error(`Image API failed: ${res2.status}`);
    //   }

    //   const data: DuckDuckGoImageResponse = await res2.json();

    //   //  Return only thumbnails as string[]
    //   images = data.results
    //     .map((img: DuckDuckGoImage) => img.thumbnail)
    //     .slice(0, no_of_image);
    // }
    //return the images link
    return images;
  } catch (error) {
    console.error("ImageExtractor error:", error);

    // Re-throw so POST handler can catch it
    throw error;
  }
}
