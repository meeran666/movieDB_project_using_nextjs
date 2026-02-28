import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    const message = "Unauthorized, accessing token is not allowed";
    console.error(message);
    return NextResponse.json(
      {
        error: message,
      },
      { status: 401 },
    );
  }

  const id = token.id;
  const credit = await redis.hgetall(id);
  if (Number(credit.tokens) <= 0 || Number(credit.requests) <= 0) {
    return NextResponse.json({
      llmTokens: Number(credit.token),
      requests: Number(credit.requests),
    });
  }
  return NextResponse.json({
    llmTokens: Number(credit.tokens),
    requests: Number(credit.requests),
  });
}
