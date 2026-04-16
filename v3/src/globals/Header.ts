import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/roles'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true, // Publicly readable for the front-end to render the nav
    update: isAdmin,  // Only admins can change the navigation
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6, // Enterprise standard: keep top nav clean
      fields: [link()]
    },
  ],
}