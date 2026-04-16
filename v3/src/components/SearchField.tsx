'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconSearch } from '@tabler/icons-react'

export function SearchField() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Encode the query to handle spaces and special characters
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative group w-full max-w-[200px] md:max-w-[300px]">
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent border-2 rounded-full text-sm focus:bg-white focus:border-blue-600 focus:ring-0 outline-none transition-all duration-300"
      />
      <button 
        type="submit" 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
      >
        <IconSearch size={18} stroke={2.5} />
      </button>
    </form>
  )
}