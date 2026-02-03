import { getToken } from "next-auth/jwt";
import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import MultipleRunModel from "./multipleRunModel";
type UserTokenResult =
  | {
      ok: true;
      token_limit: number;
      id: string;
    }
  | {
      ok: false;
      error: "UNAUTHORIZED" | "LIMIT_EXCEEDED";
    };
// import SingleModel from "./single_model";
async function daily_request_no_update() {
  const request_count_key = "request_count";
  const day_passed = Date.now() % 86400000;
  const day_left = 86400000 - day_passed;
  const expire_time = Math.round(day_left / 1000);
  const exists_request_count_key = await redis.exists(request_count_key);
  if (!exists_request_count_key) {
    console.log("inside the expire term");
    await redis.set(request_count_key, 0, "EX", expire_time);
  }
  const usage = await redis.incr(request_count_key);
  return usage;
}
async function user_token_no_update(
  request: NextRequest,
): Promise<UserTokenResult> {
  const day_passed = Date.now() % 86400000;
  const day_left = 86400000 - day_passed;
  const expire_time = Math.round(day_left / 1000);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  const id = token.id ?? "";
  const exists_id = await redis.exists(id);

  if (!exists_id) {
    const token_no = 2000;
    await redis
      .multi()
      .hset(id, {
        requests: 5,
        tokens: token_no,
      })
      .expire(id, expire_time)
      .exec();
    await redis.expire(id, expire_time);

    return { ok: true, token_limit: token_no, id: id };
  }

  const credit = await redis.hgetall(id);

  if (Number(credit.tokens) <= 0 || Number(credit.requests) <= 0) {
    return { ok: false, error: "LIMIT_EXCEEDED" };
  }

  return {
    ok: true,
    token_limit: Number(credit.tokens),
    id,
  };
}

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
    const user_token = await user_token_no_update(request);

    if (!user_token.ok) {
      if (user_token.error === "UNAUTHORIZED") {
        return new Response("Unauthorized, accessing token is not allowed", {
          status: 401,
        });
      }

      if (user_token.error === "LIMIT_EXCEEDED") {
        return NextResponse.json(
          { error: "your credits for LLM ended" },
          { status: 402 },
        );
      }
      return;
    }
    const tokenObj = { token_limit: user_token.token_limit, id: user_token.id };

    const stream = await MultipleRunModel(title, tokenObj, request.signal);
    // const stream = await SingleRunModel(title);

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
