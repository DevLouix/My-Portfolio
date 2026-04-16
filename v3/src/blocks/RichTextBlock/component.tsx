import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const RichTextBlockComponent = ({ content }: { content: any }) => {
  if (!content) return null

  return (
    <div className="prose prose-lg max-w-none mx-auto my-8">
      {/* Payload's official component handles all the complex Lexical JSON mapping automatically! */}
      <RichText data={content} />
    </div>
  )
}