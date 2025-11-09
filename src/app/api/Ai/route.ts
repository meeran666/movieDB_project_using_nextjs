import { ChatOpenAI } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";
import multipleModel from "./multiple_model";
import SingleModel from "./single_model";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get("title");
  if (title === null) {
    console.error("title is null");
    return NextResponse.json("Error");
  }
  const reader = `The development of the Deadpool movie is a long and tumultuous story of perseverance against the Hollywood system, lasting over a decade. It began when actor Ryan Reynolds became attached to the project in 2004, fiercely championing the character. His first attempt, a version of Deadpool in X-Men Origins: Wolverine (2009), was critically panned due to drastic character changes, including a sealed mouth. This failure, however, fueled Reynolds's determination to get an authentic, R-rated Deadpool film made. For years, Reynolds and writers Rhett Reese and Paul Wernik struggled to get studio 20th Century Fox to greenlight the project, facing constant rejection due to the desired R rating and the character's unconventional nature.

The project remained in development hell for years. A major breakthrough occurred in 2014 when test footage, commissioned by Reynolds and created by visual effects studio Blur Studio with a minimal budget, was leaked online. The viral positive reception from fans overwhelmingly demonstrated the market demand for this specific interpretation of the character. This fan-powered momentum finally convinced a hesitant Fox to approve a relatively small production budget of $58 million, a fraction of typical superhero film budgets.

To further mitigate financial risk, the marketing campaign was incredibly innovative and lean, heavily relying on雷诺兹's personal social media and cost-effective, cheeky promotional material that broke the fourth wall, perfectly in line with Deadpool's meta-humor. The film was shot quickly and efficiently under the direction of Tim Miller, making its debut feature. Upon its release in February 2016, Deadpool was a staggering, record-breaking success. It shattered box office records for an R-rated film and became the highest-grossing film in the X-Men franchise at that time, proving the viability of R-rated superhero films and the power of fan influence. Its success directly led to the greenlighting of Deadpool 2 and ultimately paved the way for the character's eventual integration into the Marvel Cinematic Universe, a journey that was just completed`;

  try {
    const repo_id = "deepseek/deepseek-chat-v3.1";
    const model1 = new ChatOpenAI({
      model: repo_id,
      apiKey: process.env.OPENROUTER_API_KEY,
      configuration: { baseURL: "https://openrouter.ai/api/v1" },
      maxTokens: 600,
    });
    const stream = multipleModel(model1, title, topic);
    // const stream = await SingleModel(model1, title);

    return stream;
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error");
  }
}
