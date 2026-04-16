// src/app/rss.xml/route.ts
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

/**
 * Prevents breaking CDATA sections
 */
function safeCDATA(str: string = '') {
  return str.replace(/]]>/g, ']]]]><![CDATA[>')
}

/**
 * Basic XML escape fallback (for non-CDATA fields)
 */
function escapeXML(str: string = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      _status: { equals: 'published' },
    },
    sort: '-publishedDate',
    limit: 20,
  })

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://devlouix.com'

  const now = new Date().toUTCString()

  const items = posts.docs
    .map((post: any) => {
      const url = `${baseUrl}/posts/${post.slug}`
      const pubDate = new Date(
        post.publishedDate || post.createdAt
      ).toUTCString()

      return `
        <item>
          <title><![CDATA[${safeCDATA(post.title)}]]></title>
          <link>${escapeXML(url)}</link>
          <guid isPermaLink="false">${post.id}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${safeCDATA(post.excerpt || '')}]]></description>

          ${
            post.author?.email
              ? `<author>${escapeXML(post.author.email)}</author>`
              : ''
          }

          ${
            post.category?.name
              ? `<category>${escapeXML(post.category.name)}</category>`
              : ''
          }

          ${
            post.featuredImage?.url
              ? `<enclosure url="${escapeXML(
                  post.featuredImage.url
                )}" type="image/jpeg" />`
              : ''
          }
        </item>
      `
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <channel>
    <title><![CDATA[Devlouix Blog]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[Latest insights from the Devlouix Blog]]></description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>

    <atom:link
      href="${baseUrl}/rss.xml"
      rel="self"
      type="application/rss+xml"
    />

    ${items}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      // Better CDN behavior
      'Cache-Control':
        'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}