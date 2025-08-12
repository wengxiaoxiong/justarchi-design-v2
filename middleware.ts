import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAdminJwt, getSessionCookieName } from './lib/auth/jwt'

export const config = {
  matcher: ['/admin/:path*'],
}

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  // Allow login page itself
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(getSessionCookieName())?.value
  if (!cookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.search = search ? `?from=${encodeURIComponent(pathname + search)}` : `?from=${encodeURIComponent(pathname)}`
    return NextResponse.redirect(url)
  }

  const payload = await verifyAdminJwt(cookie)
  if (!payload) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.search = search ? `?from=${encodeURIComponent(pathname + search)}` : `?from=${encodeURIComponent(pathname)}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}