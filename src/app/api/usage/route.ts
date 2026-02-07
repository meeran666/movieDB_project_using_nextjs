import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json(
      {
        error: "Unauthorized, accessing token is not allowed",
      },
      { status: 401 },
    );
  }

  const id = token.id;
  const credit = await redis.hgetall(id);
  if (Number(credit.tokens) <= 0 || Number(credit.requests) <= 0) {
    return {
      llmTokens: Number(credit.token),
      requests: Number(credit.requests),
    };
  }
  return NextResponse.json({
    llmTokens: credit.tokens,
    requests: credit.requests,
  });
}
