import { AllTypeFilter } from "../../../types/types.ts";
export default function SynopsisContainer({
  detail,
}: {
  detail: AllTypeFilter;
}) {
  return (
    <div className="m-6 flex flex-col rounded-2xl border-2 border-solid border-white pt-4 pr-4 pb-4 pl-4 text-base text-white md:m-8 md:text-xl">
      <div className="pb-4">synopsis &#11088;</div>
      <div>{detail.overview}</div>
    </div>
  );
}
