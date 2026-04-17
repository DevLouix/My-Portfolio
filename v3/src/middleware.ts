import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DOMAIN_ROUTING_MAP } from './routing.config'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''
  const collectionPath = DOMAIN_ROUTING_MAP[hostname]
  
  // 2. Skip internals
  if (pathname.startsWith('/api') || pathname.startsWith('/102024-admin-pagoka') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  if (collectionPath) {
    // If user types blog.com/posts/slug, redirect to clean blog.com/slug
    if (pathname.startsWith(`/${collectionPath}`)) {
      return NextResponse.redirect(new URL(`https://${hostname}${pathname.replace(`/${collectionPath}`, '') || '/'}`, req.url), 301)
    }

    // Internal Rewrite: blog.com/slug -> /posts/slug
    const url = req.nextUrl.clone()
    url.pathname = `/${collectionPath}${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}