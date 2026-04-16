import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { formatSlug } from '../utilities/formatSlug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'parent'],
  },
  access: {
    read: () => true, // Publicly readable for the front-end
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
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
      index: true, // Speeds up database queries when routing on the front-end
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title, but can be manually overridden.',
      },
      hooks: {
        beforeValidate: [formatSlug('title')], // Auto-formats the slug based on the title
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories', // Self-referencing relationship for sub-categories
      admin: {
        position: 'sidebar',
        description: 'Select a parent category if this is a sub-category.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Used for category archive pages and SEO meta descriptions.',
      },
    },
  ],
}