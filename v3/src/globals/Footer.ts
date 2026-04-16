import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      admin: {
        description: 'E.g., © 2025 Enterprise Inc. All rights reserved.',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['Twitter', 'LinkedIn', 'GitHub', 'YouTube'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}