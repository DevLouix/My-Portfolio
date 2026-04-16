'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IconSearch, IconX } from '@tabler/icons-react'

export function SearchExpand() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="flex items-center justify-end">
      {/* Mobile Absolute Container: Prevents layout push */}
      <div className={`
        flex items-center transition-all duration-300 ease-out
        ${isOpen 
          ? 'fixed inset-x-0 top-0 h-16 px-4 bg-white z-[110] md:relative md:inset-auto md:h-auto md:w-[240px] md:bg-slate-100 md:rounded-full md:px-3 md:py-1.5' 
          : 'w-10 h-10 justify-center'}
      `}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`text-slate-900 transition-colors ${isOpen ? 'mr-3' : 'hover:text-blue-600'}`}
          aria-label="Search"
        >
          <IconSearch size={24} stroke={2.5} className="md:w-5 md:h-5" />
        </button>

        <form onSubmit={handleSearch} className="flex-grow flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search content..."
            className={`
              bg-transparent outline-none text-base md:text-sm w-full font-medium
              ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}
            `}
          />
          {isOpen && (
            <button 
              type="button" 
              onClick={() => {setIsOpen(false); setQuery('')}}
              className="ml-2 p-1 hover:bg-slate-200 rounded-full transition-colors"
            >
              <IconX size={20} className="text-slate-500" />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}