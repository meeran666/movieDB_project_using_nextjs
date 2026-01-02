import { PosterDetailType } from "../api/types";
function Poster({
  posterpath,
  postertitle,
}: {
  posterpath: string | null;
  postertitle: string | null;
}) {
  const poster = posterpath ? (
    <img
      alt="similarBoxPoster"
      className="h-auto w-[12.3rem] border-[4px] border-solid border-white max-[1022px]:w-[10rem] min-[720px]:hover:border-(--border_color)"
      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${posterpath}`}
    />
  ) : (
    <div className="h-[18rem] w-[12.3rem] border-[4px] border-solid border-white p-[5%] text-[violet] hover:border-(--border_color) max-[1022px]:h-[15rem] max-[1022px]:w-[10rem] max-[1022px]:border-[4px] max-[1022px]:border-solid max-[1022px]:border-white max-[1022px]:p-[5%]">
      {postertitle}
    </div>
  );
  return poster;
}

function SimilarMovie({ posterDetail }: { posterDetail: PosterDetailType[] }) {
  const container = [];
  for (let i = 0; i < posterDetail.length; i++) {
    const poster = (
      <a
        key={i}
        className="no-underline hover:text-(--aqua_color_hover)"
        href={`/movieDetail?id=${posterDetail[i].id}`}
      >
        <Poster
          posterpath={posterDetail[i].posterPath}
          postertitle={posterDetail[i].title}
        />
        <div className="h-[2.5rem] w-[12.3rem] overflow-x-hidden text-white max-[1022px]:w-[10rem] min-[720px]:hover:text-(--aqua_color_hover)">
          {posterDetail[i].title}
        </div>
      </a>
    );
    container.push(poster);
  }

  return (
    <div className="flex flex-wrap justify-start gap-[3.5rem] max-[1022px]:gap-[8.6vw]">
      {container}
    </div>
  );
}

export default function SimilarMovieContainer({
  posterDetail,
}: {
  posterDetail: PosterDetailType[] | null;
}) {
  return (
    <div className="min-h-[30rem] pt-[4rem] pr-[2rem] pb-[2rem] pl-[2rem] max-[1022px]:pr-[1.5rem] max-[1022px]:pl-[1.5rem]">
      <div className="pb-[2rem] text-[2rem] text-[white] max-[720px]:text-[1.5rem]">
        similar movies
      </div>
      {posterDetail ? <SimilarMovie posterDetail={posterDetail} /> : null}
    </div>
  );
}
