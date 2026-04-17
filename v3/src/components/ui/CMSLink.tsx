'use client'
import React from 'react'
import Link from 'next/link'
import { useModal } from '../../providers/ModalProvider'

export const CMSLink = ({ link, className, children, domainMappings }: any) => {
  const { openModal } = useModal()

  // 1. Get the domain for this specific collection from the Registry
  const getDomainForCollection = (slug: string) => {
    const mapping = domainMappings?.find((m: any) => m.collectionSlug === slug)
    return mapping ? mapping.domain.replace(/\/$/, '') : '' // Remove trailing slash
  }

  if (link.type === 'modal') {
    return (
      <button onClick={() => openModal(link.modalId)} className={className}>
        {children || link.label}
      </button>
    )
  }

  let href = ''
  if (link.type === 'custom') {
    href = link.url || ''
  } else if (link.type === 'reference' && link.reference?.value) {
    const relation = link.reference.relationTo
    const slug = link.reference.value.slug

    // 2. Look up the domain dynamically
    const baseDomain = getDomainForCollection(relation)

    if (relation === 'pages') {
      href = slug === 'home' ? `${baseDomain}/` : `${baseDomain}/${slug}`
    } else {
      // For ANY other collection (posts, docs, portfolio), it uses its mapped domain
      href = `${baseDomain}/${slug}`
    }
  }

  return (
    <Link href={href} className={className} target={link.newTab ? '_blank' : undefined}>
      {children || link.label}
    </Link>
  )
}
