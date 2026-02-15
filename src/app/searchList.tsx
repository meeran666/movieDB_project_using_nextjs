import { useState, useEffect } from "react";
import { MovieListType } from "../../types/types";
import { GerardSky } from "./fonts";
type Component = {
  index: number;
  date: string;
  title: string | null;
  id: number;
  isMobile: boolean;
};
function Component({ index, date, title, id, isMobile }: Component) {
  return (
    <div
      className={`flex h-10 w-full items-center justify-center bg-gray-700 text-xs md:h-16 md:text-base ${GerardSky.className}`}
    >
      <a
        className="flex h-8/10 w-49/50 items-center rounded-sm bg-gray-600 pr-[3vw] pl-[3vw] text-white no-underline transition-transform duration-300 hover:h-full hover:w-full hover:bg-gray-800"
        href={`/movieDetail?id=${id}`}
      >
        <div className="pointer-events-none w-[6vw] grow-0 pr-2 pl-2 md:pr-0 md:pl-0">
          {index}
        </div>
        <div className="pointer-events-none h-8 grow content-center overflow-hidden pr-2 pl-2 text-ellipsis md:h-12 md:w-20 md:pr-0 md:pl-0">
          {title}
        </div>
        <div className="pointer-events-none grow-0 pr-2 pl-2 md:w-56 md:pr-0 md:pl-0">
          {isMobile ? date.slice(-4) : date}
        </div>
      </a>
    </div>
  );
}
export default function SearchList({
  rowdata,
  rowdate,
}: {
  rowdate: string[];
  rowdata: MovieListType[];
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 780);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const components = [];
  for (let i = 0; i < rowdata.length; i++) {
    components.push(
      <Component
        key={i}
        index={i + 1}
        date={rowdate[i]}
        title={rowdata[i].title}
        id={rowdata[i].id}
        isMobile={isMobile}
      />,
    );
  }
  return components;
}
