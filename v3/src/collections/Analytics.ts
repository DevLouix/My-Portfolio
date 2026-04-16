import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Analytics: CollectionConfig = {
  slug: 'analytics',
  admin: {
    useAsTitle: 'pathname',
    defaultColumns: ['pathname', 'createdAt', 'referrer', 'deviceType'],
    description: 'Read-only log of website traffic.',
  },
  access: {
    create: () => false, // Only our internal API route can create these
    read: isAdmin,
    update: () => false, // No editing analytics data!
    delete: isAdmin,     // Admins can clear old data
  },
  fields: [
    {
      name: 'pathname',
      type: 'text',
      index: true, // Speeds up DB queries when charting page views
      admin: { readOnly: true },
    },
    {
      name: 'referrer',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'deviceType',
      type: 'select',
      options: ['desktop', 'mobile', 'tablet', 'unknown'],
      admin: { readOnly: true },
    },
    {
      name: 'sessionHash',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        description: 'An anonymous hash used to calculate unique daily visitors without storing IP addresses.',
      },
    },
  ],
}