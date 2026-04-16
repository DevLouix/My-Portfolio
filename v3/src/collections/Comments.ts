import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'comment',
    defaultColumns: ['post', 'name', 'isApproved', 'createdAt'],
    group: 'Content',
  },
  access: {
    // 1. Anyone can submit a comment
    create: () => true,
    // 2. Only Approved comments are public. Admins can see all.
    read: ({ req: { user } }) => {
      if (user?.roles?.includes('admin')) return true
      return { isApproved: { equals: true } }
    },
    // 3. Only Admins can moderate (approve/edit/delete)
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false, // Enterprise Standard: Manual moderation by default
      index: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'comments', // Self-reference for replies!
      admin: {
        position: 'sidebar',
      },
    },
  ],
}