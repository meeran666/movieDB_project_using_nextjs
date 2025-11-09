import ReactMarkdown from "react-markdown";

const content = `
#### Development Timeline  
- Ryan Reynolds first portrays a version of the character in 2009's *X-Men Origins: Wolverine*, a portrayal met with widespread criticism from fans and the actor himself.  
- Reynolds championed a faithful, R-rated adaptation for years, facing significant resistance from 20th Century Fox who were hesitant to greenlight a hard-R comic book movie.  
- In 2014, test footage for a more authentic Deadpool film leaked online. The overwhelmingly positive fan reaction to the leak forced the studio to officially greenlight the project.  
- The film was made on a relatively small budget of $58 million, a fraction of typical superhero movie budgets, which reduced financial risk for the studio.  
- *Deadpool* was released in 2016 and became a massive critical and commercial success, breaking numerous box office records and proving the viability of R-rated superhero films.  

#### Creative Team and Style  
- The film was directed by Tim Miller, marking his feature directorial debut, and written by Rhett Reese and Paul Wernick.  
- Ryan Reynolds was deeply involved as a producer, ensuring the character's signature meta-humor, fourth-wall-breaking, and comedic tone were central to the film.  
- The movie is noted for its self-referential comedy, openly mocking other superhero films, its own low budget, and Ryan Reynolds' earlier career missteps.  
- It successfully blended extreme violence and crude humor with a genuine emotional core, primarily the love story between Wade Wilson and Vanessa.  

#### Impact and Legacy  
- The success of *Deadpool* is widely credited with revolutionizing the superhero genre by proving that R-rated, adult-oriented comic book films could be tremendously profitable.  
- It directly led to the greenlighting of other R-rated superhero projects, such as *Logan* (2017) and *Joker* (2019).  
- The film launched a successful franchise, including a sequel (*Deadpool 2*) and its upcoming integration into the Marvel Cinematic Universe as *Deadpool & Wolverine*.  

`;

export default function Page() {
  return (
    <div className="prose mx-auto max-w-2xl border p-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
