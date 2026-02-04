import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("id") ?? "";
  const credit = await redis.hgetall(id);
  if (Number(credit.tokens) <= 0 || Number(credit.requests) <= 0) {
    return { llmTokens: 0, requests: 0 };
  }
  return NextResponse.json({
    tokens: credit.tokens,
    requests: credit.requests,
  });
}
