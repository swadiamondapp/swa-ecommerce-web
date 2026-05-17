import { NextResponse } from "next/server";

export function middleware(request) {

  const maintenanceMode = true;

  const pathname = request.nextUrl.pathname;

  // allow maintenance page + assets
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // BLOG REWRITE
  if (pathname.startsWith("/blog")) {
    const newPath = pathname.replace("/blog", "");

    return NextResponse.rewrite(
      `https://swavlog.zinfog.in${newPath}`
    );
  }

  // SEO SAFE MAINTENANCE MODE
  if (maintenanceMode) {

    const response = NextResponse.rewrite(
      new URL("/maintenance", request.url)
    );

    response.headers.set(
      "X-Robots-Tag",
      "noindex, nofollow"
    );

    response.headers.set(
      "Retry-After",
      "3600"
    );

    return new Response(response.body, {
      status: 503,
      headers: response.headers,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api).*)"],
};
