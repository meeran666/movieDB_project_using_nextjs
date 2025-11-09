"use client";
import Logo from "@/public/AiMagicIcon.svg";
import { useTopLoader } from "nextjs-toploader";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ImageGrid from "./imageGrid";
import { imgPropertyObj } from "../api/types";
import Youtube from "./youtube";
// function isApiResponse(data: unknown): data is WrappedMovieListType {
//   return (
//     typeof data === "object" &&
//     data !== null &&
//     "rowdata" in data &&
//     Array.isArray(data.rowdata)
//   );
// }

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [ai_data, setAi_data] = useState<string>("");
  const [isLoadedLink, setIsLoadedLink] = useState<boolean>(false);
  const [isLoadedProperty, setIsLoadedProperty] = useState<boolean>(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [imgPropertyArr, setImgPropertyArr] = useState<imgPropertyObj[]>([]);

  const loader = useTopLoader();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loader.start();
    loader.setProgress(0.5);
    try {
      // request send with data
      const image_response = await fetch(
        `/api/imageSearchApi?title=${search}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const links = await image_response.json();
      const link_arr = [links.poster_image_link[0], ...links.image_links];
      const newArr = link_arr.map((link) => ({
        imageLink: link,
        realWidthImg: 0,
        imgDim: [0, 0] as [number, number],
      }));

      setImgPropertyArr((prev) => [...prev, ...newArr]);
      setIsLoadedLink(true);
      // //ai response
      //   const ai_response = await fetch(`/api/Ai?title=${search}`, {
      //     method: "POST",
      //     headers: { "Content-Type": "text/plain" },
      //   });

      //   // Stream text, not JSON
      //   const reader = ai_response.body?.getReader();
      //   if (!reader) {
      //     throw new Error("ReadableStream not supported or empty response body.");
      //   }

      //   const decoder = new TextDecoder();
      //   let result = "";

      //   while (true) {
      //     const { done, value } = await reader.read();
      //     if (done) break;
      //     const chunk = decoder.decode(value, { stream: true });
      //     console.log(chunk);
      //     result += chunk;
      //     // console.log(result);
      //     setAi_data(result);
      //   }
      //   if (ai_response.ok) {
      //     console.log("ok response");
      //     loader.done();
      //   } else {
      //     console.error("bad response");
      //   }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  return (
    <div className="max-h-1200 min-h-[100dvh] flex-col bg-[rgb(33,33,33)]">
      <form
        className="fixed bottom-15 left-1/2 flex h-12 -translate-x-1/2 flex-wrap rounded-full bg-[rgb(48,48,48)]"
        onSubmit={handleSubmit}
      >
        <input
          className="ml-[4vh] grow border-none bg-[rgb(48,48,48)] text-white shadow-none outline-none focus:bg-[rgb(48,48,48)] lg:w-180"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="movie_title"
          id="movie_title"
          value={search}
          placeholder="aisearch movie"
        />
        <button
          className="relative top-1/2 mr-2 flex h-9 w-9 -translate-y-1/2 cursor-pointer rounded-full border-none bg-[rgb(133,133,133)] outline-none"
          type="submit"
        >
          <Logo className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white"></Logo>
        </button>
      </form>

      <div className="flex flex-col items-center justify-center">
        <ImageGrid
          isLoadedLink={isLoadedLink}
          imgPropertyArr={imgPropertyArr}
          isLoadedProperty={isLoadedProperty}
          setImgPropertyArr={setImgPropertyArr}
          setIsLoadedProperty={setIsLoadedProperty}
        ></ImageGrid>
        <div className="mx-auto aspect-video w-full max-w-3xl">
          <Youtube
            search={search}
            setEmbedUrl={setEmbedUrl}
            embedUrl={embedUrl}
            isLoadedLink={isLoadedLink}
          ></Youtube>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: ai_data }}
          className="grow text-white lg:w-240"
        />
      </div>
    </div>
  );
}
