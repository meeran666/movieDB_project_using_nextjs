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
    <div className="flex flex-col pt-23 pl-[10%] text-xl text-[white]">
      <div className="pb-8 text-2xl md:pb-8 md:text-7xl">{detail.title}</div>
      {detail.releaseDate != null ? (
        <div className="text-xl md:text-2xl">{date}</div>
      ) : null}
      <div className="text-[1.2rem] md:text-[1.5rem]">{genre}</div>
      <div className="pb-12 text-[1.2rem] md:pb-12 md:text-[1.5rem]">
        {detail.adult == false ? "PG" : " Adult"}
      </div>
      {isMobile ? null : <SecondGroup detail={detail} />}
    </div>
  );
}
