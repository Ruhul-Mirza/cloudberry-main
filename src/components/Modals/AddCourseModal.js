"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
  Stack,
} from "@mui/joy";

export default function AddCourseModal({ open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    status: "active",
  });

  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        description: "",
        price: "",
        category_id: "",
        status: "active",
      });
    }
  }, [open]);

  const handleChange = (e, value) => {
    if (e?.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, status: value });
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.price) return;
    onSave({
      ...formData,
      price: Number(formData.price),
      category_id: formData.category_id || null,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg">
        <DialogTitle>Add Course</DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <FormControl required>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={formData.title} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category ID</FormLabel>
              <Input
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select value={formData.status} onChange={handleChange}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
