import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";

export default async function SingleModel(
  model: ChatOpenAI<ChatOpenAICallOptions>,
  title: string,
) {
  // const ReviewSchema = z.object({
  //   development: z.string().describe("Note on development of {title} movie"),
  //   writing: z.string().describe("Note on writing of {title} movie"),
  //   filming: z.string().describe("Note on filming of {title} movie"),
  //   post_production: z
  //     .string()
  //     .describe("Note on post-production of {title} movie"),
  //   visual_effects: z
  //     .string()
  //     .describe("Note on visual effects of {title} movie"),
  //   plot: z.string().describe("Note on plot of {title} movie"),
  //   cast: z.string().describe("Note on cast of {title} movie"),
  // });
  // const parser = StructuredOutputParser.fromZodSchema(ReviewSchema);

  const parser = new StringOutputParser();
  const tokenLength = Math.random() * (50 - 35) + 35;
  const prompt_template = new PromptTemplate({
    template: `You are an expert on movies. 

If there is no movie with the name "${title}", reply exactly with: not found

Otherwise, generate detailed notes on the following aspects of {title} movie:
- Development
- Writing
- Filming
- Post-production
- Visual effects
- Plot
- Cast

Formatting rules:
- Each section must begin with a heading using a single # (for example: # Development).
- After each heading, insert a line break and then write the notes.
- Each section must contain between ${tokenLength} and ${tokenLength + 50} GPT tokens.
- Allowed formatting is limited to:
   *italic*
   **bold**
   # Heading
- No other markdown is allowed (no lists, links, blockquotes, or tables).
- The output must be a single plain string with line breaks only where needed for headings and paragraphs.`,
    inputVariables: ["title"],
    partialVariables: {},
  });
  const chain = prompt_template.pipe(model).pipe(parser);
  const stream = new ReadableStream({
    async start(controller) {
      console.log("inside the start ");
      const events = chain.streamEvents({ title: title }, { version: "v1" });
      for await (const event of events) {
        if (event.event === "on_llm_stream") {
          console.log(event.data.chunk?.text ?? "");
          controller.enqueue(event.data.chunk?.text ?? "");
        }
      }
      controller.close();
    },
  });
  //   return new Promise(stream);
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
