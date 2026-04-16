import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@/payload.config'

import { Header } from '@/components/globals/Header/Index'
import { Footer } from '@/components/globals/Footer'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { DynamicStructuredData } from '@/components/seo/StructuredData'

export default async function HomePage() {
   const config = await configPromise 
   const payload = await getPayload({ config })

  // Query the database for the dynamic "home" page
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })

  const page = result.docs[0]

  // ==========================================
  // ENTERPRISE LOGIC: IF "HOME" PAGE EXISTS IN DB
  // ==========================================
  if (page) {
    return (
      <>
        <DynamicStructuredData pageData={page}/>
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

  // ==========================================
  // FALLBACK LOGIC: IF NO PAGE EXISTS YET
  // ==========================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-300 tracking-widest uppercase">
        Blank
      </h1>
    </div>
  )
}