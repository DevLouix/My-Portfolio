"use client"
import React from 'react'
import Link from 'next/link'
import { useModal } from '@/providers/ModalProvider'

type CMSLinkType = {
  type?: 'reference' | 'custom' | 'modal' | null
  label?: string | null
  url?: string | null
  modalId?: string | null // 1. ADD THIS TO THE TYPE
  newTab?: boolean | null
  reference?: {
    relationTo: string
    value: any
  } | null
}

export const CMSLink = ({
  link,
  className,
  children, // Allows us to pass custom content (like icons) inside the link
}: {
  link: CMSLinkType
  className?: string
  children?: React.ReactNode
}) => {
  const { openModal } = useModal()
  // 1. Determine the destination URL
  let href = ''

  if (link.type === 'custom') {
    href = link.url || ''
  } else if (link.type === 'reference' && link.reference?.value) {
    // If it's a relationship, we build the URL dynamically based on the collection
    const slug = link.reference.value.slug
    if (link.reference.relationTo === 'pages') {
      href = slug === 'home' ? '/' : `/${slug}`
    } else if (link.reference.relationTo === 'posts') {
      href = `/posts/${slug}`
    }
  } else if (link.type === 'modal' && link.modalId) {
    return (
      <button onClick={() => openModal(link.modalId as string)} className={className}>
        {children || link.label}
      </button>
    )
  }

  if (!href) return null

  // 2. Render the link
  return (
    <Link
      href={href}
      target={link.newTab ? '_blank' : undefined}
      rel={link.newTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children || link.label}
    </Link>
  )
}
