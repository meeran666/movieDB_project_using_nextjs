export async function ImageExtractor(
  query: string,
  no_of_image: number,
  request_signal: AbortSignal,
): Promise<string[]> {
  try {
    query = "batman movie poster";

    // const url =
    //   `https://serpapi.com/search.json` +
    //   `?engine=google_images` +
    //   `&q=${encodeURIComponent(query)}` +
    //   `&api_key=${process.env.SERP_API_KEY}`;
    const url = `http://127.0.0.1:3001/you_stupid`;

    const res = await fetch(url, { signal: request_signal });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }

    const images: string[] = data.jsonObject.images_results
      ?.map((img: { original: string }) => img.original)
      .slice(0, no_of_image);

    return images;
  } catch (error) {
    console.error("ImageExtractor error:", error);

    // Re-throw so POST handler can catch it
    throw error;
  }
}
