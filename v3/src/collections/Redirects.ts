import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      label: 'Old URL (From)',
      admin: {
        placeholder: '/old-blog-post-url',
      },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      label: 'New URL (To)',
      admin: {
        placeholder: '/posts/new-optimized-url',
      },
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: '301',
      options: [
        { label: '301 (Permanent - Best for SEO)', value: '301' },
        { label: '302 (Temporary)', value: '302' },
      ],
    },
  ],
}