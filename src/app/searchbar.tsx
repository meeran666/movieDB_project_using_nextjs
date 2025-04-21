"use client";
import { FormEvent, useState } from "react";
import type { WrappedMovieListType } from "@/src/app/api/types.ts";
import SearchList from "./searchList.tsx";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        setResult(data);
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
      <div className="flex h-[16.8rem] w-[100vw] items-center justify-center border-b-[0.2rem] border-solid border-[red] bg-(--black_color)">
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
            <button
              className="mt-[0.9rem] ml-[1rem] h-[2.4rem] w-[6.6rem] rounded-[0.2rem] border-none bg-(--voilet_color) pl-[0.2rem] font-[bolder] text-(--button_color) outline-none max-[780px]:h-[1.9rem] max-[780px]:w-[5rem]"
              type="submit"
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
    </>
  );
}
