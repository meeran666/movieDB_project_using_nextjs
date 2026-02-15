import { AllTypeFilter } from "../../../types/types.ts";
import Image from "next/image";

export default function SecondGroup({ detail }: { detail: AllTypeFilter }) {
  return (
    <div className="mr-6 mb-16 ml-6 flex flex-col gap-4 rounded-2xl border-2 border-solid border-white p-4 text-white md:mr-8 md:mb-0 md:ml-0">
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
        <Image
          src="/star.svg"
          alt="star.svg"
          width={3}
          height={3}
          className="inline h-4 w-4"
        />
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
