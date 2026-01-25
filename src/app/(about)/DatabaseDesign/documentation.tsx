import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function documentation() {
  const code1 = `const wrapped_title = '%' + title + '%'
const db = await getDatabaseConection()
let result: MovieListType[] = []
try {
  result = await db
    .select()
    .from(mainTable)
    .where(and(ilike(mainTable.title, wrapped_title), isNotNull(mainTable.releaseDate)))
    .orderBy(sql\`CASE WHEN main_table.title ilike \${title} THEN 1 ELSE 2 END ASC\`,desc(mainTable.title))
    .limit(limit)
    .execute()
} catch (error) {
  console.log(error)
}`;

  const code2 = `const db = await getDatabaseConection();
const result = await db
.select({
id: mainTable.id,
title: mainTable.title,
voteAverage: mainTable.voteAverage,
voteCount: mainTable.voteCount,
status: mainTable.status,
releaseDate: mainTable.releaseDate,
revenue: mainTable.revenue,
runtime: mainTable.runtime,
adult: mainTable.adult,
backdropPath: mainTable.backdropPath,
budget: mainTable.budget,
homepage: mainTable.homepage,
imdbId: mainTable.imdbId,
languageCode: mainTable.languageCode,
originalTitle: mainTable.originalTitle,
overview: mainTable.overview,
popularity: mainTable.popularity,
posterPath: mainTable.posterPath,
tagline: mainTable.tagline,
productionCompanies: mainTable.productionCompanies,
productionCountries: mainTable.productionCountries,
spokenLanguages: mainTable.spokenLanguages,
keywords: mainTable.keywords,
originalLanguage: abbreviationTable.originalLanguage,
action: genreTable.action,
scienceFiction: genreTable.scienceFiction,
adventure: genreTable.adventure,
drama: genreTable.drama,
crime: genreTable.crime,
thriller: genreTable.thriller,
fantasy: genreTable.fantasy,
comedy: genreTable.comedy,
romance: genreTable.romance,
western: genreTable.western,
mystery: genreTable.mystery,
war: genreTable.war,
animation: genreTable.animation,
family: genreTable.family,
horror: genreTable.horror,
music: genreTable.music,
history: genreTable.history,
tvMovie: genreTable.tvMovie,
documentary: genreTable.documentary,
})
.from(mainTable)
.leftJoin(
  abbreviationTable,
  eq(mainTable.languageCode, abbreviationTable.languageCode),
)
.innerJoin(genreTable, eq(mainTable.id, genreTable.id))
.where(eq(mainTable.id, id))
.execute();
return result;
} catch (err) {
  console.log(err);
  throw err;
}`;
  const code3 = `const wrapped_title = '%' + title + '%'
  const db = await getDatabaseConection()
  const result = await db
    .select({ id: mainTable.id, title: mainTable.title, posterPath: mainTable.posterPath })
    .from(mainTable)
    .where(and(ilike(mainTable.title, wrapped_title), not(eq(mainTable.id, selfid))))
    .orderBy(sql\`CASE WHEN main_table.title ilike \${title} THEN 1 ELSE 2 END ASC\`,desc(mainTable.title))
    .limit(limit)`;
  return (
    <>
      <div className="pb-14 text-4xl font-bold">Database Design</div>
      <div className="text-xl">
        <div className="pb-7">
          Database design is a crucial part of this website which serves
          priority data to the frontend. Postgres database is used in backend
          which is faster then any other other database.
        </div>
        <div className="pb-7">
          Database contain 3 table which are main table, genre table and
          abbreviation table. Main table is used in finding list of movies in
          {` '/'`} route. main table, genre table and abbreviation table are
          used for detail page in {`'/detail'`} route.
        </div>
        <div className="pb-7 text-3xl">Tables</div>
        <div className="pb-7">
          Main table contain 23 fields with there data type which are id
          (integer, primaryKey, notNull), title (varchar), voteAverage (text),
          voteCount (text), status: (text), releaseDate: (text), revenue
          (bigint), runtime integer, adult boolean, backdropPath (text), budget
          (bigint), homepage (text), imdbId (text), languageCode (varchar),
          originalTitle (text), overview (text), popularity (text), posterPath
          (text), tagline (text), productionCompanies (text),
          productionCountries (text), spokenLanguages (text), keywords: (text),
        </div>
        <div className="pb-7">
          Genre table contain 19 fields with there data type which are id
          (integer, primaryKey, notNull), action (boolean), scienceFiction
          (boolean), adventure (boolean), drama (boolean), crime (boolean),
          thriller (boolean), fantasy (boolean), comedy (boolean), romance
          (boolean), western (boolean), mystery (boolean), war (boolean),
          animation (boolean), family (boolean), horror (boolean), music
          (boolean), history (boolean), tvMovie (boolean), documentary
          (boolean),
        </div>
        <div className="pb-7">
          Abbreviation table contain 2 fields with there data type which are
          original language (varchar, primary key, notnull), language code
          (varchar).
        </div>
        <div className="pb-7 text-3xl">Handle Database in Backend</div>
        <div className="pb-7">
          There are total of three requests handle by the backend for database
          related query. From backend all the database query are handle by using
          drizzle orm with typescript. Drizzle orm checks structure and data
          types of all the api response from database server, it also simplify
          the writing of query.
        </div>
        <div className="pb-7">
          Before execution of Any query of any route a trigger is setup which
          will take the value(parameter) from html and add it in URL as query
          parameter. There is a POST request handler sit on backend which
          extract the query parameters from URL for every request from
          frontend.Query paremeter contains movie title, Query parameter then
          send to function which handle the connection of database and query to
          database. The code which handle this query is put inside the try catch
          statement for catching any error coming from database server during
          the execution of query.
        </div>
        <div className="pb-7 text-3xl">Movie List Query</div>
        <div className="pb-7">
          There are bunch of drizzle orm statements used in query code.
          {` 'select({id: mainTable.id, title: mainTable.title, releaseDate: mainTable.releaseDate })'`}
          statement is used for selecting the id , title , release date columns
          of table.
        </div>
        <div className="pb-7">
          {`'from(mainTable)'`} statement is used for selecting main table.
          {` 'where(
                      and(
                      ilike(mainTable.title, wrapped_title),
                      isNotNull(mainTable.releaseDate),
                    ),' `}
          this statement is used for conditional clause in which column of title
          of main table is equal to wrapped_title(query parameter) and release
          date should not be null.
        </div>
        <div className="pb-7">
          {` 'orderBy(
                    sql\`CASE WHEN main_table.title ilike \${title} THEN 1 ELSE 2 END ASC\`,
                    desc(mainTable.title),
                  )' `}
          this statement is use for ordering the output array in decreasing
          alphabatical order.
        </div>

        <div className="pb-7">
          <SyntaxHighlighter
            className="overflow-x-hidden pb-7 text-[15px]"
            language="javascript"
            style={atomDark}
            showLineNumbers={true}
            wrapLines={true}
            wrapLongLines={true}
          >
            {code1}
          </SyntaxHighlighter>
        </div>

        <div className="pb-7 text-3xl">Movie Detail Query</div>
        <div className="text-xl">
          <div className="pb-7">
            {`'select()', `}this keyword is for selecting the columns from
            table. {`'from(mainTable)', `} this keyword is use for selecting
            main table.
          </div>
          <div className="pb-7">
            {`'leftjoin()', `} this keyword is used for joining the main table
            and abbreviation table with the common column is {`' languageCode'`}
            .
          </div>
          <div className="pb-7">
            {`'innerJoin()', `} this keyword is used for joining the main table
            and genre table with the common column{`' id'`}.
          </div>

          <div className="pb-7">
            {`'where()', `} this keyword is used for conditional clause in which
            column of id of main table is equal to id(query parameter).
          </div>

          <div className="pb-7">
            <SyntaxHighlighter
              className="h-350 w-185 text-[15px]"
              language="javascript"
              style={atomDark}
              showLineNumbers={true}
              wrapLines={true}
            >
              {code2}
            </SyntaxHighlighter>
          </div>
          <div className="pb-7 text-3xl">Similar Movie Query</div>
          <div className="pb-7">
            This query execute in main table. Select the posterPath, title, id
            fields from the table.Where() keywords specify the conditional clase
            of title of main table contains wrapped_title and id of main table
            not equal to id(query parameter).Movie title is in order of
            alphabatical in decreasing.
          </div>
          <div className="pb-7">
            <SyntaxHighlighter
              className="h-60 w-185 text-[15px]"
              language="javascript"
              style={atomDark}
              showLineNumbers={true}
              wrapLines={true}
            >
              {code3}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
}

export default documentation;
