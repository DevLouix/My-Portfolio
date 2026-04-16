import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const config = await configPromise 
   const payload = await getPayload({ config })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devlouix.com'

  // Fetch Published Pages
  const pagesResult = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    limit: 100,
  })

  // Fetch Published Posts
  const postsResult = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    limit: 1000,
  })

  const pages = pagesResult.docs.map((page) => ({
    url: page.slug === 'home' ? baseUrl : `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: page.slug === 'home' ? 1.0 : 0.8,
  }))

  const posts = postsResult.docs.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...pages, ...posts]
}