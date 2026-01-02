import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

export default async function SingleRunModel(title: string) {
  const encoder = new TextEncoder();
  // const parser = new StringOutputParser();
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
  const tokenLength = Math.random() * (50 - 35) + 35;

  const prompt_template = new PromptTemplate({
    template: `You are an expert on movies. 

If there is no movie with the name "{title}", reply exactly with: not found

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
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let buffer = "";

        //  Create a fresh streaming LLM with callbacks
        const repo_id = "deepseek/deepseek-chat-v3.1";
        const llm = new ChatOpenAI({
          model: repo_id,
          apiKey: process.env.OPENROUTER_API_KEY,
          temperature: 0.7,
          streaming: true,
          configuration: { baseURL: "https://openrouter.ai/api/v1" },

          callbacks: [
            {
              handleLLMNewToken(token: string) {
                buffer += token;
                console.log("does it work");
                controller.enqueue(encoder.encode(token));
              },
            },
          ],
        });

        const formattedPrompt = await prompt_template.format({ title });

        await llm.invoke(formattedPrompt);

        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return stream;
}
