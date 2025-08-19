import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /rooms route
  if (pathname.startsWith("/rooms")) {
    const bookingInfo = Cookies.get("bookingInfo");

    if (!bookingInfo) {
      // ❌ No cookie → redirect to homepage
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply only to /rooms
export const config = {
  matcher: ["/rooms/:path*"],
};
