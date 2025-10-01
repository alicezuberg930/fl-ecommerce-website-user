import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value
    const path = request.nextUrl.pathname
    if (accessToken && path === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    } else if (!accessToken && path.startsWith('/user')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See 'Matching Paths' below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/user/:path*',
        // '/((?!auth).*)(.+)|/login',
        // '/((?!api|_next/static|_next/image|favicon.ico|auth|$).*)',
    ]
}