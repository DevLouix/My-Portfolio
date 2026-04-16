import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''
  const rootDomain = process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'yourdomain.com'

  // 1. Skip internals
  if (pathname.startsWith('/api') || pathname.startsWith('/102024-admin-pagoka') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const isBlogSubdomain = hostname.startsWith('blog.')

  // --- SCENARIO A: User is on the MAIN DOMAIN ---
  if (!isBlogSubdomain) {
    // If they try to go to yourdomain.com/posts/something
    if (pathname.startsWith('/posts')) {
      const newPath = pathname.replace('/posts', '')
      return NextResponse.redirect(new URL(`https://blog.${rootDomain}${newPath}`, req.url), 301)
    }
    return NextResponse.next()
  }

  // --- SCENARIO B: User is on the BLOG SUBDOMAIN ---
  if (isBlogSubdomain) {
    // 1. If they hit the root (blog.yourdomain.com/), show the blog feed internally
    if (pathname === '/' || pathname === '') {
      const url = req.nextUrl.clone()
      url.pathname = '/posts'
      return NextResponse.rewrite(url)
    }

    // 2. If it's a specific post (e.g. blog.yourdomain.com/my-post), show it internally
    // We assume any single-level path on the blog subdomain is a post slug
    if (!pathname.includes('/', 1)) {
      const url = req.nextUrl.clone()
      url.pathname = `/posts${pathname}`
      return NextResponse.rewrite(url)
    }

    // 3. PROFESSIONAL FALLBACK: If they try to access blog.yourdomain.com/about 
    // Redirect them to the main site: yourdomain.com/about
    return NextResponse.redirect(new URL(`https://text-domain.com${pathname}`, req.url), 301)
  }

  return NextResponse.next()
}