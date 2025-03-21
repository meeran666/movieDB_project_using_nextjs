import similarMovieStyles from '@/styles/similarMovie.module.css'
import { PosterDetailType } from '../api/types'
import Image from 'next/image'
function Poster({
  posterpath,
  postertitle,
}: {
  posterpath: string | null
  postertitle: string | null
}) {
  console.log('posterpath91')
  console.log(posterpath)

  const poster = posterpath ? (
    <Image
      alt="similarBoxPoster"
      width="300"
      height="400"
      className={similarMovieStyles.similar_box_poster}
      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${posterpath}`}
    />
  ) : (
    <div className={similarMovieStyles.similar_box}>{postertitle}</div>
  )
  return poster
}

function SimilarMovie({ posterDetail }: { posterDetail: PosterDetailType[] }) {
  const container = []
  console.log('posterDetail.length')
  console.log(posterDetail)
  for (let i = 0; i < posterDetail.length; i++) {
    const poster = (
      <a
        key={i}
        className={similarMovieStyles.similar_box_link}
        href={`/movieDetail?id=${posterDetail[i].id}`}>
        <Poster posterpath={posterDetail[i].posterPath} postertitle={posterDetail[i].title} />
        <div className={similarMovieStyles.similar_movie_title}>{posterDetail[i].title}</div>
      </a>
    )
    container.push(poster)
    console.log('poster')
    console.log(poster)
  }

  return <div className={similarMovieStyles.similar_movie}>{container}</div>
}

export default function SimilarMovieContainer({
  posterDetail,
}: {
  posterDetail: PosterDetailType[] | null
}) {
  return (
    <div className={similarMovieStyles.similar_movie_container}>
      <div className={similarMovieStyles.heading}>similar movies</div>
      {posterDetail ? <SimilarMovie posterDetail={posterDetail} /> : null}
    </div>
  )
}
