import { AllTypeFilter } from "../api/types.ts";
export default function SynopsisContainer({
  detail,
}: {
  detail: AllTypeFilter;
}) {
  return (
    <div className="m-[2rem] flex flex-col rounded-[1rem] border-[2px] border-solid border-white pt-[1rem] pr-[1rem] pb-[1rem] pl-[1rem] text-[1.3rem] text-white max-[780px]:m-[1.4rem] max-[780px]:text-[1rem]">
      <div className="pb-[1rem]">synopsis &#11088;</div>
      <div>{detail.overview}</div>
    </div>
  );
}
