import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''
  
  // 1. NORMALIZE HOSTNAME (Strip www. if it exists)
  // This turns blog.www.devlouix.com -> blog.devlouix.com
  // and www.devlouix.com -> devlouix.com
  const cleanHost = hostname.replace(/^www\./, '')
  const isWww = hostname.startsWith('www.')

  // 2. REDIRECT TO CANONICAL (Force non-www for subdomains)
  if (isWww && cleanHost.includes('.')) {
    return NextResponse.redirect(new URL(`https://${cleanHost}${pathname}`, req.url), 301)
  }

  // 3. Skip Internals
  if (pathname.startsWith('/api') || pathname.startsWith('/102024-admin-pagoka') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const isBlogSubdomain = cleanHost.startsWith('blog.')
  const rootHostname = cleanHost.replace('blog.', '')

  // --- SCENARIO A: BLOG SUBDOMAIN (blog.devlouix.com) ---
  if (isBlogSubdomain) {
    // A1. URL Cleaning
    if (pathname.startsWith('/posts')) {
      const slug = pathname.replace('/posts', '') || '/'
      return NextResponse.redirect(new URL(`https://${cleanHost}${slug}`, req.url), 301)
    }

    // A2. Internal Rewrite
    const url = req.nextUrl.clone()
    url.pathname = `/posts${pathname === '/' ? '' : pathname}`
    // We rewrite using the cleanHost
    return NextResponse.rewrite(url)
  }

  // --- SCENARIO B: MAIN DOMAIN (devlouix.com) ---
  if (pathname.startsWith('/posts')) {
    const slug = pathname.replace('/posts', '') || '/'
    return NextResponse.redirect(new URL(`https://blog.${rootHostname}${slug}`, req.url), 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|102024-admin-pagoka|_next|favicon.ico|manifest.json).*)'],
}