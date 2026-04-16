import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
   const config = await configPromise 
   const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  
  const faviconUrl = typeof siteSettings.favicon === 'object' && siteSettings.favicon?.url ? siteSettings.favicon.url : '/favicon.ico'

  return {
    name: siteSettings.siteName,
    short_name: siteSettings.siteName,
    description: siteSettings.defaultMetaDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: faviconUrl,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: faviconUrl,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}