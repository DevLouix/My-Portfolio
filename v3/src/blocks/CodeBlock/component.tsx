import React from 'react'

export const CodeBlockComponent = ({ code, language }: any) => {
  if (!code) return null

  return (
    <div className="my-8 max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="flex px-4 py-2 bg-gray-800 text-gray-400 text-xs uppercase font-bold">
        {language}
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}