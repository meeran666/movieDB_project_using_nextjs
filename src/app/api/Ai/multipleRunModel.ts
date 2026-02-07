import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import redis from "@/lib/redis";
import { useSession } from "next-auth/react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function MultipleRunModel(
  title: string,
  tokenObj: { llmTokens: number; requests: number; id: string },
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

        // commentable for testing
        // for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
        //   if (topicIndex === 6) {
        //     break;
        //   }
        //   const topic =
        //     topics[topicIndex][0].toUpperCase() + topics[topicIndex].slice(1);
        //   const header = `\n<div style="width: 100%">
        //   <strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white;">${topic}</strong></div>\n\n`;
        //   let buffer = "";

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
        //           tokenObj.llmTokens--;
        //           console.log(token);
        //           controller.enqueue(encoder.encode(token));
        //         },
        //       },
        //     ],
        //   });

        //   const formattedPrompt = await prompt_template.format({
        //     title,
        //     topic: topics[topicIndex],
        //   });

        //   // await llm.invoke(formattedPrompt);
        //   const result = await llm.generate([[formattedPrompt]]);

        //   const usage = result.llmOutput?.tokenUsage;
        //   if (usage) {
        //     totalCompletionTokens += usage.completionTokens;
        //   }
        // }
        // controller.enqueue(
        //   encoder.encode(
        //     `\n\n__END__{"completionTokens":${JSON.stringify({
        //       completionTokens: totalCompletionTokens,
        //     })}}}`,
        //   ),
        // );

        // for testing the design of ai response
        const header_test = `<div style="width: 100%">
<strong style="font-size: 25px; display:block; margin-top:10px; margin-bottom:5px; color: white">Development<strong><div>

It is impossible to discuss the development.`;
        const array = header_test.split(" ");

        for (let i = 0; i < 500; i++) {
          if (tokenObj.llmTokens <= 0) {
            console.log("ok this is it");
            break;
          }
          controller.enqueue(array[i]);
          tokenObj.llmTokens--;

          controller.enqueue(" ");
          await sleep(1);
        }

        //this is commone part with testing
        console.log("tokenObj.llmTokens");

        await redis.hincrby(tokenObj.id, "requests", -1);
        await redis.hset(tokenObj.id, { ["tokens"]: tokenObj.llmTokens });

        controller.enqueue(
          encoder.encode(
            `\n\n__END__{"usage":{"completionTokens":${tokenObj.llmTokens},"requests":${tokenObj.requests}}}`,
          ),
        );
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
  return stream;
}
