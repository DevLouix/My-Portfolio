import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: 'Quote',
    plural: 'Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        description: 'Who said this?',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'E.g., CEO of Enterprise Inc.',
      },
    },
  ],
}