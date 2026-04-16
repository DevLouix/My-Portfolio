// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // 1. 🛡️ STOPS THE LOOP: Immediately skip if it's an API, Admin, or Static file
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/102024-admin-pagoka') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.') // Skips favicon.ico, .jpg, .png, etc.
  ) {
    return NextResponse.next()
  }

  // 2. REDIRECT CHECK (Only for actual pages)
  try {
    // Only check redirects for main page requests
    const redirectReq = await fetch(`${req.nextUrl.origin}/api/redirects?where[from][equals]=${pathname}`)
    const redirectData = await redirectReq.json()

    if (redirectData?.docs?.[0]) {
      const redirect = redirectData.docs[0]
      return NextResponse.redirect(new URL(redirect.to, req.url), redirect.type === '301' ? 301 : 302)
    }
  } catch (e) {
    // Fail silently to prevent site crash if API is down
  }

  // 3. BLOG SUBDOMAIN LOGIC
  if (hostname.startsWith('blog.')) {
    const url = req.nextUrl.clone()
    url.pathname = pathname === '/' ? `/posts` : `/posts${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// 4. THE MATCHER (The first line of defense)
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (Payload API)
     * 2. /my-secret-hq (Admin)
     * 3. /_next (Next.js internals)
     * 4. /favicon.ico, /manifest.json (Static files)
     */
    '/((?!api|my-secret-hq|_next|favicon.ico|manifest.json).*)',
  ],
}