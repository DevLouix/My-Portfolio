import React from 'react'
import './global.css'
import { ModalProvider } from '@/providers/ModalProvider'
import { GlobalModalManager } from '@/components/modals/GlobalModalManager'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Metadata } from 'next'
import { CustomAnalyticsTracker } from '@/components/globals/CustomAnalyticTracker'

// ==========================================
// DYNAMIC GLOBAL METADATA (Fetched from Payload!)
// ==========================================
export async function generateMetadata(): Promise<Metadata> {
   const config = await configPromise 
   const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })

  const ogImage =
    typeof siteSettings.defaultOGImage === 'object' && siteSettings.defaultOGImage?.url
      ? siteSettings.defaultOGImage.url
      : ''

  // Extract the Favicon securely
  const faviconUrl =
    typeof siteSettings.favicon === 'object' && siteSettings.favicon?.url
      ? siteSettings.favicon.url
      : '/favicon.ico'

  return {
    title: {
      template: `%s | ${siteSettings.siteName}`,
      default: siteSettings.defaultMetaTitle || siteSettings.siteName,
    },
    description: siteSettings.defaultMetaDescription || 'Devlouix the world best developer',
    // INJECT FAVICON HERE:
    icons: [{ rel: 'icon', url: faviconUrl }],
    openGraph: {
      title: siteSettings.defaultMetaTitle,
      description: siteSettings.defaultMetaDescription,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  }
}

// ==========================================
// ROOT LAYOUT COMPONENT
// ==========================================
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <CustomAnalyticsTracker/>
        <ModalProvider>
          <main>{children}</main>

          {/* Use the Manager so ALL modals (Contact, Newsletter) work globally! */}
          <GlobalModalManager />
        </ModalProvider>
      </body>
    </html>
  )
}
