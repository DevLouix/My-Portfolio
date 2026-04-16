import React from 'react'
import Image from 'next/image'

export const MediaBlockComponent = ({ media, size, caption }: any) => {
  if (!media || typeof media === 'string') return null

  // Enterprise UI: Map the Payload dropdown selection to actual CSS widths
  const sizeClasses = {
    normal: 'max-w-3xl mx-auto',
    wide: 'max-w-5xl mx-auto',
    full: 'max-w-full w-full',
  }

  return (
    <figure className={`my-8 ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.normal}`}>
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Image 
          src={media.url} 
          alt={media.alt || 'Blog image'} 
          fill
          className="object-cover"
        />
      </div>
      {(caption || media.caption) && (
        <figcaption className="text-center text-gray-500 text-sm mt-2">
          {caption || media.caption}
        </figcaption>
      )}
    </figure>
  )
}