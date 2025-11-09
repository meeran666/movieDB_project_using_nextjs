"use client";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function Youtube({
  search,
  setEmbedUrl,
  embedUrl,
  isLoadedLink,
}: {
  search: string;
  setEmbedUrl: Dispatch<SetStateAction<string>>;
  embedUrl: string;
  isLoadedLink: boolean;
}) {
  useEffect(() => {
    if (isLoadedLink === false) return;
    fetch(`/api/trailer?title=${search}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data");
        // console.log(data);
        return setEmbedUrl(data.embedUrl);
      });
  }, [isLoadedLink]);

  return (
    <div className="mx-auto aspect-video w-full max-w-3xl">
      {embedUrl && (
        <iframe
          className="h-full w-full rounded-xl"
          src={embedUrl}
          title="YouTube trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
