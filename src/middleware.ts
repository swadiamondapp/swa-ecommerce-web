import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/blog')) {
    const newPath = request.nextUrl.pathname.replace('/blog', '');
    return NextResponse.rewrite(`https://swavlog.zinfog.in${newPath}`);
  }
}

export const config = {
  matcher: '/blog/:path*'
};
