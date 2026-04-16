'use client'

import { useModal } from '@/providers/ModalProvider'
import { ContactModal } from './ContactModal'
import { NewsletterModal } from './NewsLetterModal'
// import { NewsletterModal } from './NewsletterModal' // (You can build this later!)

export function GlobalModalManager() {
  const { activeModal } = useModal()

  // If no modal is active, render nothing
  if (!activeModal) return null

  return (
    <>
      {activeModal === 'contactForm' && <ContactModal />}
      {activeModal === 'newsletterForm' && <NewsletterModal />}
    </>
  )
}