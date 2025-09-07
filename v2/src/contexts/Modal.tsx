"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  open: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ open, openModal, closeModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};
