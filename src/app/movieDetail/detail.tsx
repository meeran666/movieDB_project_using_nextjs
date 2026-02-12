import SimilarMovieContainer from "./similarMovie.tsx";
import Star from "@/public/star.svg";
import { useMediaQuery } from "react-responsive";
import { AllTypeFilter, PosterDetailType } from "../../../types/types.ts";
import FirstContainer from "./firstContainer.tsx";
import SecondGroup from "./secondGroup.tsx";
import SynopsisContainer from "./synopsisContainer.tsx";
import Footer from "../footer.tsx";

export default function Detail({
  detail,
  date,
  genre,
  posterDetail,
}: {
  detail: AllTypeFilter;
  date: string;
  genre: string;
  posterDetail: PosterDetailType[] | null;
}) {
  const isMobile = useMediaQuery({ maxWidth: 780 });
  return (
    <>
      <div className="bg-[black]">
        <div className="-z-1 flex w-screen flex-col items-center overflow-hidden">
          <div className="relative flex justify-center">
            {detail.posterPath ? (
              <img
                alt="backgroundImage"
                className="absolute -top-4 z-0 h-400 w-326 bg-cover bg-center opacity-30"
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
              />
            ) : null}
          </div>
          <div className="z-[1] flex w-auto flex-col bg-gradient-to-t from-(--full_opacity) to-transparent xl:w-326">
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
        </div>
      </div>
      <Footer />

      {/* <div className="bg-[black]">
        <div className="relative flex w-[100%] flex-col items-center">
          {detail.posterPath ? (
            <img
              alt="backgroundImage"
              className="top-[-1rem] overflow-hidden w-[81.5rem] bg-cover bg-center opacity-[0.3]"
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
      </div> */}
    </>
  );
}
