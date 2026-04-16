import React from 'react'

export const QuoteBlockComponent = ({ quote, author, role }: any) => {
  return (
    <blockquote className="my-12 p-8 bg-gray-50 border-l-4 border-blue-600 rounded-r-lg max-w-4xl mx-auto">
      <p className="text-2xl italic text-gray-800 mb-4">"{quote}"</p>
      {author && (
        <footer className="text-gray-600 font-semibold">
          — {author} {role && <span className="font-normal text-gray-500">, {role}</span>}
        </footer>
      )}
    </blockquote>
  )
}