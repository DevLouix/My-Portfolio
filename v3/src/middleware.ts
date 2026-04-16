import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''

  const rootDomain =
    process.env.NEXT_PUBLIC_SITE_URL
      ?.replace(/^https?:\/\//, '')
      .replace(/\/$/, '') || 'devlouix.com'

  const isPublicFile = pathname.includes('.')

  // Skip internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/102024-admin-pagoka') ||
    isPublicFile
  ) {
    return NextResponse.next()
  }

  const cleanHost = hostname.split(':')[0]
  const isBlogSubdomain = cleanHost.startsWith('blog.')

  // MAIN DOMAIN
  if (!isBlogSubdomain) {
    if (pathname.startsWith('/posts')) {
      const newPath = pathname.replace('/posts', '')
      return NextResponse.redirect(
        new URL(`https://blog.${rootDomain}${newPath}`, req.url),
        308
      )
    }
    return NextResponse.next()
  }

  // BLOG SUBDOMAIN
  if (isBlogSubdomain) {
    if (pathname === '/' || pathname === '') {
      const url = req.nextUrl.clone()
      url.pathname = '/posts'
      return NextResponse.rewrite(url)
    }

    const isSingleSlug = /^\/[^/]+$/.test(pathname)

    if (isSingleSlug) {
      const url = req.nextUrl.clone()
      url.pathname = `/posts${pathname}`
      return NextResponse.rewrite(url)
    }

    return NextResponse.redirect(
      new URL(`https://${rootDomain}${pathname}`, req.url),
      308
    )
  }

  return NextResponse.next()
}