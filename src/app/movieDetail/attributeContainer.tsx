import { AllTypeFilter } from "../../../types/types.ts";
import SecondGroup from "./secondGroup.tsx";
export default function AttributeContainer({
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
    <div className="flex flex-col pt-[5.7rem] pl-[10%] text-xl text-[white]">
      <div className="pb-8 text-2xl md:pb-[2rem] md:text-[4rem]">
        {detail.title}
      </div>
      {detail.releaseDate != null ? (
        <div className="text-[1.2rem] md:text-[1.5rem]">{date}</div>
      ) : null}
      <div className="text-[1.2rem] md:text-[1.5rem]">{genre}</div>
      <div className="pb-[3rem] text-[1.2rem] md:pb-[3rem] md:text-[1.5rem]">
        {detail.adult == false ? "PG" : " Adult"}
      </div>
      {isMobile ? null : <SecondGroup detail={detail} />}
    </div>
  );
}
