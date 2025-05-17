import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/verify"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log("token");
  console.log(token);
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
  ) {
    console.log("redirect");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && url.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
