import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  console.log("token");
  console.log(token);
  console.log(url.pathname);
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/forgot-password"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
    console.log("doka");
  }

  if (!token && url.pathname.startsWith("/Introduction")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
