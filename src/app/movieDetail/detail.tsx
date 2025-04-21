import SimilarMovieContainer from "./similarMovie.tsx";
import Star from "@/public/star.svg";
import { useMediaQuery } from "react-responsive";
import { AllType, PosterDetailType } from "../api/types.ts";
import FirstContainer from "./firstContainer.tsx";
import SecondGroup from "./secondGroup.tsx";
import SynopsisContainer from "./synopsisContainer.tsx";

export default function Detail({
  detail,
  date,
  genre,
  posterDetail,
}: {
  detail: AllType;
  date: string;
  genre: string;
  posterDetail: PosterDetailType[] | null;
}) {
  const isMobile = useMediaQuery({ maxWidth: 780 });
  console.log(detail.posterPath);
  return (
    <>
      <div className="bg-[black]">
        <div className="relative flex w-[100%] flex-col items-center">
          {detail.posterPath ? (
            <img
              alt="backgroundImage"
              className="top-[-1rem] w-[81.5rem] bg-cover bg-center opacity-[0.3]"
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
            />
          ) : (
            <div className="h-489 w-[100%]"></div>
          )}
          <div className="absolute flex min-h-489 w-[81.5rem] flex-col max-[1330px]:w-auto">
            <div className="bg-gradient-to-t from-(--full_opacity) to-transparent">
              <FirstContainer
                detail={detail}
                genre={genre}
                date={date}
                isMobile={isMobile}
              />
              {isMobile ? <SecondGroup detail={detail} /> : null}
              <SynopsisContainer detail={detail} />
              <SimilarMovieContainer posterDetail={posterDetail} />
            </div>

            <div className="w-[100%] grow-1 bg-black"></div>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <div className="bg-[black]">
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
</div> */
}
