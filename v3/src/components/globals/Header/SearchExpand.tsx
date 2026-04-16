'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IconSearch, IconX } from '@tabler/icons-react'

export function SearchExpand() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <div className="flex items-center">
      <form 
        onSubmit={handleSearch}
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[200px] md:w-[300px] bg-gray-100 px-3 py-1.5 rounded-full' : 'w-10'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`text-gray-600 hover:text-blue-600 transition-colors ${isOpen ? 'mr-2' : ''}`}
        >
          <IconSearch size={22} stroke={2.5} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className={`bg-transparent outline-none text-sm w-full transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {isOpen && (
          <button type="button" onClick={() => {setIsOpen(false); setQuery('')}}>
            <IconX size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </form>
    </div>
  )
}