import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useEffect } from 'react'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    if(pathname == '/dashboard/futsal'){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if(pathname == '/resetpassword'){
      return NextResponse.redirect(new URL('/', request.url))
    }
    if(!request.cookies.get('token')){
      return NextResponse.redirect(new URL('/signin', request.url))
    }

  return NextResponse.next()
}
 

export const config = {
  matcher: ['/dashboard/:path*', '/resetpassword'],
}