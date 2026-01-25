"use client";

export default function Youtube({ embedUrl }: { embedUrl: string }) {
  return (
    <div className="mx-auto aspect-video w-full max-w-3xl">
      {
        <iframe
          className="h-full w-full rounded-xl"
          src={embedUrl}
          title="YouTube trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      }
    </div>
  );
}
