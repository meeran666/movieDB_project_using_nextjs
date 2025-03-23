import detailStyles from '@/styles/detail.module.css'
import SimilarMovieContainer from './similarMovie.tsx'
import Star from '@/public/star.svg'
import { useMediaQuery } from 'react-responsive'
import { AllType, PosterDetailType } from '../api/types.ts'
import Image from 'next/image'
function SecondGroup({ detail }: { detail: AllType }) {
  return (
    <div className={detailStyles.third_group}>
      <div className={detailStyles.runtime}>
        runtime: {detail.runtime ? `${detail.runtime}min` : ' no data'}
      </div>
      <div className={detailStyles.budget}>
        budget: {detail.budget != 0 ? `${detail.budget}$` : 'no data'}
      </div>
      <div className={detailStyles.revenue}>
        revenue: {detail.revenue != 0 ? `${detail.revenue}$` : 'no data'}
      </div>
      <div className={detailStyles.original_language}>
        original language: {detail.originalLanguage}
      </div>
      <div className={detailStyles.vote_average}>
        vote average: {detail.voteAverage}/10
        {/* <img className={detailStyles.star_logo} src="/static/css/test_image/star.svg" /> */}
        <Star className={detailStyles.star_logo} />
      </div>
      {detail.spokenLanguages ? (
        <div className={detailStyles.spokenLanguages}>
          spoken languages: {detail.spokenLanguages}
        </div>
      ) : null}
      {detail.productionCountries ? (
        <div className={detailStyles.productionCountries}>
          production countries: {detail.productionCountries}
        </div>
      ) : null}
      {detail.productionCompanies ? (
        <div className={detailStyles.productionCompanies}>
          production companies: {detail.productionCompanies}
        </div>
      ) : null}
      {detail.homepage ? (
        <div className={detailStyles.homepage}>
          homepage:
          <a href={detail.homepage}> {detail.homepage}</a>
        </div>
      ) : null}
      {detail.keywords ? (
        <div className={detailStyles.keywords}>keywords: {detail.keywords}</div>
      ) : null}
      {detail.tagline ? (
        <div className={detailStyles.tagline}>tagline: {detail.tagline}</div>
      ) : null}
      {/* <div className={detailStyles.vote_count}>vote_count  <%=detail.vote_count%></div> */}
      {/* <div className={detailStyles.status}><%=detail.status%></div>  */}
      {/* <div className={detailStyles.backdrop_path}><%=detail.backdrop_path%></div>  */}
      {detail.title ? (
        <div className={detailStyles.original_title}>original title: {detail.originalTitle}</div>
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
    <div className={detailStyles.detail_container}>
      <div className={detailStyles.title}>{detail.title}</div>
      {detail.releaseDate != null ? <div className={detailStyles.release_date}>{date}</div> : null}
      <div className={detailStyles.genre}>{genre}</div>
      <div className={detailStyles.adult}>{detail.adult == false ? 'PG' : ' Adult'}</div>
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
    <div className={detailStyles.first_container}>
      <div className={detailStyles.image_container}>
        {detail.posterPath == null && detail.title != null ? (
          <div className={detailStyles.poster_name}>{detail.title}</div>
        ) : (
          <Image
            alt="imageMovie"
            width="200"
            height="300"
            className={detailStyles.image_movie}
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
    <div className={detailStyles.synopsis_container}>
      <div className={detailStyles.synopsis}>synopsis &#11088;</div>
      <div className={detailStyles.overview}>{detail.overview}</div>
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
      <div style={{ backgroundColor: 'black' }}>
        <div className={detailStyles.background}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Image
              width="300"
              height="400"
              alt="backgroundImage"
              className={detailStyles.background_img}
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
            />
          </div>
          <div className={detailStyles.container}>
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
// overflow: 'hidden',
