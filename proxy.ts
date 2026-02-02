import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const apiKey = request.cookies.get("cal_api_key")?.value;
  const isSetupPage = request.nextUrl.pathname === "/setup";

  // If no API key and not on setup page, redirect to setup
  if (!apiKey && !isSetupPage) {
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  // If API key exists and on setup page, redirect to event-types
  if (apiKey && isSetupPage) {
    return NextResponse.redirect(new URL("/event-types", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|setup).*)",
    "/setup",
  ],
};
