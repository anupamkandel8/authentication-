import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value;

  if (isPublic && token) {
    // If the user is trying to access a public route but already has a token, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublic && !token) {
    // If the user is trying to access a protected route without a token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If the user is accessing a public route or has a valid token, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
};
