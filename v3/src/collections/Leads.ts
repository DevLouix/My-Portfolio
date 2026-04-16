import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'clientEmail',
    defaultColumns: ['clientEmail', 'requestCategory', 'createdAt'],
  },
  access: {
    // PUBLIC CAN CREATE (Submit the form)
    create: () => true,
    // ONLY ADMINS CAN READ, UPDATE, OR DELETE
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'requestCategory', type: 'text', required: true },
    { name: 'clientEmail', type: 'email', required: true },
    { name: 'messageSubject', type: 'text', required: true },
    { name: 'messageBody', type: 'textarea', required: true },
  ],
}