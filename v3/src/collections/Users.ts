import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf, isAdminFieldLevel } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // This tells Payload to use this collection for logging in
  admin: {
    useAsTitle: 'name', // Show the user's name in the admin panel instead of ID
    defaultColumns: ['name', 'email', 'roles'],
  },
  // --- Access Control ---
  access: {
    // Admins can create users. (Payload automatically allows the very first user to be created)
    create: isAdmin,
    // Anyone can read users (needed to display Author names on the front-end)
    read: () => true,
    // Only Admins or the user themselves can edit their profile
    update: isAdminOrSelf,
    // Only Admins or the user themselves can delete their account
    delete: isAdminOrSelf,
  },
  // ----------------------
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true, // A user can have multiple roles
      required: true,
      defaultValue: ['author'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
      ],
      access: {
        // Only Admins can create or update a user's role. 
        // This prevents an Author from maliciously upgrading themselves to Admin!
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media', // We will create this collection in Step 3!
      required: false,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
    },
    {
      name: 'twitterHandle',
      type: 'text',
      admin: {
        description: 'Do not include the @ symbol.',
      },
    },
  ],
}