import { getToken, JWT } from "next-auth/jwt";
import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import MultipleRunModel from "./multipleRunModel";

// import SingleModel from "./single_model";
async function daily_request_no_update() {
  const request_count_key = "request_count";
  const day_passed = Date.now() % 86400000;
  const day_left = 86400000 - day_passed;
  const expire_time = Math.round(day_left / 1000);
  const exists_request_count_key = await redis.exists(request_count_key);
  if (!exists_request_count_key) {
    await redis.set(request_count_key, 0, "EX", expire_time);
  }
  const usage = await redis.incr(request_count_key);

  return usage;
}
type tokenObjtype =
  | {
      ok: true;
      id: string;
      llmTokens: number;
      requests: number;
    }
  | { ok: false };
async function user_token_no_update(token: JWT): Promise<tokenObjtype> {
  const day_passed = Date.now() % 86400000;
  const day_left = 86400000 - day_passed;
  const expire_time = Math.round(day_left / 1000);
  const id = token.id;
  const exists_id = await redis.exists(id);
  if (!exists_id) {
    const token_no = 2000;
    const requests = 5;
    const exists = await redis.exists(id);

    if (!exists) {
      await redis
        .multi()
        .hset(id, {
          requests: requests,
          tokens: token_no,
        })
        .expire(id, expire_time)
        .exec();
    }
    return { ok: true, id: id, llmTokens: token_no, requests: requests };
  }

  const credit = await redis.hgetall(id);

  if (Number(credit.tokens) <= 0 || Number(credit.requests) <= 0) {
    return { ok: false };
  }

  return {
    ok: true,
    llmTokens: Number(credit.tokens),
    requests: Number(credit.requests),
    id,
  };
}
// the post request
export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return new Response("Unauthorized, accessing token is not allowed", {
      status: 401,
    });
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get("title");
  // title = "deadpool";
  if (title === null) {
    console.error("title is null");
    return NextResponse.json("Error");
  }

  try {
    // daily request no value update
    const usage = await daily_request_no_update();
    if (usage >= 40) {
      return NextResponse.json(
        {
          error:
            "request connection reached the limit for LLM for whole system",
        },
        { status: 429 },
      );
    }
    //user token no update

    const user_token = await user_token_no_update(token);
    if (!user_token.ok) {
      return NextResponse.json(
        { error: "your credits for LLM ended" },
        { status: 402 },
      );
    }

    const tokenObj = {
      id: user_token.id,
      llmTokens: user_token.llmTokens,
      requests: user_token.requests,
    };

    const stream = await MultipleRunModel(title, tokenObj, request.signal);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(`Error:  ${error}`);
  }
}
