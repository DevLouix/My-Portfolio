'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { SearchExpand } from './SearchExpand'
import { CMSLink } from '../../ui/CMSLink'

export function HeaderClient({ logo, navItems, primaryCTA, domainSettings }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center gap-4">
        {/* Mobile: Hamburger Button */}
        <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
        </button>

        {/* Logo */}
        <Link href="/" className="relative h-8 w-32 md:w-40 flex-shrink-0">
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={logo.alt || 'Logo'}
              fill
              className="object-contain object-left"
            />
          ) : (
            <span className="text-xl font-black tracking-tight uppercase">Devlouix</span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems?.map((item: any, i: number) => (
            <CMSLink
              key={i}
              link={item.link}
              className="text-sm text-gray-600 hover:text-blue-600 font-bold transition-colors"
            />
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-grow justify-end">
          <SearchExpand />

          {/* The Primary CTA is now just another CMSLink styled as a button! */}
          {primaryCTA?.link && (
            <CMSLink
              link={primaryCTA.link}
              domainSettings={domainSettings}
              className="bg-gray-900 text-white text-[10px] md:text-xs font-black px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-blue-600 transition-all uppercase tracking-widest shadow-lg active:scale-95"
            />
          )}
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 top-[61px] bg-white z-50 lg:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-8 gap-6">
          {navItems?.map((item: any, i: number) => (
            <div key={i} onClick={() => setIsMenuOpen(false)}>
              <CMSLink
                link={item.link}
                className="text-2xl font-black text-gray-900 hover:text-blue-600 transition-colors block"
              />
            </div>
          ))}
          <div className="h-px bg-gray-100 w-full my-4" />
          <Link
            href="https://blog.devlouix.com"
            className="text-blue-600 font-black text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            Visit the Blog →
          </Link>
        </nav>
      </div>
    </header>
  )
}
