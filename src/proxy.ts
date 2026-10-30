import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


export function proxy(req: NextRequest) {
  if (getSessionCookie(req)) return NextResponse.next();

  const signInUrl = new URL("/signin", req.url);
  signInUrl.searchParams.set("error", "login-required");
  signInUrl.searchParams.set(
    "redirect",
    `${req.nextUrl.pathname}${req.nextUrl.search}`,
  );
  return NextResponse.redirect(signInUrl);
}

export const config = { matcher: ["/profile/:path*"] };