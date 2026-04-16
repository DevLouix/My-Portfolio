import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import crypto from 'crypto'

type DeviceType = 'unknown' | 'desktop' | 'mobile' | 'tablet' | null | undefined

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { pathname, referrer } = body

    // 1. Get User Agent & Determine Device
    const userAgent = req.headers.get('user-agent') || ''
    let deviceType: DeviceType = 'desktop'
    if (/mobile/i.test(userAgent)) deviceType = 'mobile'
    else if (/tablet|ipad/i.test(userAgent)) deviceType = 'tablet'

    // 2. Privacy-First Unique Visitor Hashing
    // We combine the IP, User Agent, and Today's Date.
    // This creates a unique ID for the user that automatically expires at midnight!
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const today = new Date().toISOString().split('T')[0] // '2025-01-20'

    const sessionString = `${ip}-${userAgent}-${today}`
    const sessionHash = crypto.createHash('sha256').update(sessionString).digest('hex')

    // 3. Save to Payload Database
     const config = await configPromise 
   const payload = await getPayload({ config })
    await payload.create({
      collection: 'analytics',
      data: {
        pathname: pathname || '/',
        referrer: referrer || 'Direct',
        deviceType,
        sessionHash,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Analytics Error:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
