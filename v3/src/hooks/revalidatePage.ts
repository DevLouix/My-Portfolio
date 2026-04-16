import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  // If the page is published, tell Next.js to clear the cache for this URL
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
    console.log(`Revalidating path: ${path}`)
    revalidatePath(path)
  }
  return doc
}