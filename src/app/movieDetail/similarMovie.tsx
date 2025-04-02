import { PosterDetailType } from '../api/types'
function Poster({
  posterpath,
  postertitle,
}: {
  posterpath: string | null
  postertitle: string | null
}) {
  const poster = posterpath ? (
    <img
      alt="similarBoxPoster"
      className='max-[1022px]:w-[10rem] min-[720px]:hover:border-(--border_color) w-[12.3rem] h-auto border-[4px] border-solid border-white'
      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${posterpath}`}
    />
  ) : (
    <div className='max-[1022px]:w-[10rem] max-[1022px]:h-[15rem] max-[1022px]:p-[5%] max-[1022px]:border-[4px] max-[1022px]:border-white max-[1022px]:border-solid w-[12.3rem] h-[18rem] text-[violet] p-[5%] border-[4px] border-white border-solid hover:border-(--border_color)'>{postertitle}</div>
  )
  return poster
}

function SimilarMovie({ posterDetail }: { posterDetail: PosterDetailType[] }) {
  const container = []
  for (let i = 0; i < posterDetail.length; i++) {
    const poster = (
      <a
        key={i}
        className='no-underline hover:text-(--aqua_color_hover)'
        href={`/movieDetail?id=${posterDetail[i].id}`}>
        <Poster posterpath={posterDetail[i].posterPath} postertitle={posterDetail[i].title} />
        <div className='min-[720px]:hover:text-(--aqua_color_hover) max-[1022px]:w-[10rem] text-white w-[12.3rem] h-[2.5rem] overflow-x-hidden'>{posterDetail[i].title}</div>
      </a>
    )
    container.push(poster)
 
  }

  return <div className='max-[1022px]:gap-[8.6vw] flex gap-[3.5rem] flex-wrap justify-start'>{container}</div>
}

export default function SimilarMovieContainer({
  posterDetail,
}: {
  posterDetail: PosterDetailType[] | null
}) {
  return (
    <div className='max-[1022px]:pl-[1.5rem] max-[1022px]:pr-[1.5rem] pt-[4rem] min-h-[30rem] pl-[2rem] pr-[2rem] pb-[2rem]'>
      <div className='max-[720px]:text-[1.5rem] text-[2rem] text-[white] pb-[2rem]'>similar movies</div>
      {posterDetail ? <SimilarMovie posterDetail={posterDetail} /> : null}
    </div>
  )
}
