import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { post, name, email, comment, parentId } = body

     const config = await configPromise 
   const payload = await getPayload({ config })

    const newComment = await payload.create({
      collection: 'comments',
      data: {
        post,
        name,
        email,
        comment,
        parent: parentId || null,
        isApproved: false, // Force moderation
      },
    })

    return NextResponse.json({ success: true, message: 'Awaiting moderation' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}