function documentation() {
  return (
    <>
      <div className="pb-14 text-4xl font-bold">Future Update</div>

      <div className="text-xl">
        <div className="pb-7">
          The current version of website is (0.1.0). In the next version (1.1.0)
          there will be lots of amazing future updates coming. I will integrate
          the AI and adding more well design intractive frontend to this
          website.
        </div>
        <div className="pb-7 text-3xl">AI</div>
        <div className="pb-7">
          My AI feature will find any new movie will perform good or not on the
          basis of revenue. you will get the options or fields to put the info
          of movie such as budget, spoken language, original language, original
          title, is adult or not, actors or actores name, producer name,
          production countries, production compannies, director name.
        </div>
        <div className="pb-7">
          It will output how much the movie will make on revenue basis. So it
          will predict the whether the movie will perform good or not.
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[min(40rem,100%)] items-center justify-center pb-7">
            <img src="/AI_image.jpg" alt="" className={`h-auto w-full`} />
          </div>
        </div>
      </div>
    </>
  );
}

export default documentation;
