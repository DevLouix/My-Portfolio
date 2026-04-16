'use client'

import React, { createContext, useContext, useState } from 'react'

type ModalContextType = {
  activeModal: string | null // Tracks WHICH modal is open
  openModal: (modalId: string) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <ModalContext.Provider 
      value={{ 
        activeModal, 
        openModal: (id) => setActiveModal(id), 
        closeModal: () => setActiveModal(null) 
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within ModalProvider')
  return context
}