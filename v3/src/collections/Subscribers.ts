import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt', 'active'],
  },
  access: {
    create: () => true, // Public can sign up
    read: isAdmin,      // Only admins see the list
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true, // Prevents the same email from signing up twice!
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck if the user unsubscribes.',
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'Newsletter Modal',
      admin: {
        readOnly: true,
      },
    },
  ],
}