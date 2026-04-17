'use client'

import React, { useState } from 'react'
import { IconCopy, IconCheck } from '@tabler/icons-react'

export const CodeBlockComponent = ({ code, language }: any) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    <div className="not-prose my-8 rounded-2xl overflow-hidden bg-[#0d1117] border border-gray-800 shadow-2xl group">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            {language || 'code'}
          </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200"
        >
          {copied ? (
            <div className="flex items-center gap-1.5 text-green-400">
              <span className="text-[10px] font-bold uppercase">Copied!</span>
              <IconCheck size={16} stroke={3} />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <span className="text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
              <IconCopy size={16} stroke={2} />
            </div>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="relative">
        <pre className="p-6 text-sm md:text-base text-gray-300 overflow-x-auto leading-relaxed font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}