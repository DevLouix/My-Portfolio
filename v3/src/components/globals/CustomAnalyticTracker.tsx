'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function CustomAnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const trackPageView = async () => {
      // Don't track admin panel visits or API routes
      if (pathname.startsWith('/my-secret-hq') || pathname.startsWith('/api')) return

      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pathname,
            // Grab the URL they came from (if any)
            referrer: document.referrer || 'Direct',
          }),
        })
      } catch (e) {
        // Fail silently. If tracking fails, we don't want to break the user's experience.
        console.error('Analytics failed', e)
      }
    }

    trackPageView()
  }, [pathname, searchParams]) // Re-run effect whenever the URL changes!

  // This component is invisible
  return null
}