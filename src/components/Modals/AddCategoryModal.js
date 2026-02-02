"use client";

import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Stack,
} from "@mui/joy";
import { useState, useEffect } from "react";

export default function AddCategoryModal({
  open,
  onClose,
  onSave,
  title = "Add Category",
}) {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  // Modal band hote hi form reset karne ke liye
  useEffect(() => {
    if (!open) {
      setFormData({ name: "", status: "active" });
    }
  }, [open]);

  // Ek hi function jo dono types ko handle karega
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation: name khali nahi hona chahiye
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="md">
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            {/* Category Name Input */}
            <FormControl required>
              <FormLabel>Category Name</FormLabel>
              <Input
                placeholder="Enter category name"
                value={formData.name}
                // Standard input se value nikal kar bhej rahe hain
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </FormControl>

            {/* Status Dropdown */}
            <FormControl required>
              <FormLabel>Status</FormLabel>
              <Select
                value={formData.status}
                // MUI Joy Select direct value deta hai dusre argument mein
                onChange={(_, newValue) => handleChange("status", newValue)}
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Add Category
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}