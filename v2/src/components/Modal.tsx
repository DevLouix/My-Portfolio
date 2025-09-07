"use client"
import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from '@/contexts/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxWidth: 600,
  width: '90%',
  outline: 'none',
};

export const ModalComponent: React.FC = () => {
  const { open, closeModal, modalContent } = useModal();

  return (
    <Modal open={open} onClose={closeModal} aria-labelledby="modal-title">
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        {modalContent}
      </Box>
    </Modal>
  );
};
