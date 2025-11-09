import { Dispatch, SetStateAction, useState } from "react";
import { imgPropertyObj } from "../api/types";
import ImageGrid from "./imageGrid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Youtube from "./youtube";

export default function SearchHistory({
  isLoadedLink,
  imgPropertyArr,
  isLoadedProperty,
  setImgPropertyArr,
  setIsLoadedProperty,
  ai_data,
  search,
  embedUrl,
  setEmbedUrl,
  isFinishedWriting,
}: {
  isLoadedLink: boolean;
  imgPropertyArr: imgPropertyObj[];
  isLoadedProperty: boolean;
  setImgPropertyArr: Dispatch<SetStateAction<imgPropertyObj[]>>;
  setIsLoadedProperty: Dispatch<SetStateAction<boolean>>;
  ai_data: string;
  search: string;
  embedUrl: string;
  setEmbedUrl: Dispatch<SetStateAction<string>>;
  isFinishedWriting: boolean;
}) {
  return (
    <>
      <ImageGrid
        isLoadedLink={isLoadedLink}
        imgPropertyArr={imgPropertyArr}
        isLoadedProperty={isLoadedProperty}
        setImgPropertyArr={setImgPropertyArr}
        setIsLoadedProperty={setIsLoadedProperty}
      ></ImageGrid>
      {isLoadedProperty && (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {ai_data}
        </ReactMarkdown>
      )}
      {isFinishedWriting && (
        <div className="mt-15 mb-55 aspect-video w-full max-w-3xl">
          <Youtube
            search={search}
            setEmbedUrl={setEmbedUrl}
            embedUrl={embedUrl}
            isLoadedLink={isLoadedLink}
          ></Youtube>
        </div>
      )}
    </>
  );
}
