import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Clone the NextUrl object. Mutating this preserves query parameters automatically.
  const url = req.nextUrl.clone()
  const { pathname } = url
  
  // 1. NORMALIZE HOSTNAME & ENVIRONMENT
  const hostname = req.headers.get('host') || ''
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
  const protocol = isLocalhost ? 'http' : 'https'
  
  const cleanHost = hostname.replace(/^www\./, '')
  const isWww = hostname.startsWith('www.')

  // 2. REDIRECT TO CANONICAL (Force non-www)
  if (isWww) {
    url.hostname = cleanHost
    return NextResponse.redirect(url, 308) 
  }

  // 3. SKIP INTERNALS
  // Defensive check, though the config matcher catches most of these
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/102024-admin-pagoka') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 4. SUBDOMAIN LOGIC
  const isBlogSubdomain = cleanHost.startsWith('blog.')
  const rootHostname = cleanHost.replace(/^blog\./, '') // Anchor to start

  // --- SCENARIO A: BLOG SUBDOMAIN (blog.devlouix.com) ---
  if (isBlogSubdomain) {
    // A1. URL Cleaning: Prevent public access to /posts/... on the subdomain
    if (pathname.startsWith('/posts')) {
      const slug = pathname.replace(/^\/posts/, '') || '/'
      url.pathname = slug
      return NextResponse.redirect(url, 308)
    }

    // A2. Internal Rewrite: Map to the Next.js /posts directory
    url.pathname = `/posts${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // --- SCENARIO B: MAIN DOMAIN (devlouix.com) ---
  // Redirect main domain blog accesses to the subdomain
  if (pathname.startsWith('/posts')) {
    const slug = pathname.replace(/^\/posts/, '') || '/'
    
    // Construct absolute URL for the cross-domain redirect
    const redirectUrl = new URL(`${protocol}://blog.${rootHostname}${slug}`)
    // Copy over any query parameters from the original request
    url.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.append(key, value)
    })
    
    return NextResponse.redirect(redirectUrl, 308)
  }

  return NextResponse.next()
}

// 5. MATCHER CONFIGURATION
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, manifest.json (standard static files)
     * - my-secret-hq (your custom ignored path)
     * - paths containing a dot (e.g., .png, .css)
     */
    '/((?!api|_next/static|_next/image|102024-admin-pagoka|favicon.ico|manifest.json|.*\\..*).*)',
  ],
}