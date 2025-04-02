import Star from '@/public/star.svg'
import { AllType } from '../api/types.ts'

export default function SecondGroup({ detail }: { detail: AllType }) {
  return (
    <div className='max-[780px]:text-white max-[780px]:ml-[1.4rem] max-[780px]:mr-[1.4rem] max-[780px]:mb-[1.4rem] flex flex-col gap-[1rem] border-[2px] border-[white] border-solid rounded-[1rem] p-[1rem] mr-[2rem]'>
      <div>
        runtime: {detail.runtime ? `${detail.runtime}min` : ' no data'}
      </div>
      <div >
        budget: {detail.budget != 0 ? `${detail.budget}$` : 'no data'}
      </div>
      <div >
        revenue: {detail.revenue != 0 ? `${detail.revenue}$` : 'no data'}
      </div>
      <div >
        original language: {detail.originalLanguage}
      </div>
      <div >
        vote average: {detail.voteAverage}/10   
        <Star className='w-[1rem] h-[1rem] inline' />
      </div>
      {detail.spokenLanguages ? (
        <div>
          spoken languages: {detail.spokenLanguages}
        </div>
      ) : null}
      {detail.productionCountries ? (
        <div >
          production countries: {detail.productionCountries}
        </div>
      ) : null}
      {detail.productionCompanies ? (
        <div>
          production companies: {detail.productionCompanies}
        </div>
      ) : null}
      {detail.homepage ? (
        <div>
          homepage:
          <a href={detail.homepage}> {detail.homepage}</a>
        </div>
      ) : null}
      {detail.keywords ? (
        <div>keywords: {detail.keywords}</div>
      ) : null}
      {detail.tagline ? (
        <div>tagline: {detail.tagline}</div>
      ) : null}
      {detail.title ? (
        <div>original title: {detail.originalTitle}</div>
      ) : null}
    </div>
  )
}