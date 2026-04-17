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
              defaultValue: 'Devlouix',
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
              defaultValue: 'Dev Louix',
              admin: {
                description: 'Used if a page does not specify its own meta title.',
              },
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              required: true,
              defaultValue: `A Creative Technologist specializing in full-stack software development, 3D modeling, animation, and game development. With a passion for blending technology and creativity, I build engaging web apps, immersive games, and stunning 3D visuals.Driven by balance and innovation, I strive to create seamless digital experiences that captivate users and solve real-world problems.`,
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
        {
          label: 'Domain Registry',
          fields: [
            {
              name: 'domainMappings',
              type: 'array',
              admin: {
                description: 'Map each collection to its own domain or subdomain.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'collectionSlug',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Pages (Site Root)', value: 'pages' },
                        { label: 'Posts (Blog)', value: 'posts' },
                        // If you add a 'Portfolio' collection later, just add it here!
                      ],
                      admin: { width: '40%' },
                    },
                    {
                      name: 'domain',
                      type: 'text',
                      required: true,
                      admin: { width: '60%', placeholder: 'https://blog.devlouix.com' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
