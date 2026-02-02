// src/components/Modals/AddReviewModal.jsx
"use client";

import React, { useState } from "react";
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
  Switch,
  Textarea,
} from "@mui/joy";

export default function AddReviewModal({
  open,
  onClose,
  onSave,
  loading,
}) {
  const [form, setForm] = useState({
    student_name: "",
    rating: 5,
    status: "approved",
    is_published: true,
    youtube_embed: "",
    message: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="md">
        <DialogTitle>Add Review</DialogTitle>

        <DialogContent sx={{ display: "grid", gap: 2 }}>
          <FormControl required>
            <FormLabel>Student Name</FormLabel>
            <Input
              value={form.student_name}
              onChange={(e) =>
                handleChange("student_name", e.target.value)
              }
            />
          </FormControl>

          <FormControl required>
            <FormLabel>Rating (1–5)</FormLabel>
            <Input
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) =>
                handleChange("rating", Number(e.target.value))
              }
            />
          </FormControl>

          <FormControl required>
            <FormLabel>Review Message</FormLabel>
            <Textarea
              minRows={3}
              placeholder="Write the review message here..."
              value={form.message}
              onChange={(e) =>
                handleChange("message", e.target.value)
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              value={form.status}
              onChange={(_, val) => handleChange("status", val)}
            >
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>YouTube Embed Link</FormLabel>
            <Input
              placeholder="https://youtube.com/..."
              value={form.youtube_embed}
              onChange={(e) =>
                handleChange("youtube_embed", e.target.value)
              }
            />
          </FormControl>

          <FormControl orientation="horizontal">
            <FormLabel>Publish</FormLabel>
            <Switch
              checked={form.is_published}
              onChange={(e) =>
                handleChange("is_published", e.target.checked)
              }
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button variant="plain" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={loading} onClick={handleSubmit}>
            Add Review
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
