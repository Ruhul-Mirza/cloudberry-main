// components/Modals/RenameModal.jsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
} from '@mui/joy';

/**
 * Reusable Rename Modal Component
 * 
 * @param {Object} props
 * @param {Boolean} props.open - Modal open state
 * @param {Function} props.onClose - Close callback
 * @param {Function} props.onRename - Rename callback
 * @param {String} props.currentName - Current name
 * @param {String} props.title - Modal title
 * @param {String} props.fieldLabel - Input field label
 */
export default function RenameModal({
  open,
  onClose,
  onRename,
  currentName = '',
  title = 'Rename Item',
  fieldLabel = 'Name',
}) {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setNewName(currentName);
      setError('');
    }
  }, [open, currentName]);

  const handleRename = () => {
    if (!newName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    if (newName.trim() === currentName.trim()) {
      setError('Please enter a different name');
      return;
    }

    onRename(newName.trim());
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRename();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ minWidth: { xs: '90%', sm: 400 } }}>
        <ModalClose />
        <Typography level="h4" component="h2">
          {title}
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <FormControl error={!!error}>
            <FormLabel>{fieldLabel}</FormLabel>
            <Input
              autoFocus
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder={`Enter ${fieldLabel.toLowerCase()}`}
            />
            {error && (
              <Typography level="body-sm" color="danger">
                {error}
              </Typography>
            )}
          </FormControl>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleRename}
              fullWidth
            >
              Rename
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}