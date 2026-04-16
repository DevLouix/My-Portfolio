import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Header } from '@/components/globals/Header'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Footer } from '@/components/globals/Footer'
import { DynamicStructuredData } from '@/components/seo/StructuredData'

// --- 1. DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayload({ config: await configPromise })
  const { slug } = await params

  // Fetch this specific page
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
  const page = result.docs[0]

  // Fetch Global Site Settings (for defaults)
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })

  if (!page) return {}

  const ogImage =
    typeof page.ogImage === 'object'
      ? page.ogImage?.url
      : typeof siteSettings.defaultOGImage === 'object'
        ? siteSettings.defaultOGImage?.url
        : ''

  return {
    title: page.metaTitle || `${page.title} | ${siteSettings.siteName}`,
    description: page.metaDescription || siteSettings.defaultMetaDescription,
    openGraph: {
      images: ogImage ? [{ url: ogImage }] : [],
    },
  }
}

// --- 2. PAGE COMPONENT ---

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const config = await configPromise
  const payload = await getPayload({ config })

  // 1. Await both params and searchParams (Required in Next.js 15)
  const { slug } = await params
  const { preview } = await searchParams

  const result = await payload.find({
    collection: 'pages',
    // 2. Use the preview flag to enable Draft mode
    draft: preview === 'true',
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  const page = result.docs[0]
  if (!page) return notFound()

  return (
    <>
      <DynamicStructuredData pageData={page} />
      {/* 3. CONDITIONAL HEADER */}
      {!page.hideHeader && <Header />}

      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <RenderBlocks layout={page.layout} />
        </div>
      </main>

      {/* 4. CONDITIONAL FOOTER */}
      {!page.hideFooter && <Footer />}
    </>
  )
}
