import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { CMSLink } from '../ui/CMSLink'
import { SearchField } from '../SearchField' // 1. Import Search

export async function Header() {
   const config = await configPromise 
   const payload = await getPayload({ config })
  const headerData = await payload.findGlobal({ slug: 'header', depth: 2 })

  if (!headerData) return null
  const logo = typeof headerData.logo === 'object' ? headerData.logo : null

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center gap-4">
        
        {/* Logo */}
        <Link href="/" className="relative h-8 w-32 md:w-40 flex-shrink-0">
          {logo?.url ? (
            <Image src={logo.url} alt={logo.alt || 'Logo'} fill className="object-contain object-left" />
          ) : (
            <span className="text-xl font-black tracking-tight">DEVLOUIX</span>
          )}
        </Link>

        {/* Navigation - Hidden on small screens to make room for search */}
        <nav className="hidden lg:flex space-x-6">
          {headerData.navItems?.map((item: any, i: number) => (
            <CMSLink 
              key={i} 
              link={item.link} 
              className="text-sm text-gray-600 hover:text-blue-600 font-bold transition-colors" 
            />
          ))}
        </nav>

        {/* 2. ADD THE SEARCH FIELD HERE */}
        <div className="flex items-center gap-4 flex-grow justify-end">
          <SearchField />
          
          {/* Optional: Add a CTA Button next to search */}
          <Link 
            href="/posts" 
            className="hidden md:block bg-gray-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-blue-600 transition-colors"
          >
            All Posts
          </Link>
        </div>

      </div>
    </header>
  )
}