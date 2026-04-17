import { RichText } from '@payloadcms/richtext-lexical/react'

export const RichTextBlockComponent = ({ content }: any) => {
  return (
    <div className="mx-auto max-w-none prose prose-blue prose-lg md:prose-xl 
      prose-headings:font-black prose-headings:tracking-tighter 
      prose-p:text-gray-700 prose-p:leading-relaxed
      prose-pre:bg-gray-900 prose-pre:rounded-2xl">
      <RichText data={content} />
    </div>
  )
}