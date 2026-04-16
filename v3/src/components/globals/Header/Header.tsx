import { getPayload } from "payload"
import { HeaderClient } from "./HeaderClient"
import configPromise from "@/payload.config"

export async function Header() {
  const payload = await getPayload({ config: await configPromise })
  
  // Fetch both Globals
  const headerData = await payload.findGlobal({ slug: 'header', depth: 2 })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })

  if (!headerData) return null

  return (
    <HeaderClient 
      logo={headerData.logo} 
      navItems={headerData.navItems} 
      primaryCTA={headerData.primaryCTA} // Dynamic CTA
      domainSettings={siteSettings.urls} // Dynamic Domains
    />
  )
}