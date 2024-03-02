import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process?.env?.NEXTAUTH_SECRET
    // cookieName: 'next-auth.session-token'
  })

  // Redirect users with a token trying to access /login to the dashboard
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // redirect user without admin access to login
  // if (!token?.isAdmin) {
  //   return NextResponse.redirect("/login");
  // }

  return NextResponse.next()
}
