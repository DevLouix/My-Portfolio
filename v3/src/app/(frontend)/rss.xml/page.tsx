import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET() {
   const config = await configPromise 
   const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedDate',
  })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devlouix.com'

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Devlouix Blog</title>
      <link>${baseUrl}</link>
      <description>Latest enterprise insights.</description>
      ${posts.docs.map(post => `
        <item>
          <title>${post.title}</title>
          <link>${baseUrl}/posts/${post.slug}</link>
          <description>${post.excerpt}</description>
          <pubDate>${new Date(post.publishedDate!).toUTCString()}</pubDate>
        </item>
      `).join('')}
    </channel>
  </rss>`

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  })
}