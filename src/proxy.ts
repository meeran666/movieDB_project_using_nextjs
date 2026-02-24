import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // if (
  //   (!token && url.pathname.startsWith("/Introduction")) ||
  //   url.pathname.startsWith("/movieDetail") ||
  //   url.pathname.startsWith("/Ai")
  // ) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // if (
  //   (!token && url.pathname.startsWith("/Ai")) ||
  //   url.pathname.startsWith("/movieDetail") ||
  //   url.pathname.startsWith("/Ai")
  // ) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
