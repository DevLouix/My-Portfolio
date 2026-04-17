import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''
  
  // 1. DYNAMIC DOMAIN DETECTION
  // Works on localhost, Vercel Previews, and Production
  const isBlogSubdomain = hostname.startsWith('blog.')
  const rootHostname = hostname.replace('blog.', '') // e.g., devlouix.com

  // 2. ABSOLUTE EXCLUSIONS (Ignore these immediately)
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/102024-admin-pagoka') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.') || // Matches favicon.ico, images, etc.
    pathname.startsWith('/media') // If using local media
  ) {
    return NextResponse.next()
  }

  // --- SCENARIO A: BLOG SUBDOMAIN (blog.devlouix.com) ---
  if (isBlogSubdomain) {
    // A1. Clean URL: If user types blog.com/posts/my-post -> Redirect to blog.com/my-post
    if (pathname.startsWith('/posts')) {
      const slug = pathname.replace('/posts', '') || '/'
      return NextResponse.redirect(new URL(`https://${hostname}${slug}`, req.url), 301)
    }

    // A2. Internal Rewrite: blog.com/ -> /posts (The blog feed)
    if (pathname === '/' || pathname === '') {
      const url = req.nextUrl.clone()
      url.pathname = '/posts'
      return NextResponse.rewrite(url)
    }

    // A3. Internal Rewrite: blog.com/my-post -> /posts/my-post
    const url = req.nextUrl.clone()
    url.pathname = `/posts${pathname}`
    return NextResponse.rewrite(url)
  }

  // --- SCENARIO B: MAIN DOMAIN (devlouix.com) ---
  // If we are here, isBlogSubdomain is FALSE
  
  // B1. Redirect Post paths to the Blog subdomain
  if (pathname.startsWith('/posts')) {
    const slug = pathname.replace('/posts', '') || '/'
    return NextResponse.redirect(new URL(`https://blog.${rootHostname}${slug}`, req.url), 301)
  }

  // B2. Everything else on the root domain (/, /about, etc.) works normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|102024-admin-pagoka|_next|favicon.ico|manifest.json).*)',
  ],
}