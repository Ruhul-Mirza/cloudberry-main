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
  Typography,
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
      <ModalDialog
        sx={{
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: "12px",
          bgcolor: "#fff",
          boxShadow: "lg",
          p: 3,
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#111" }}>
          Add Review
        </DialogTitle>

        <DialogContent
          sx={{
            display: "grid",
            gap: 2,
            mt: 1,
          }}
        >
          <FormControl required>
            <FormLabel sx={{ color: "#444" }}>Student Name</FormLabel>
            <Input
              variant="outlined"
              value={form.student_name}
              onChange={(e) =>
                handleChange("student_name", e.target.value)
              }
              sx={{ bgcolor: "#fff" }}
            />
          </FormControl>

          <FormControl required>
            <FormLabel sx={{ color: "#444" }}>Rating (1–5)</FormLabel>
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
            <FormLabel sx={{ color: "#444" }}>Review Message</FormLabel>
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
            <FormLabel sx={{ color: "#444" }}>Status</FormLabel>
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
            <FormLabel sx={{ color: "#444" }}>YouTube Embed Link</FormLabel>
            <Input
              placeholder="https://youtube.com/..."
              value={form.youtube_embed}
              onChange={(e) =>
                handleChange("youtube_embed", e.target.value)
              }
            />
          </FormControl>

          <FormControl orientation="horizontal" sx={{ mt: 1 }}>
            <FormLabel sx={{ color: "#444", flex: 1 }}>Publish</FormLabel>
            <Switch
              color="neutral"
              checked={form.is_published}
              onChange={(e) =>
                handleChange("is_published", e.target.checked)
              }
            />
          </FormControl>
        </DialogContent>

        <DialogActions
          sx={{
            mt: 2,
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button
            variant="plain"
            color="neutral"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            loading={loading}
            onClick={handleSubmit}
            color="neutral"
            sx={{
              bgcolor: "#111",
              color: "#fff",
              "&:hover": {
                bgcolor: "#000",
              },
            }}
          >
            Add Review
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
