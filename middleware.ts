import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.nextUrl.hostname;

  // Enforce canonical host: takeitrip.es
  if (host === "takeitrip.com" || host === "www.takeitrip.com" || host === "www.takeitrip.es") {
    url.hostname = "takeitrip.es";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
