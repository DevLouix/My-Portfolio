import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings', // Groups this nicely in the Admin Sidebar
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs', // Using tabs keeps the Admin UI clean!
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: 'Devlouix | Blog',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload a square .png, .svg, or .ico file for the browser tab.',
              },
            },
          ],
        },
        {
          label: 'Default SEO',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              required: true,
              admin: {
                description: 'Used if a page does not specify its own meta title.',
              },
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              required: true,
            },
            {
              name: 'defaultOGImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'The default image shown when links are shared on social media.',
              },
            },
          ],
        },
      ],
    },
  ],
}