import { useState, useEffect } from "react";
import { MovieListType } from "./api/types";
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
      className={`flex h-[4rem] w-full items-center justify-center bg-gray-700 max-[780px]:h-[2.5rem] ${GerardSky.className}`}
    >
      <a
        className="flex h-8/10 w-49/50 items-center rounded-sm bg-gray-600 pr-[3vw] pl-[3vw] text-white no-underline transition-transform duration-300 hover:h-full hover:w-full hover:min-[780px]:bg-gray-800"
        href={`/movieDetail?id=${id}`}
      >
        <div className="pointer-events-none w-[6vw] grow-0 max-[780px]:pr-[0.5rem] max-[780px]:pl-[0.5rem]">
          {index}
        </div>
        <div className="pointer-events-none h-[3rem] w-[5rem] grow content-center overflow-hidden text-ellipsis max-[780px]:h-[2.5rem] max-[780px]:pr-[0.5rem] max-[780px]:pl-[0.5rem]">
          {title}
        </div>
        <div className="pointer-events-none w-[14rem] grow-0 max-[780px]:pr-[0.5rem] max-[780px]:pl-[0.5rem]">
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
