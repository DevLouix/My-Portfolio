import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'

export async function Footer() {
   const config = await configPromise 
   const payload = await getPayload({ config })
  const footerData = await payload.findGlobal({ slug: 'footer' })

  if (!footerData) return null

  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 mb-4 md:mb-0">
          {footerData.copyright || '© 2025 Devlouix.'}
        </p>

        <div className="flex space-x-6">
          {footerData.socialLinks?.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              target="_blank"
              className="text-gray-400 hover:text-white transition"
            >
              {link.platform}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}