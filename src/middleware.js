import { NextResponse } from "next/server";

export function middleware(request) {

  // ===== MAINTENANCE MODE =====
  const maintenanceMode = true;

  const pathname = request.nextUrl.pathname;

  // Allow maintenance page + next assets
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // ===== BLOG REWRITE =====
  if (pathname.startsWith("/blog")) {
    const newPath = pathname.replace("/blog", "");

    return NextResponse.rewrite(
      `https://swavlog.zinfog.in${newPath}`
    );
  }

  // ===== REDIRECT TO MAINTENANCE =====
  if (maintenanceMode) {
    return NextResponse.redirect(
      new URL("/maintenance", request.url),
      302
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api).*)"],
};
