import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import redis from "@/lib/redis";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function MultipleRunModel(
  title: string,
  tokenObj: { token_limit: number; id: string },
  request_signal: AbortSignal,
) {
  const encoder = new TextEncoder();
  const token_number = Math.trunc(Math.random() * 16 + 35);
  const max_token_number = token_number + 50;

  const prompt_template = new PromptTemplate({
    template: `You are an expert on movies. 
If there is no movie with the name "{title}", reply exactly with: not found

Otherwise, generate detailed notes on "{topic}" of "{title}" movie. 
The output must be a single plain string with line breaks only. 
You may use only two markdown symbols: * for italics and ** for bold. 
Do not use any other markdown, no headings, no lists, and no special characters. 
Make sure the response is at least ${token_number} tokens long, but does not exceed ${max_token_number} tokens.`,
    inputVariables: ["title", "topic"],
  });
  const topics = [
    "development",
    "writing",
    "filming",
    "post-production",
    "visual effects",
    "plot",
    "cast",
  ];

  const stream = new ReadableStream({
    async start(controller) {
      try {
        request_signal.addEventListener("abort", () => {
          console.log(" Client aborted request");

          controller.close();
        });

        //commentable for testing
        // for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
        //   if (topicIndex === 6) {
        //     break;
        //   }
        //   let buffer = "";
        //   const topic =
        //     topics[topicIndex][0].toUpperCase() + topics[topicIndex].slice(1);
        //   const header = `\n<div style="width: 100%">
        //     <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">${topic}</strong></div>\n\n`;

        //   controller.enqueue(encoder.encode(header));

        //   // Create a NEW streaming LLM for EACH topic
        //   const repo_id = "deepseek/deepseek-chat-v3.1";

        //   const llm = new ChatOpenAI({
        //     model: repo_id,
        //     apiKey: process.env.OPENROUTER_API_KEY,
        //     temperature: 0.7,
        //     configuration: { baseURL: "https://openrouter.ai/api/v1" },
        //     streaming: true,
        //     // maxTokens: 20,
        //     callbacks: [
        //       {
        //         async handleLLMNewToken(token: string) {
        //           buffer += token;
        //           console.log(token);
        //           controller.enqueue(encoder.encode(token));
        //           tokenObj.token_limit--;
        //           if (tokenObj.token_limit <= 0) {
        //             await redis.hincrby(tokenObj.id, "requests", -1);
        //             await redis.hset(
        //               tokenObj.id,
        //               "tokens",
        //               tokenObj.token_limit,
        //             );

        //             controller.close();
        //           }
        //         },
        //       },
        //     ],
        //   });

        //   const formattedPrompt = await prompt_template.format({
        //     title,
        //     topic: topics[topicIndex],
        //   });

        //   await llm.invoke(formattedPrompt);
        // }

        // for testing the design of ai response
        const header_test = `<div style="width: 100%">
                    <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">Development</strong></div>

It is impossible to discuss the development of *The Social Network* without first acknowledging the source material. The film is adapted from Ben Mezrich's 2009 book *The Accidental Billionaires*, which presented a dramatized account of Facebook's early days. Producer Scott Rudin purchased the rights, recognizing its cinematic potential. He sent the book to director David Fincher, who was initially hesitant, fearing it was simply a "website movie." However, screenwriter Aaron Sorkin's involvement was the catalyst. Sorkin, renowned for his rapid-fire dialogue, was writing the script concurrently with Mezrich writing the book. Sorkin conducted his own extensive research, crafting a narrative less about the technical creation of a website and more about timeless themes of friendship, betrayal, power, and class. Fincher was ultimately persuaded by Sorkin's brilliant script, which framed the story as a high-stakes tragedy. Casting was meticulous; Jesse Eisenberg was not the first choice for Mark Zuckerberg, but his intense and intellectually nimble audition won Fincher over. Similarly, Justin Timberlake's casting as Sean Parker was a stroke of genius, leveraging his charismatic persona. The entire film was shot with a RED One camera, and Fincher's notorious perfectionism demanded numerous takes to achieve the specific, rhythmic pacing of Sorkin's dialogue. The score, by Trent Reznor and Atticus Ross, provided a dark, atmospheric tone that became iconic. The development was a masterclass in assembling a perfect creative team to elevate a modern story into a classic.
<div style="width: 100%">
            <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">Writing</strong></div>

The screenplay by *Aaron Sorkin* is a masterclass in **dialogue-driven** narrative. Based on Ben Mezrich's book, it uses a **non-linear structure** with depositions framing the flashbacks. The **witty**, rapid-fire dialogue defines character and propels the plot. It brilliantly explores themes of **friendship**, **betrayal**, and ambition, compressing complex legal battles into a compelling human drama about the creation of Facebook.
<div style="width: 100%">
            <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">Filming</strong></div>

The filming of *The Social Network* was famously fast paced, completed in just two months. Director David Fincher insisted on numerous takes, sometimes over a hundred for a single scene, to achieve a specific rhythm. Cinematographer Jeff Cronenweth used a **Red One MX digital camera** to create a cool, atmospheric look. The Winklevoss twins were portrayed by Armie Hammer, with Josh Pence serving as a body double; their faces were **digitally composited** in post-production. Key locations included Harvard University, though filming there was restricted; Johns Hopkins University stood in for many Harvard exteriors.
<div style="width: 100%">
            <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">Post-production</strong></div>
The *Social Network*'s post-production was crucial. Editors **Kirk Baxter** and **Angus Wall** assembled the rapid-fire dialoSgue, creating a tense, rhythmic pace. The **Oscar-winning** score by **Trent Reznor** and **Atticus Ross** provided a dark, electronic soundscape. **Sound design** meticulously built the Harvard environments, while **color grading** established a cool, moody palette reflective of the film's themes.
<div style="width: 100%">
            <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">Visual effects</strong></div>
not found
<div style="width: 100%">
            <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">PlotS</strong></div>
The film chronicles Mark Zuckerberg's creation of Facebook. It begins with his breakup and subsequent hacking of Harvard's databases to create *Facemash*. This attracts the attention of twins Cameron and Tyler Winklevoss, who hire him to build *HarvardConnection*. Instead, Zuckerberg, with funding from his friend Eduardo Saverin, builds *TheFacebook*. The plot follows the site's explosive growth, the resulting lawsuits, and the fracturing of Zuckerberg's friendships.<S`;
        const array = header_test.split(" ");

        for (let i = 0; i < 500; i++) {
          if (tokenObj.token_limit <= 0) {
            console.log("ok this is it");
            break;
          }
          controller.enqueue(array[i]);
          tokenObj.token_limit--;

          controller.enqueue(" ");
          await sleep(1);
        }
        await redis.hincrby(tokenObj.id, "requests", -1);
        await redis.hset(tokenObj.id, "tokens", tokenObj.token_limit);

        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
  return stream;
}
