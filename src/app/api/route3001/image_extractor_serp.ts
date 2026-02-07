import fs from "fs/promises";
import path from "path";

export async function ImageExtractor(
  query: string,
  no_of_image: number,
  request_signal: AbortSignal,
): Promise<string[]> {
  try {
    query = "batman movie poster";
    const filePath = path.join(process.cwd(), "global.txt");
    const MY_GLOBAL_VAR = await fs.readFile(filePath, "utf-8");
    let API_CONNECTION_NO = parseInt(MY_GLOBAL_VAR, 10);
    let url = "";
    const url1 =
      `https://serpapi.com/search.json` +
      `?engine=google_images` +
      `&q=${encodeURIComponent(query)}` +
      `&api_key=${process.env.SERP_API_KEY}`;
    const url2 = `https://api.scrapingdog.com/google_images/?api_key=${apiKey}&query=${encodeURIComponent(
      query,
    )}&num=10`;

    if (API_CONNECTION_NO === 0) {
      const res = await fetch(url1, { signal: request_signal });

      if (!res.ok) {
        await fs.writeFile(filePath, "1", "utf-8");
        throw new Error(`Request failed with status ${res.status}`);
      }
    } else if (API_CONNECTION_NO === 1) {
      const res = await fetch(url2, { signal: request_signal });
      if (!res.ok) {
        await fs.writeFile(filePath, "2", "utf-8");
        throw new Error(`Request failed with status ${res.status}`);
      }
    } else {
      const res = await fetch(url3, { signal: request_signal });
      if (!res.ok) {
        await fs.writeFile(filePath, "0", "utf-8");
        throw new Error(`Request failed with status ${res.status}`);
      }
    }
    // const url = `http://127.0.0.1:3001/you_stupid`;

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }

    const images: string[] = data.jsonObject.images_results
      ?.map((img: any) => img.original)
      .slice(0, no_of_image);

    return images;
  } catch (error) {
    console.error("ImageExtractor error:", error);

    // Re-throw so POST handler can catch it
    throw error;
  }
}
