import SimilarMovieContainer from "./similarMovie.tsx";
import { useMediaQuery } from "react-responsive";
import { AllTypeFilter, PosterDetailType } from "../../../types/types.ts";
import FirstContainer from "./firstContainer.tsx";
import SecondGroup from "./secondGroup.tsx";
import SynopsisContainer from "./synopsisContainer.tsx";
import Footer from "../footer.tsx";
import Image from "next/image";

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
              <Image
                alt="backgroundImage"
                width={1304}
                height={1600}
                className="absolute -top-4 z-0 h-400 w-326 bg-cover bg-center opacity-30"
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
              />
            ) : null}
          </div>
          <div className="z-1 flex w-auto flex-col bg-linear-to-t from-(--full_opacity) to-transparent xl:w-326">
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
    </>
  );
}
