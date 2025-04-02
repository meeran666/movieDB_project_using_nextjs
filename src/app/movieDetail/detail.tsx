import detailStyles from '@/styles/detail.module.css'
import SimilarMovieContainer from './similarMovie.tsx'
import Star from '@/public/star.svg'
import { useMediaQuery } from 'react-responsive'
import { AllType, PosterDetailType } from '../api/types.ts'
import Image from 'next/image'
function SecondGroup({ detail }: { detail: AllType }) {
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
function DetailContainer({
  detail,
  genre,
  date,
  isMobile,
}: {
  detail: AllType
  genre: string
  date: string
  isMobile: boolean
}) {
  return (
    <div className=' flex flex-col text-[white] pl-[10%] pt-[5.7rem] text-[1.3rem]'>
      <div className='max-[780px]:text-[1.6rem] max-[780px]:pb-[2rem] text-[4rem] pb-[2rem]'>{detail.title}</div>
      {detail.releaseDate != null ? <div className='max-[780px]:text-[1.2rem] text-[1.5rem]'>{date}</div> : null}
      <div className='max-[780px]:text-[1.2rem] text-[1.5rem]'>{genre}</div>
      <div className='max-[780px]:pb-[3rem] max-[780px]:text-[1.2rem] pb-[3rem] text-[1.5rem]'>{detail.adult == false ? 'PG' : ' Adult'}</div>
      {isMobile ? null : <SecondGroup detail={detail} />}
    </div>
  )
}
function FirstContainer({
  detail,
  genre,
  date,
  isMobile,
}: {
  detail: AllType
  genre: string
  date: string
  isMobile: boolean
}) {
  return (
    <div className='flex w-[100%] pb-[3rem]'>
      <div className='max-[780px]:pl-[1.5rem] pt-[5.7rem] pl-[3rem]'>
        {detail.posterPath == null  ? (
          <div className='max-[1330px]:w-[19vw] max-[1330px]:h-[24vw] max-[920px]:w-[10rem] max-[920px]:h-[13rem] max-[920px]:text-[1rem] max-[920px]:border-[0.3rem] overflow-clip text-[2.3vw] p-[0.8vw] w-[15rem] h-[20rem] text-[blueviolet] border-[0.5rem] border-[white] border-solid'>{detail.title}</div>
        ) : (
          <img
            alt="imageMovie"
            className=' min-[780px]:hover:border-(--border_color) max-[1330px]:w-[19vw] max-[1330px]:h-auto max-[920px]:w-[10rem] max-[920px]:h-auto [w-[15rem] h-auto border-[0.5rem]   border-solid border-white'
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
          />
        )}
      </div>
      <DetailContainer detail={detail} genre={genre} date={date} isMobile={isMobile} />
    </div>
  )
}
function SynopsisContainer({ detail }: { detail: AllType }) {
  return (
    <div className='max-[780px]:m-[1.4rem] max-[780px]:text-[1rem] text-white flex flex-col border-[2px] border-solid border-white rounded-[1rem] m-[2rem] text-[1.3rem] pr-[1rem] pl-[1rem] pb-[1rem] pt-[1rem]'>
      <div className='pb-[1rem]'>synopsis &#11088;</div>
      <div>{detail.overview}</div>
    </div>
  )
}

export default function Detail({
  detail,
  date,
  genre,
  posterDetail,
}: {
  detail: AllType
  date: string
  genre: string
  posterDetail: PosterDetailType[] | null
}) {
  const isMobile = useMediaQuery({ maxWidth: 780 })
  return (
    <>
      <div className="bg-[black]">
        <div className="flex flex-col overflow-hidden z-[-1] w-[100dvw] items-center">
          <div
          className='relative flex justify-center'>
            {detail.posterPath ? (
              <img
                alt="backgroundImage"
                className="absolute top-[-1rem] opacity-[0.3] bg-center bg-cover w-[81.5rem] h-[100rem] z-[0]"
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
              />
            ) : null}
          </div>
          <div className='max-[1330px]:w-auto z-[1] bg-gradient-to-t from-(--full_opacity) to-transparent  w-[81.5rem] flex flex-col'>
            <FirstContainer detail={detail} genre={genre} date={date} isMobile={isMobile} />
            {isMobile ? <SecondGroup detail={detail} /> : null}
            <SynopsisContainer detail={detail} />
            <SimilarMovieContainer posterDetail={posterDetail} />
          </div>
        </div>
      </div>
    </>
  )
}
