import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { refreshToken } from '@/actions/auth'

const protectedRoutes = ['/orders']

export default async function middleware (req: NextRequest) {
    const path = req.nextUrl.pathname
    const cookieStore = await cookies()
    const { access_token, expires_at } = JSON.parse(cookieStore.get('session')?.value ?? '{}')
    const isAuthenticated = !!access_token
    const isProtectedRoute = protectedRoutes.includes(path)
    const isTokenExpiring = !expires_at || (new Date(expires_at).getTime() - Date.now()) < 30 * 1000

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (!isProtectedRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/orders', req.nextUrl))
    }

    if (isTokenExpiring && !await refreshToken()) {
        cookieStore.delete('session')
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)']
}
