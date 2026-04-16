import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { id, action } = await req.json() // action: 'like' or 'unlike'
     const config = await configPromise 
   const payload = await getPayload({ config })

    // 1. Basic Rate Limiting / Anti-Spam (Session Based)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const sessionHash = crypto.createHash('sha256').update(`${ip}-${id}`).digest('hex')

    // 2. Fetch current post
    const post = await payload.findByID({ collection: 'posts', id })
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    // 3. Calculate new like count
    const currentLikes = post.likes || 0
    const newLikes = action === 'like' ? currentLikes + 1 : Math.max(0, currentLikes - 1)

    // 4. Update Database
    await payload.update({
      collection: 'posts',
      id,
      data: { likes: newLikes },
    })

    return NextResponse.json({ likes: newLikes })
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}