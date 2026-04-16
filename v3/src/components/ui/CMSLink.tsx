'use client'
import React from 'react'
import Link from 'next/link'
import { useModal } from '../../providers/ModalProvider'

export const CMSLink = ({ link, className, children, domainSettings }: any) => {
  const { openModal } = useModal()
  
  // Use settings from CMS, fallback to env, fallback to empty string
  const rootDomain = domainSettings?.rootDomain || process.env.NEXT_PUBLIC_SITE_URL || 'https://devlouix.com'
  const blogDomain = domainSettings?.blogDomain || ''

  if (link.type === 'modal') {
    return <button onClick={() => openModal(link.modalId)} className={className}>{children || link.label}</button>
  }

  let href = ''
  if (link.type === 'custom') {
    href = link.url || ''
  } else if (link.type === 'reference' && link.reference?.value) {
    const slug = link.reference.value.slug
    const relation = link.reference.relationTo

    if (relation === 'pages') {
      // If the link is a page, point to the root domain
      href = slug === 'home' ? `${rootDomain}/` : `${rootDomain}/${slug}`
    } else if (relation === 'posts') {
      // If the link is a post, point to the blog subdomain
      href = `${blogDomain}/${slug}`
    }
  }

  return (
    <Link href={href} className={className} target={link.newTab ? '_blank' : undefined}>
      {children || link.label}
    </Link>
  )
}