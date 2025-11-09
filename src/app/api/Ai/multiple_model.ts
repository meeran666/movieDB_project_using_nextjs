import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
export default async function multipleModel(
  model: ChatOpenAI<ChatOpenAICallOptions>,
  title: string,
  topic: string,
) {
  console.log();
  const parser = new StringOutputParser();
  const extraTokenNo = Math.random() * (50 - 35) + 35;
  const prompt_template = new PromptTemplate({
    template: `You are an expert on movies. 
If there is no movie with the name "{title}", reply exactly with: not found

Otherwise, generate detailed notes on "{topic}" of "{title}" movie. 
The output must be a single plain string with line breaks only. 
You may use only two markdown symbols: * for italics and ** for bold. 
Do not use any other markdown, no headings, no lists, and no special characters. 
Make sure the response is at least ${extraTokenNo} tokens long, but does not exceed ${extraTokenNo + 50} tokens.`,
    inputVariables: ["title", "topic"],
    partialVariables: {},
  });

  // console.log("prompt_template");
  // const prompt = await prompt_template.format({
  //   text: value,
  //   topic: "development",
  // });
  // console.log(prompt);
  const chain = prompt_template.pipe(model).pipe(parser);
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
      for (let idx = 0; idx < topics.length; idx++) {
        let buffer = "";
        if (buffer === "not found") {
          break;
        }
        if (idx === 1) {
          break;
        }
        const topic = topics[idx][0].toUpperCase() + topics[idx].slice(1);
        const header = `\n<div style="width: 100%" ><strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">${topic}</strong></div>\n\n`;
        controller.enqueue(header);
        const events = chain.streamEvents(
          { title: title, topic: topics[idx] },
          { version: "v2" },
        );

        for await (const event of events) {
          // console.log(event.data.chunk?.text);
          if (event.event === "on_llm_stream") {
            const token = event.data.chunk?.text ?? "";
            console.log(token);
            buffer = buffer + `${token}`;
            controller.enqueue(`${token}`);
          }
        }
      }
      controller.close();
    },
  });
  return stream;
}
