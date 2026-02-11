// middleware.ts (Edge runtime only)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Minimal middleware: only add cache headers for heavy static TradingView assets.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/charting_library/') ||
    pathname.startsWith('/trading_platform/') ||
    pathname.startsWith('/datafeeds/')
  ) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Expires', new Date(Date.now() + 31536000000).toUTCString());
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/charting_library/:path*',
    '/trading_platform/:path*',
    '/datafeeds/:path*',
  ],
};
