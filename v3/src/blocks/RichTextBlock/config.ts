import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richText', // The internal name we use to identify this block
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}