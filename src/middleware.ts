import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";

  if (hostname === "www.takeitrip.es") {
    const url = req.nextUrl.clone();
    url.hostname = "takeitrip.es";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};