"use client";
import { FormEvent, useState } from "react";
import type { WrappedMovieListType } from "@/types/types.ts";
import SearchList from "./searchList.tsx";
import { useTopLoader } from "nextjs-toploader";
import { toast } from "react-toastify";

function SpaceBoard() {
  return <div className="w-[100vw] grow bg-(--black_color)"></div>;
}
function isApiResponse(data: unknown): data is WrappedMovieListType {
  return (
    typeof data === "object" &&
    data !== null &&
    "rowdata" in data &&
    Array.isArray(data.rowdata)
  );
}

export default function Page() {
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<WrappedMovieListType | null>(null);
  const loader = useTopLoader();
  // const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loader.start();
    loader.setProgress(0.5);
    try {
      //request send with data
      const response = await fetch(`/api/movieList?name=${search}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { search } }),
      });

      //response result
      const data: unknown = await response.json();
      if (isApiResponse(data)) {
        if (data.rowdata.length == 0) {
          toast.warn("No such movie exist!", {
            position: "bottom-right",
            autoClose: 7000,
          });
        }
        setResult(data);
        loader.done();
      } else {
        console.error("Invalid API response structure");
      }
      if (response.ok) {
        console.log("ok response");
      } else {
        console.error("bad response");
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  return (
    <main className="flex grow flex-col">
      <div className="flex h-67 w-dvw flex-col items-center justify-center bg-(--black_color)">
        <div className="mb-2 ml-2 w-[90vw] text-xl font-bold text-[red] sm:w-[65vw] lg:ml-4 lg:w-[65vw] lg:text-xl">
          Search Movie:
        </div>
        <form
          className="flex w-[90vw] items-center gap-4 sm:w-[65vw] lg:w-[65vw]"
          onSubmit={handleSubmit}
        >
          <div className="flex h-7 grow-1 items-center overflow-hidden rounded-sm bg-white sm:h-8 lg:h-10 lg:rounded-xl">
            <input
              className="ml-4 border-none text-[1rem] outline-none"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="title"
              id="title"
              value={search}
              placeholder="search movie"
            />
          </div>

          <div className="relative z-0 inline-flex items-center justify-center">
            <div className="absolute z-8 h-8 w-18 rounded-sm bg-[conic-gradient(from_0deg,_#ff4545,_#00ff99,_#006aff,_#ff0095,_#ff4545)] opacity-50 blur-lg sm:h-9 sm:w-19 lg:h-10 lg:w-27 lg:rounded-lg lg:blur-xl" />
            <div className="absolute z-9 h-8 w-18 rounded-sm bg-[conic-gradient(from_0deg,_#ff4545,_#00ff99,_#006aff,_#ff0095,_#ff4545)] sm:h-9 sm:w-19 lg:h-10 lg:w-27 lg:rounded-lg" />
            <button
              type="submit"
              className="relative z-9 h-7 w-17 cursor-pointer rounded-sm border-none bg-(--violet_color) pl-1 font-bold text-(--button_color) outline-none sm:h-8 sm:w-18 lg:h-9 lg:w-26 lg:rounded-lg"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {result ? (
        <SearchList rowdata={result.rowdata} rowdate={result.rowdate} />
      ) : null}
      <SpaceBoard />
    </main>
  );
}
