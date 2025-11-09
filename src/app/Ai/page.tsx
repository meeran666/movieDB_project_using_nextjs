"use client";
import Logo from "@/public/AiMagicIcon.svg";
import { useTopLoader } from "nextjs-toploader";
import { FormEvent, useState } from "react";
import { imgPropertyObj } from "../api/types";
import { toast } from "react-toastify";
import SearchHistory from "./searchHistory";
// function isApiResponse(data: unknown): data is WrappedMovieListType {
//   return (
//     typeof data === "object" &&
//     data !== null &&
//     "rowdata" in data &&
//     Array.isArray(data.rowdata)
//   );
// }
let elements: string;
const text = `<div style="width: 100%" ><strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">devlopment</strong></div>\n\nThe *Deadpool* movie development began in **2004** at New Line Cinema. After years in **development hell**, test footage leaked online in **2014**, generating massive fan demand. This led **Ryan Reynolds** to successfully push **20th Century Fox** to greenlight the film. It was a **surprise hit** upon its **2016** release.\n<div style="width:100%"><strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">writing</strong></div>The *Deadpool* movie development began in **2004** at New Line Cinema. After years in **development hell**, test footage leaked online in **2014**, generating massive fan demand. This led **Ryan Reynolds** to successfully push **20th Century Fox** to greenlight the film. It was a **surprise hit** upon its **2016** release.
`;

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [ai_data, setAi_data] = useState<string>("");
  const [isLoadedLink, setIsLoadedLink] = useState<boolean>(false);
  const [isLoadedProperty, setIsLoadedProperty] = useState<boolean>(false);
  const [imgPropertyArr, setImgPropertyArr] = useState<imgPropertyObj[]>([]);
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [isFinishedWriting, setIsFinishedWriting] = useState<boolean>(false);
  const loader = useTopLoader();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoadedLink(false);
      setIsLoadedProperty(false);
      setImgPropertyArr([]);
      setEmbedUrl("");
      setIsFinishedWriting(false);
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
      console.log("links");
      console.log(links);
      if (links === "Error") {
      }
      const link_arr = [links.poster_image_link[0], ...links.image_links];
      const newArr = link_arr.map((link) => ({
        imageLink: link,
        realWidthImg: 0,
        imgDim: [0, 0] as [number, number],
      }));
      setImgPropertyArr((prev) => [...prev, ...newArr]);
      setIsLoadedLink(true);

      //ai response
      const ai_response = await fetch(`/api/Ai?title=${search}`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
      });

      // Stream text, not JSON
      const reader = ai_response.body?.getReader();
      if (!reader) {
        throw new Error("ReadableStream not supported or empty response body.");
      }

      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setIsFinishedWriting(true);
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        buffer = buffer + chunk;
        console.log(buffer);
        // const html = await marked(buffer);
        setAi_data(buffer);
      }
      if (
        buffer ===
        `<strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">Development</strong>not found`
      ) {
        setAi_data("movie does not exist");
        const errorMessage = "this movie does not exist";
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
      }

      if (ai_response.ok) {
        console.log("ok response");
        loader.done();
      } else {
        console.error("bad response");
      }
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
          name="disable_autofill"
          id="movie_title"
          value={search}
          placeholder="aisearch movie"
          autoComplete="none"
        />
        <button
          className="relative top-1/2 mr-2 flex h-9 w-9 -translate-y-1/2 cursor-pointer rounded-full border-none bg-[rgb(133,133,133)] outline-none"
          type="submit"
        >
          <Logo className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-white"></Logo>
        </button>
      </form>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center px-3 text-white lg:w-240">
          <SearchHistory
            isLoadedLink={isLoadedLink}
            imgPropertyArr={imgPropertyArr}
            isLoadedProperty={isLoadedProperty}
            setImgPropertyArr={setImgPropertyArr}
            setIsLoadedProperty={setIsLoadedProperty}
            ai_data={ai_data}
            search={search}
            embedUrl={embedUrl}
            setEmbedUrl={setEmbedUrl}
            isFinishedWriting={isFinishedWriting}
          ></SearchHistory>
        </div>
      </div>
    </div>
  );
}
