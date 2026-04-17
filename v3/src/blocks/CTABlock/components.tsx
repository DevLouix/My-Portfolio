import React from 'react'
import Link from 'next/link'
import { CMSLink } from '@/components/ui/CMSLink'

export const CTABlockComponent = ({ headline, subheadline, link }: any) => {
  return (
    <div className="not-prose my-12 p-12 bg-blue-600 text-white text-center rounded-2xl max-w-4xl mx-auto shadow-xl">
      <h2 className="text-3xl font-bold mb-4">{headline}</h2>
      {subheadline && <p className="text-blue-100 mb-8 text-lg">{subheadline}</p>}
      {/* 2. Use our smart component! */}
      {link && (
        <CMSLink 
          link={link} 
          className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition" 
        />
      )}
    </div>
  )
}