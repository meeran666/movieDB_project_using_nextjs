export async function ImageExtractor(title: string, no_of_image: number) {
  const query = title;
  // const query = "deadpool";
  // query= title
  const res1 = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
  );

  const text = await res1.text();
  // Extract vqd token
  const vqdMatch = text.match(/vqd=\\?"([0-9-]+)\\?"/);

  if (!vqdMatch) throw new Error("Failed to extract vqd token from DuckDuckGo");
  const vqd = vqdMatch[1];

  // Now fetch images using the token
  const str = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(
    query,
  )}&vqd=${vqd}`;
  const res2 = await fetch(str, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36",
      Accept: "application/json, text/javascript, */*; q=0.01",
      Referer: "https://duckduckgo.com/",
    },
  });
  const data = await res2.json();
  const final_result = data.results
    .map((img: any) => img.thumbnail)
    .slice(0, no_of_image);
  console.log("image result amazing");
  console.log(final_result);
  return final_result;
}
