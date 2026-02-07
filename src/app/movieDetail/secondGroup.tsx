import Star from "@/public/star.svg";
import { AllTypeFilter } from "../../../types/types.ts";

export default function SecondGroup({ detail }: { detail: AllTypeFilter }) {
  return (
    <div className="mr-[2rem] flex flex-col gap-[1rem] rounded-[1rem] border-[2px] border-solid border-[white] p-[1rem] max-[780px]:mr-[1.4rem] max-[780px]:mb-[1.4rem] max-[780px]:ml-[1.4rem] max-[780px]:text-white">
      <div>runtime: {detail.runtime ? `${detail.runtime}min` : " no data"}</div>
      <div>budget: {detail.budget != 0 ? `${detail.budget}$` : "no data"}</div>
      <div>
        revenue: {detail.revenue != 0 ? `${detail.revenue}$` : "no data"}
      </div>
      {detail.originalLanguage ? (
        <div>original language: {detail.originalLanguage}</div>
      ) : null}
      <div>
        average vote: {detail.voteAverage}/10
        <Star className="inline h-[1rem] w-[1rem]" />
      </div>
      {detail.spokenLanguages ? (
        <div>spoken languages: {detail.spokenLanguages}</div>
      ) : null}
      {detail.productionCountries ? (
        <div>production countries: {detail.productionCountries}</div>
      ) : null}
      {detail.productionCompanies ? (
        <div>production companies: {detail.productionCompanies}</div>
      ) : null}
      {detail.homepage ? (
        <div>
          homepage:
          <a href={detail.homepage}> {detail.homepage}</a>
        </div>
      ) : null}
      {detail.keywords ? <div>keywords: {detail.keywords}</div> : null}
      {detail.tagline ? <div>tagline: {detail.tagline}</div> : null}
      {detail.title ? <div>original title: {detail.originalTitle}</div> : null}
    </div>
  );
}
