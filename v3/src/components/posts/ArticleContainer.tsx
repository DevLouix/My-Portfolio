import React from 'react'

export function ArticleContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl 
      prose prose-blue prose-lg md:prose-xl 
      prose-headings:font-black prose-headings:tracking-tighter 
      prose-p:text-gray-700 prose-p:leading-relaxed
      prose-img:rounded-3xl
      
      /* This ensures that non-text blocks (like CTAs) don't get messed up by prose */
      [&_.not-prose]:not-prose
      
      /* This handles the vertical spacing between elements in an article */
      [&>*]:my-8 first:[&>*]:mt-0 last:[&>*]:mb-0">
      {children}
    </div>
  )
}