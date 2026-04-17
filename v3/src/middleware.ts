import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DOMAIN_ROUTING_MAP } from './routing.config'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''
  
  if (pathname.startsWith('/api') || pathname.startsWith('/102024-admin-pagoka') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // 1. FORCE REDIRECT: If anyone hits devlouix.com/posts/*
  // This cleans up search engine results and user mistakes.
  if (hostname === 'devlouix.com' && pathname.startsWith('/posts')) {
    const slug = pathname.replace('/posts', '') // Removes the "/posts" part
    const cleanSlug = slug === '' ? '/' : slug // Handles the case of just "/posts"
    
    return NextResponse.redirect(
      new URL(`https://blog.devlouix.com${cleanSlug}`, req.url), 
      301
    )
  }

  // 2. INTERNAL REWRITE: For the blog subdomain
  if (hostname.startsWith('blog.')) {
    const url = req.nextUrl.clone()
    // Server sees /posts/slug, User sees blog.com/slug
    url.pathname = `/posts${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}