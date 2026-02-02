// components/Modals/DeleteModal.jsx
import React from 'react';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Stack,
  Box,
} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

/**
 * Reusable Delete Confirmation Modal
 * 
 * @param {Object} props
 * @param {Boolean} props.open - Modal open state
 * @param {Function} props.onClose - Close callback
 * @param {Function} props.onDelete - Delete callback
 * @param {String} props.title - Modal title
 * @param {String} props.message - Confirmation message
 * @param {String} props.itemName - Name of item being deleted
 */
export default function DeleteModal({
  open,
  onClose,
  onDelete,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  itemName,
}) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{ minWidth: { xs: '90%', sm: 400 } }}
      >
        <ModalClose />
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <WarningRoundedIcon sx={{ color: 'danger.500', fontSize: 32 }} />
          <div>
            <Typography level="h4" component="h2">
              {title}
            </Typography>
            <Typography level="body-md" sx={{ mt: 1 }}>
              {message}
            </Typography>
            {itemName && (
              <Typography level="body-sm" sx={{ mt: 1, fontWeight: 'bold' }}>
                Item: {itemName}
              </Typography>
            )}
          </div>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            color="neutral"
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={handleDelete}
            fullWidth
          >
            Delete
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}