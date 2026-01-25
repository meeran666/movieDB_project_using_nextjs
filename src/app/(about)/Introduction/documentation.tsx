"use client";

function Documentation() {
  return (
    <>
      <div className="pb-14 text-4xl font-bold">Introduction</div>
      <div className="text-xl">
        <div className="pb-7">
          Moviemania is a website for searching info of a movies. This website
          uses Nextjs framework.
        </div>
        <div className="pb-7">
          You can search any movie which has been released ever in history. You
          will get the list of detail which are release date, genre, is movie
          adult or not, runtime, budget, revenue, original language, Average
          vote, spoken language, production companies, production countries,
          homepage, keywords, tagline, original title of a particular movie you
          want to search. You will even get poster of movie and the synopsis.
        </div>
        <div className="pb-7">
          Searching is done by name of movie. In home page you will get the
          search box where you can type the movie name or you can even type the
          part of movie name you want to search. After searching you will get
          the list of movie name. From that list you can chose the movie name
          you want to chose and see the detail.
        </div>
        <div className="pb-7 text-3xl">Searching go Through</div>
        <div className="pb-7">
          Home page is a first page comes when you can open website moviemania.
          Home page contain navbar and footer which is a part of every route
          layout and contains searchbox also.
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[min(40rem,100%)] items-center justify-center pb-7">
            <img src="/desktop_home.png" alt="" className={`h-auto w-full`} />
          </div>
        </div>
        <div className="flex items-center justify-center pb-7">
          <img src="/mobile_home.png" alt="" className="h-100 w-auto" />
        </div>
        <div className="pb-7">
          When you click or touch on search box you can put title or name of
          movie. If you {`don't`} know the full name or spelling of name there
          is another option for you to serach, which is you could also put part
          of name or title of movie in search box. For searching a movie you
          have to click or touch on serach button or press enter which will
          trigger the sending of title of movie to backend, there it will search
          and send back the list of movies to frontend.
        </div>
        <div className="pb-7">
          List contains at most 50 movie name, every row contains three
          parameters which are index, title and release date in sequence. If you
          hover over the rows it will change color for indicating hover. List
          contain titles which contain the key search title not any other
          titles. Even if two or greater then two movie have same name you can
          identity by the release date to choose between different movies.
        </div>
        <div className="">
          All rows are links by clicking or touching the rows lets you reach to
          detail page route of that movie
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[min(40rem,100%)] items-center justify-center pb-7">
            <img src="/desktop_home.png" alt="" className={`h-auto w-full`} />
          </div>
        </div>{" "}
        <div className="flex items-center justify-center pb-7">
          <img src="/mobile_home.png" alt="" className="h-100 w-auto" />
        </div>
        <div className="pb-7 text-3xl">Detail Page</div>
        <div className="pb-7">
          Opening the detail page route of a particular movie such as{" "}
          {`'The
            lord of the rings'`}
          contain four sections of info.
        </div>
        <div className="pb-7">
          First section contain original title of movie, release date, genre, is
          movie adult or not (if not Adult {`'PG'`} will be written if Adult
          then {`'Adult'`} will be written), Poster of movie.
        </div>
        <div className="pb-7">
          Second section contain runtime, budget, revenue, original language,
          average vote, spoken language, production countries, production
          companies, homepage (link), keywords, tagline, original title.
        </div>
        <div className="pb-7">
          Third section contain synopsis. {`It's`} length could possibly be high
          ${`that's `} why it gets its own section with dynamic width
        </div>
        <div className="pb-7">
          Forth section name is similar movies. This section contain similar
          movie poster with there movie title. These all are the links to reach
          there detail page. When you click on any poster or below title part it
          will take you to detail page.
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[min(40rem,100%)] items-center justify-center pb-7">
            <img src="/desktop_home.png" alt="" className={`h-auto w-full`} />
          </div>
        </div>{" "}
        <div className="flex items-center justify-center pb-7">
          <img src="/mobile_home.png" alt="" className="h-100 w-auto" />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[min(40rem,100%)] items-center justify-center pb-7">
            <img src="/desktop_home.png" alt="" className={`h-auto w-full`} />
          </div>
        </div>{" "}
        <div className="flex items-center justify-center pb-7">
          <img src="/mobile_home.png" alt="" className="h-100 w-auto" />
        </div>
      </div>
    </>
  );
}

export default Documentation;
