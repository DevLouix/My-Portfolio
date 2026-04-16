import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const pathname = url.pathname

  // 1. DATABASE REDIRECT CHECK
  // Fetch from Payload (You can use a simple fetch here to hit your own API)
  try {
    const redirectReq = await fetch(`${url.origin}/api/redirects?where[from][equals]=${pathname}`)
    const redirectData = await redirectReq.json()

    if (redirectData.docs.length > 0) {
      const redirect = redirectData.docs[0]
      return NextResponse.redirect(
        new URL(redirect.to, req.url),
        redirect.type === '301' ? 301 : 302,
      )
    }
  } catch (e) {
    console.error('Redirect check failed', e)
  }

  // Get the hostname (e.g., 'domain.com', 'blog.domain.com', 'localhost:3000')
  const hostname = req.headers.get('host') || ''

  // 1. Check if it's the blog subdomain
  if (hostname.startsWith('blog.')) {
    // If they visit blog.domain.com/ (the root of the subdomain)
    if (url.pathname === '/') {
      // Rewrite to our blog archive page
      url.pathname = `/posts`
      return NextResponse.rewrite(url)
    }

    // If they visit blog.domain.com/my-article
    // Rewrite to /posts/my-article
    url.pathname = `/posts${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Otherwise, let the request continue normally for domain.com
  return NextResponse.next()
}

// 2. CRITICAL: Middleware configuration
// We MUST exclude Payload CMS routes, static files, and API routes from being rewritten!
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (Payload APIs)
     * - admin (Payload Admin Panel)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|102024-admin-pagoka|_next/static|_next/image|favicon.ico).*)',
  ],
}
