import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function DynamicStructuredData({
  pageData,
  type = 'page',
}: {
  pageData: any
  type?: 'page' | 'post'
}) {
  const config = await configPromise
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devlouix.com'
  const siteName = settings.siteName || 'Devlouix'

  // Build the specific URL
  const url =
    type === 'post'
      ? `${siteUrl}/posts/${pageData.slug}`
      : `${siteUrl}/${pageData.slug === 'home' ? '' : pageData.slug}`

  // Base Schema
  let jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': type === 'post' ? 'BlogPosting' : 'WebPage',
    name: pageData.metaTitle || pageData.title,
    description: pageData.metaDescription || pageData.excerpt || settings.defaultMetaDescription,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url:
          typeof settings.defaultOGImage === 'object'
            ? settings.defaultOGImage?.url
            : `${siteUrl}/logo.png`,
      },
    },
  }

  // Add Article-specific fields
  if (type === 'post') {
    jsonLd = {
      ...jsonLd,
      headline: pageData.title,
      image: typeof pageData.heroImage === 'object' ? pageData.heroImage?.url : '',
      datePublished: pageData.publishedDate,
      dateModified: pageData.updatedAt,
      author: {
        '@type': 'Person',
        name: typeof pageData.author === 'object' ? pageData.author?.name : 'Devlouix Team',
      },
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
