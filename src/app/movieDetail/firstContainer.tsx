import { AllTypeFilter } from "../api/types.ts";
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
      <div className="pt-[5.7rem] pl-[3rem] max-[780px]:pl-[1.5rem]">
        {detail.posterPath == null ? (
          <div className="h-[20rem] w-[15rem] overflow-clip border-[0.5rem] border-solid border-[white] p-[0.8vw] text-[2.3vw] text-[blueviolet] max-[1330px]:h-[24vw] max-[1330px]:w-[19vw] max-[920px]:h-[13rem] max-[920px]:w-[10rem] max-[920px]:border-[0.3rem] max-[920px]:text-[1rem]">
            {detail.title}
          </div>
        ) : (
          <img
            alt="imageMovie"
            className="[w-[15rem] h-auto border-[0.5rem] border-solid border-white max-[1330px]:h-auto max-[1330px]:w-[19vw] max-[920px]:h-auto max-[920px]:w-[10rem] min-[780px]:hover:border-(--border_color)"
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
