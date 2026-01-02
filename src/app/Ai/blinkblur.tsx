"use client";

import { useEffect, useRef, useState } from "react";

interface BlinkBlurProps {
  color?: string | string[];
  size?: "small" | "medium" | "large";
  text?: string;
  textColor?: string;
  speedPlus?: number;
  easing?: string;
}

const sizeMap: Record<string, string> = {
  small: "w-12 h-12",
  medium: "w-16 h-16",
  large: "w-30 h-30",
};

function BlinkBlur({
  color = "#32cd32",
  size = "medium",
  text = "",
  textColor = "#000",
  speedPlus = 0,
  easing = "ease-in-out",
}: BlinkBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState<string>(
    typeof color === "string" ? color : color[0],
  );

  useEffect(() => {
    const colors: string[] =
      typeof color === "string" ? [color] : color.slice(0, 4);
    const baseDuration = 1200 + speedPlus * 100;
    const duration = Math.max(400, baseDuration);

    let animationFrame: number;

    const animate = (time: number) => {
      const element = containerRef.current;
      if (!element) return;

      const progress = (time % duration) / duration;

      // Blink effect: opacity 0.6-1.0
      const blinkProgress = Math.sin(progress * Math.PI * 4) * 0.4 + 0.6;
      element.style.opacity = blinkProgress.toString();

      // Blur pulse: 0-12px
      const blurProgress = Math.max(0, Math.sin(progress * Math.PI * 2.5) * 12);
      element.style.filter = `blur(${blurProgress}px)`;

      // Scale pulse: 1.0-1.6
      const scale = 1 + blurProgress / 20;
      element.style.transform = `scale(${scale})`;

      // Color cycling
      if (colors.length > 1) {
        const colorIndex = Math.floor(progress * colors.length) % colors.length;
        setCurrentColor(colors[colorIndex]);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [color, speedPlus, easing]);

  return (
    <div className="flex flex-col items-center space-y-3 p-4">
      <div
        ref={containerRef}
        className={` ${sizeMap[size]} relative overflow-hidden rounded-full border-4 border-white/30 shadow-2xl shadow-black/30 transition-all duration-100`}
        style={{
          backgroundColor: currentColor,
          willChange: "filter, opacity, transform",
        }}
        aria-label="Loading"
      />
      {text && (
        <span
          className="animate-pulse text-sm font-medium tracking-wide"
          style={{ color: textColor }}
        >
          {text}
        </span>
      )}
    </div>
  );
}

export default BlinkBlur;
