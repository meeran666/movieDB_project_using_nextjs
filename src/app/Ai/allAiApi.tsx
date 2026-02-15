"use client";
import { useTopLoader } from "nextjs-toploader";
import { FormEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import ImageGrid from "./imageGrid";
import TextResponse from "./textResponse";
import BlinkBlur from "./blinkblur";
import Youtube from "./youtube";
import Image from "next/image";
export default function AllAiApi() {
  const controllerRef = useRef<AbortController | null>(null);
  const [search, setSearch] = useState<string>("");
  const [ai_data, setAi_data] = useState<string>("");
  const [isLoadedLink, setIsLoadedLink] = useState<boolean>(false);
  const [imgLinks, setImgLinks] = useState<string[]>([]);
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [isFinishedWriting, setIsFinishedWriting] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);
  const [isLoadingStart, setIsLoadingStart] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const loader = useTopLoader();
  const { update } = useSession();

  const Pulser = () => (
    <div className="mt-10 mb-8 flex h-[30vh] w-100 items-center justify-center sm:h-[60vh] md:h-[70vh]">
      <BlinkBlur
        color="#20a7db"
        size="large"
        text=""
        textColor="#1e40af"
        speedPlus={1}
      />
    </div>
  );
  async function onStreamFinished() {
    const resUsage = await fetch(`/api/usage`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
    });
    const usageObj = await resUsage.json();
    const updated_requests = usageObj.requests - 1;
    await update({
      llmTokens: usageObj.llmTokens,
      requests: updated_requests,
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isStreaming) {
        controllerRef.current?.abort();
        setIsStreaming(false);
        return;
      }
      setIsStreaming(true);
      setIsLoadedLink(false);
      setImgLinks([]);
      setEmbedUrl("");
      setIsFinishedWriting(false);
      setAi_data("");
      setFound(false);

      if (search === "") return;
      const controller = new AbortController();
      controllerRef.current = controller;

      //request to send the video url
      fetch(`/api/trailer?title=${search}`, {
        method: "POST",
        signal: controller.signal,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return setEmbedUrl(data.embedUrl);
        });

      // request to send the images
      setIsLoadingStart(true);
      const image_response = await fetch(
        `/api/imageSearchApi?title=${search}`,
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!image_response.ok) {
        setIsFinishedWriting(true);
        setIsStreaming(false);
        setIsLoadingStart(false);
        toast.error("Ai server is down", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });
        return;
      }
      const images = await image_response.json();

      setImgLinks(images.links);
      setIsLoadedLink(true);

      //ai response
      const ai_response = await fetch(`/api/Ai?title=${search}`, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "text/plain" },
      });
      if (!ai_response.ok) {
        const error = await ai_response.json();
        const errorMessage = error.error;
        setIsFinishedWriting(true);
        setIsStreaming(false);
        setIsLoadingStart(false);

        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000,
          theme: "colored",
        });

        return;
      }
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
          controllerRef.current = null;
          await onStreamFinished();
          setIsFinishedWriting(true);
          setIsStreaming(false);
          setIsLoadingStart(false);

          break;
        }
        const chunk = decoder.decode(value, { stream: true });

        buffer = buffer + chunk;

        if (buffer.includes("not found in first section")) {
          // setAi_data("movie does not exist");
          const errorMessage = "this movie does not exist";
          toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "colored",
          });
          break;
        }
        if (buffer.includes("not found")) {
          const startIndex = buffer.lastIndexOf("<div style");
          const endIndex = buffer.indexOf("not found");
          const newString =
            buffer.substring(0, startIndex) + buffer.substring(endIndex + 9);
          buffer = newString;
        }

        setAi_data(buffer);
        if (buffer.length >= 201) {
          setFound(true);
          setIsLoadingStart(false);
        }
      }

      if (ai_response.ok) {
        console.log("ok response");
        loader.done();
      } else {
        console.error("bad response");
      }
    } catch (err: any) {
      if (err.name === "AbortError" || err.message.includes("aborted")) {
        console.log("Stream stopped by user");
      } else {
        console.error(" Real streaming error:", err);
      }
    }
  };

  return (
    <div className="max-h-1200 min-h-dvh flex-col bg-[rgb(33,33,33)] md:min-h-dvh">
      <form
        className="fixed bottom-6 left-1/2 flex h-12 w-9/10 -translate-x-1/2 items-center justify-center rounded-full bg-[rgb(48,48,48)] sm:bottom-15 sm:w-1/2"
        onSubmit={handleSubmit}
      >
        <input
          className="ml-[4vh] min-w-0 grow border-none bg-[rgb(48,48,48)] text-white shadow-none outline-none focus:bg-[rgb(48,48,48)]"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="disable_autofill"
          id="movie_title"
          value={search}
          placeholder="aisearch movie"
          autoComplete="none"
        />
        <button
          className="mr-2 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[white] outline-none"
          type="submit"
        >
          {isStreaming ? (
            <Image
              src="/square.png"
              alt="square"
              width={"20"}
              height={"20"}
              className=""
            />
          ) : (
            <Image
              src="/AiMagicIcon.svg"
              className="mb-2 ml-2 h-6 w-6 text-black"
              alt="AiMagicIcon.svg"
              width={4}
              height={4}
            />
          )}
        </button>
      </form>

      <div className="flex flex-col items-center justify-center">
        <div className="flex w-[min(100%,60rem)] flex-col items-center px-3 text-white">
          {isLoadingStart && <Pulser></Pulser>}
          {!isLoadingStart && found && isLoadedLink && (
            <ImageGrid imgLinks={imgLinks}></ImageGrid>
          )}
          {isLoadedLink && <TextResponse ai_data={ai_data}></TextResponse>}
          {/* {isFinishedWriting && embedUrl && (
            <div className="mt-15 mb-55 aspect-video w-full max-w-3xl">
              <Youtube embedUrl={embedUrl}></Youtube>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
