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
    <div className="flex flex-col pt-[5.7rem] pl-[10%] text-[1.3rem] text-[white]">
      <div className="pb-[2rem] text-[4rem] max-[780px]:pb-[2rem] max-[780px]:text-[1.6rem]">
        {detail.title}
      </div>
      {detail.releaseDate != null ? (
        <div className="text-[1.5rem] max-[780px]:text-[1.2rem]">{date}</div>
      ) : null}
      <div className="text-[1.5rem] max-[780px]:text-[1.2rem]">{genre}</div>
      <div className="pb-[3rem] text-[1.5rem] max-[780px]:pb-[3rem] max-[780px]:text-[1.2rem]">
        {detail.adult == false ? "PG" : " Adult"}
      </div>
      {isMobile ? null : <SecondGroup detail={detail} />}
    </div>
  );
}
