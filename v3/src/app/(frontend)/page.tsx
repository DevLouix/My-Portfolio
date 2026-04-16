// src/app/page.tsx
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { Footer } from '@/components/globals/Footer'
import { Header } from '@/components/globals/Header/Index'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { DynamicStructuredData } from '@/components/seo/StructuredData'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const payload = await getPayload({ config: configPromise })

  // 1. Await the search params
  const { preview } = await searchParams

  // 2. Fetch the "home" page
  const result = await payload.find({
    collection: 'pages',
    // 3. THIS IS THE FIX: Tell Payload to include Drafts if preview is true
    draft: preview === 'true',
    where: {
      slug: { equals: 'home' },
    },
  })

  const page = result.docs[0]

  if (page) {
    return (
      <>
        <DynamicStructuredData pageData={page} />
        {!page.hideHeader && <Header />}
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <RenderBlocks layout={page.layout} />
          </div>
        </main>
        {!page.hideFooter && <Footer />}
      </>
    )
  }

  // Fallback if no page exists at all
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-300 tracking-widest uppercase">Blank</h1>
    </div>
  )
}
