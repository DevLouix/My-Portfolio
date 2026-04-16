import React from 'react'
import { CodeBlockComponent } from './CodeBlock/component'
import { CTABlockComponent } from './CTABlock/components'
import { MediaBlockComponent } from './MediaBlock/component'
import { QuoteBlockComponent } from './QuoteBlock/component'
import { RichTextBlockComponent } from './RichTextBlock/component'
import { AboutMeBlockComponent } from './AboutMeBlock/Component'

// Map the Payload slug to the React Component
const blockComponents = {
  richText: RichTextBlockComponent,
  mediaBlock: MediaBlockComponent,
  quote: QuoteBlockComponent,
  code: CodeBlockComponent,
  cta: CTABlockComponent,
  aboutMe: AboutMeBlockComponent
}

export const RenderBlocks = ({ layout }: { layout: any[] }) => {
  if (!layout || layout.length === 0) return null

  return (
    <div className="flex flex-col gap-8 w-full">
      {layout.map((block, index) => {
        // Find the matching React component based on the blockType
        const Block = blockComponents[block.blockType as keyof typeof blockComponents]

        // If the component exists, render it and pass all the Payload data as props
        if (Block) {
          return <Block key={index} {...block} />
        }

        // If we forgot to create a React component for a block, show a warning in dev
        return (
          <div key={index} className="p-4 bg-red-100 text-red-600 border border-red-300">
            Unknown block type: {block.blockType}
          </div>
        )
      })}
    </div>
  )
}