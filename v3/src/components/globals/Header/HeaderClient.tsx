'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { SearchExpand } from './SearchExpand'
import { CMSLink } from '../../ui/CMSLink'

export function HeaderClient({ logo, navItems, primaryCTA, domainSettings }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Robust check for data
  const hasNavItems = Array.isArray(navItems) && navItems.length > 0
  const hasCTA = !!(primaryCTA?.link?.label || primaryCTA?.link?.text)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-slate-100 h-16 md:h-20">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        
        {/* 1. LEFT: Mobile Toggle & Logo */}
        <div className="flex items-center gap-2">
          {hasNavItems && (
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <IconX size={28} stroke={2} /> : <IconMenu2 size={28} stroke={2} />}
            </button>
          )}

          <Link href="/" className="relative h-8 w-28 md:w-36 flex-shrink-0">
            {logo?.url ? (
              <Image 
                src={logo.url} 
                alt={logo.alt || 'Logo'} 
                fill 
                className="object-contain object-left" 
                priority 
              />
            ) : (
              <span className="text-xl font-black uppercase tracking-tighter text-slate-900">Devlouix</span>
            )}
          </Link>
        </div>

        {/* 2. CENTER: Desktop Nav items (Hidden on Mobile) */}
        {hasNavItems && (
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-10">
            {navItems.map((item: any, i: number) => (
              <CMSLink
                key={i}
                link={item.link}
                className="text-xs xl:text-[13px] font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest"
              />
            ))}
          </nav>
        )}

        {/* 3. RIGHT: Search & CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <SearchExpand />

          {hasCTA && (
            <div className="hidden md:block">
              <CMSLink
                link={primaryCTA.link}
                domainSettings={domainSettings}
                className="bg-slate-900 text-white text-[10px] xl:text-xs font-bold px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all uppercase tracking-[0.15em] shadow-sm active:scale-95 whitespace-nowrap"
              />
            </div>
          )}
        </div>
      </div>

      {/* MOBILE NAV OVERLAY (Appears on click) */}
      <div
        className={`fixed inset-0 top-[64px] bg-white z-[90] lg:hidden transition-all duration-300 transform ${
          isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
          {hasNavItems && navItems.map((item: any, i: number) => (
            <div key={i} onClick={() => setIsMenuOpen(false)} className="border-b border-slate-50 pb-4">
              <CMSLink
                link={item.link}
                className="text-2xl font-extrabold text-slate-900"
              />
            </div>
          ))}

          {/* Visit Blog link or similar - Optional */}
          <Link 
            href="/blog" 
            className="text-blue-600 font-bold text-lg pt-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Read Our Blog →
          </Link>
          
          {/* Mobile CTA at the bottom */}
          {hasCTA && (
            <div className="mt-auto pb-12" onClick={() => setIsMenuOpen(false)}>
               <CMSLink
                link={primaryCTA.link}
                domainSettings={domainSettings}
                className="w-full block text-center bg-slate-900 text-white py-4 rounded-xl font-bold text-lg uppercase tracking-widest"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}