import { getToken } from "next-auth/jwt";
import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import MultipleRunModel from "./multipleRunModel";
// import SingleModel from "./single_model";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get("title");
  // title = "deadpool";
  if (title === null) {
    console.error("title is null");
    return NextResponse.json("Error");
  }

  try {
    const request_count_key = "request_count";
    const day_passed = Date.now() % 86400000;
    const day_left = 86400000 - day_passed;
    const expire_time = Math.round(day_left / 1000);
    // const expire_flag = await redis.ttl(key);
    let exists = await redis.exists(request_count_key);

    if (!exists) {
      console.log("inside the expire term");
      await redis.set(request_count_key, 0, "EX", expire_time);
    }
    const usage = await redis.incr(request_count_key);
    // const value = await redis.get(key);
    // console.log(value);
    if (usage >= 40) {
      return NextResponse.json(
        {
          error:
            "request connection reached the limit for LLM for whole system",
        },
        { status: 429 },
      );
    }

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    console.log("token.id");
    console.log(token.id);
    const id = token.id ?? "";
    //checking the user's token exist or not
    exists = await redis.exists(id);
    let token_limit = 1000;
    const tokenObj = { token_limit: token_limit };
    if (!exists) {
      //storing user's token

      console.log("inside the expire term");
      await redis.hset(id, {
        requests: 5,
        tokens: 1000,
      });
      redis.expire(id, expire_time);
    } else {
      const credit = await redis.hgetall(id);
      token_limit = Number(credit.tokens);
      console.log(credit);

      if (Number(credit.tokens) <= 0 || Number(credit.requests) <= 0) {
        return NextResponse.json(
          {
            error: "your credits for LLM ended ",
          },
          { status: 402 },
        );
      }
    }

    const stream = await MultipleRunModel(title, tokenObj, request.signal);
    // const stream = await SingleRunModel(title);
    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        console.log("tokenObj.token_limit");
        console.log(tokenObj.token_limit);
        console.log("stream ended");
        break;
      }

      // use value
    }

    await redis.hincrby(id, "requests", -1);

    await redis.hset(id, "tokens", tokenObj.token_limit);
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error");
  }
}
