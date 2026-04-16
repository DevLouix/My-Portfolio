import { getPayload } from "payload"
import { HeaderClient } from "./HeaderClient"
import configPromise from "@/payload.config"

export async function Header() {
  try {
    const payload = await getPayload({ config: await configPromise })
    
    // Fetch both Globals concurrently for better performance
    const [headerData, siteSettings] = await Promise.all([
      payload.findGlobal({ slug: 'header', depth: 2 }).catch(() => null),
      payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null)
    ])

    // Graceful fallback if header data is completely missing
    if (!headerData) return null

    return (
      <HeaderClient 
        logo={headerData?.logo || null} 
        navItems={headerData?.navItems || []} 
        primaryCTA={headerData?.primaryCTA || null} 
        domainSettings={siteSettings?.urls || null} 
      />
    )
  } catch (error) {
    console.error("Failed to load header data:", error)
    return null // Fails safely without breaking the layout
  }
}