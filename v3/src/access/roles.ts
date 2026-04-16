import type { Access, FieldAccess, Where } from 'payload'
import type { User } from '../payload-types'

// Check if user has the Admin role
export const isAdmin: Access<User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}

// Check if user is Admin OR is the user themselves
export const isAdminOrSelf: Access<User> = ({ req: { user }, id }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true

  // If the requested ID matches the logged-in user's ID
  return user.id === id
}

// Field-level access: Only Admins can modify this specific field
export const isAdminFieldLevel: FieldAccess<User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}

// Check if user is Admin OR Editor
export const isAdminOrEditor: Access<User> = ({ req: { user } }) => {
  if (!user) return false
  return Boolean(user.roles?.includes('admin') || user.roles?.includes('editor'))
}

// Public can read published posts. 
// Admins/Editors can read everything. 
// Authors can read published posts + their own drafts.
export const canReadPost: Access = ({ req: { user } }) => {
  if (user?.roles?.includes('admin') || user?.roles?.includes('editor')) {
    return true
  }

  if (user?.roles?.includes('author')) {
    // 2. Cast as Where
    return {
      or: [
        { _status: { equals: 'published' } },
        { author: { equals: user.id } },
      ],
    } as Where 
  }

  // 2. Cast as Where
  return {
    _status: { equals: 'published' },
  } as Where
}

// Fixed: Admins/Editors mutate anything. Authors mutate own.
export const canMutatePost: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.roles?.includes('admin') || user.roles?.includes('editor')) {
    return true
  }

  // 2. Cast as Where
  return {
    author: { equals: user.id },
  } as Where
}