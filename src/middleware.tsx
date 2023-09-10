import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useEffect } from 'react'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if(!request.cookies.get('token')){
      return NextResponse.redirect(new URL('/signin', request.url))
    }

  return NextResponse.next()
}
 

export const config = {
  matcher: ['/dashboard/:path*'],
}