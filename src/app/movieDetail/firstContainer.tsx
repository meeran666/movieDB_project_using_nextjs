import Image from "next/image";
import { AllTypeFilter } from "../../../types/types.ts";
import AttributeContainer from "./attributeContainer.tsx";
export default function FirstContainer({
  detail,
  genre,
  date,
  isMobile,
}: {
  detail: AllTypeFilter;
  genre: string;
  date: string;
  isMobile: boolean;
}) {
  return (
    <div className="flex w-[100%] pb-[3rem]">
      <div className="pt-[5.7rem] pl-[1.5rem] md:pl-[3rem]">
        {detail.posterPath == null ? (
          <div className="h-52 w-40 overflow-clip border-5 border-solid border-[white] p-[0.8vw] text-xl text-[blueviolet] md:h-[24vw] md:w-[19vw] lg:border-8 lg:text-[2.3vw] xl:h-80 xl:w-60">
            {detail.title}
          </div>
        ) : (
          <Image
            alt="imageMovie"
            width={300}
            height={500}
            className="h-auto w-40 border-8 border-solid border-white md:w-[19vw] md:hover:border-(--border_color) xl:w-60"
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
          />
        )}
      </div>
      <AttributeContainer
        detail={detail}
        genre={genre}
        date={date}
        isMobile={isMobile}
      />
    </div>
  );
}
