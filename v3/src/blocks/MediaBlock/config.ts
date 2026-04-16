import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Media',
    plural: 'Media Blocks',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'size',
      type: 'radio',
      defaultValue: 'normal',
      options: [
        { label: 'Normal (Content Width)', value: 'normal' },
        { label: 'Wide (Bleeds out of content)', value: 'wide' },
        { label: 'Full Width (Edge to edge)', value: 'full' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Overrides the default media caption if provided.',
      },
    },
  ],
}