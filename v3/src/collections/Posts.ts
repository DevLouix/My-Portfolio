import type { CollectionConfig } from 'payload'
import { canReadPost, canMutatePost } from '../access/roles'
import { formatSlug } from '../utilities/formatSlug'
import { CTABlock } from '@/blocks/CTABlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { RichTextBlock } from '@/blocks/RichTextBlock/config'
import { QuoteBlock } from '@/blocks/QuoteBlock/config'
import { CodeBlock } from '@/blocks/CodeBlock/config'

// Import our Blocks!

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', '_status'],
  },
  // 1. Root level 'trash' enables soft deletes
  trash: true,
  versions: {
    drafts: true, // Enterprise feature: Enables Drafts and Publishing!
    // ENTERPRISE TIP: Limit the number of drafts saved per document.
    // This keeps your database lean. 50 is usually plenty.
    maxPerDoc: 50, 
  },
  access: {
    read: canReadPost,
    update: canMutatePost,
    delete: canMutatePost,
    // Anyone logged in (Admin, Editor, Author) can create a post
    create: ({ req: { user } }) => Boolean(user), 
  },
  hooks: {
    // Auto-assign the logged-in user as the author if it's not set
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create' && req.user && !data.author) {
          return { ...data, author: req.user.id }
        }
        return data
      },
    ],
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
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Leave blank to hide from the public front-end until you are ready.',
      },
    },
    {
      name: 'likes',
      type: 'number',
      defaultValue: 0,
      access: {
        update: () => false, // 🔒 DISABLE DIRECT API UPDATES
      },
      admin: {
        position: 'sidebar',
        readOnly: true, // Only the API should change this
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'A short summary used for blog cards and SEO meta descriptions.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true, // Every post should have a hero image
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content Layout',
          fields: [
            // THIS IS THE MAGIC: The Layout Builder
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                RichTextBlock,
                MediaBlock,
                QuoteBlock,
                CodeBlock,
                CTABlock,
              ],
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
                description: 'Overrides the post title for search engines. Keep under 60 characters.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: {
                description: 'Overrides the excerpt for search engines. Keep under 160 characters.',
              },
            },
          ],
        },
      ],
    },
  ],
}