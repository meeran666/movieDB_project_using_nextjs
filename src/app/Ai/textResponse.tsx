import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function TextResponse({ ai_data }: { ai_data: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastHeightRef = useRef(0);

  const shouldAutoScrollRef = useRef(true);

  // Detect if user manually scrolls away from bottom
  useEffect(() => {
    const onScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;

      shouldAutoScrollRef.current = isAtBottom;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //  Auto-scroll when container height grows
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const newHeight = container.scrollHeight;

      if (newHeight > lastHeightRef.current && shouldAutoScrollRef) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }

      lastHeightRef.current = newHeight;
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full text-xs sm:px-5 sm:text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {ai_data}
      </ReactMarkdown>
    </div>
  );
}
