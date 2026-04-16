import type { CollectionConfig } from 'payload'
import { formatSlug } from '../utilities/formatSlug'
import { CTABlock } from '@/blocks/CTABlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { QuoteBlock } from '@/blocks/QuoteBlock/config'
import { RichTextBlock } from '@/blocks/RichTextBlock/config'
import { CodeBlock } from '@/blocks/CodeBlock/config'
import { AboutMeBlock } from '@/blocks/AboutMeBlock/config'
import { revalidatePage } from '@/hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      return `${baseUrl}/${doc.slug === 'home' ? '' : doc.slug}?preview=true`
    },
  },
  versions: {
    drafts: true, // Enterprise feature: Draft pages before publishing
  },
  access: {
    // Public can read published pages. Logged-in users can read drafts.
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    // Only admins and editors can create/edit pages (Authors stick to Posts)
    create: ({ req: { user } }) =>
      Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor')),
    update: ({ req: { user } }) =>
      Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor')),
    delete: ({ req: { user } }) =>
      Boolean(user?.roles?.includes('admin') || user?.roles?.includes('editor')),
  },
  hooks:{
    afterChange: [revalidatePage]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Used for the URL (e.g., "about" makes the URL /about). Use "home" for the homepage.',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Layout',
          fields: [
            // The exact same Layout Builder!
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [RichTextBlock, MediaBlock, QuoteBlock, CodeBlock, CTABlock, AboutMeBlock],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: {
                description: 'Format: Page Title | Enterprise Blog',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Social Share Image',
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'hideHeader',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'Hide the global navigation bar on this page (useful for landing pages).',
              },
            },
            {
              name: 'hideFooter',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
