import Image from "next/image";
import { PosterDetailType } from "../../../types/types";
function Poster({
  posterpath,
  postertitle,
}: {
  posterpath: string | null;
  postertitle: string | null;
}) {
  const poster = posterpath ? (
    <Image
      width={196}
      height={225}
      alt="similarBoxPoster"
      className="h-auto w-40 border-4 border-solid border-white md:hover:border-(--border_color) lg:w-50"
      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${posterpath}`}
    />
  ) : (
    <div className="h-60 w-40 border-4 border-solid border-white p-[5%] text-[violet] hover:border-(--border_color) lg:h-72 lg:w-49">
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
        <div className="h-10 w-40 overflow-x-hidden text-white md:hover:text-(--aqua_color_hover) lg:w-49">
          {posterDetail[i].title}
        </div>
      </a>
    );
    container.push(poster);
  }

  return (
    <div className="flex flex-wrap justify-start gap-[8.6vw] lg:gap-14">
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
    <div className="min-h-120 pt-16 pr-6 pb-8 pl-6 lg:pr-8 lg:pl-8">
      <div className="pb-8 text-2xl text-white md:text-3xl">similar movies</div>
      {posterDetail ? <SimilarMovie posterDetail={posterDetail} /> : null}
    </div>
  );
}
