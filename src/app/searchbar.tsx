"use client";
import { FormEvent, useState } from "react";
import type { WrappedMovieListType } from "@/src/app/api/types.ts";
import SearchList from "./searchList.tsx";
import { useTopLoader } from "nextjs-toploader";
import { toast } from "react-toastify";
import Footer from "./fotter.tsx";

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

export default function SearchBox() {
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
        console.log("Fetched movies");
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
    <>
      <div className="flex h-[16.8rem] w-[100vw] items-center justify-center bg-(--black_color)">
        <form
          className="h-[10rem] w-[55vw] max-[780px]:grow max-[780px]:p-[1rem]"
          onSubmit={handleSubmit}
        >
          <label
            className="font-[bolder] text-[1.6rem] text-[red] max-[780px]:text-[1rem]"
            htmlFor="title"
          >
            Search Movie:
          </label>
          <br />
          <div className="flex h-[9rem] flex-wrap max-[780px]:flex-nowrap">
            <input
              className="mt-[1rem] h-[2.2rem] grow-1 overflow-hidden rounded-[0.1rem] border-none bg-[white] pl-[0.4rem] text-[1rem] shadow-none outline-none max-[780px]:h-[1.8rem] max-[780px]:w-[1.3rem]"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              name="title"
              id="title"
              value={search}
              placeholder="search movie"
            />
            <div className="mt-[0.9rem] ml-[1rem] flex h-[2.6rem] w-[6.8rem] items-center justify-center rounded-sm bg-[conic-gradient(from_0deg,_#ff4545,_#00ff99,_#006aff,_#ff0095,_#ff4545)]">
              <button
                className="relative h-[2.3rem] w-[6.5rem] cursor-pointer rounded-sm border-none bg-(--violet_color) pl-[0.2rem] font-[bolder] text-(--button_color) outline-none before:absolute before:top-1/2 before:left-1/2 before:z-[0] before:h-[2.6rem] before:w-[6.8rem] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-sm before:bg-[conic-gradient(from_0deg,_#ff4545,_#00ff99,_#006aff,_#ff0095,_#ff4545)] before:opacity-50 before:blur-[1.5rem] before:content-[''] max-[780px]:h-[1.9rem] max-[780px]:w-[5rem]"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      {result ? (
        <SearchList rowdata={result.rowdata} rowdate={result.rowdate} />
      ) : null}
      <SpaceBoard />
      <Footer />
    </>
  );
}
