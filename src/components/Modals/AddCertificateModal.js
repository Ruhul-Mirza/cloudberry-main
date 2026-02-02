"use client";

import React, { useState } from "react";
import { Modal, ModalDialog, Button, Input } from "@mui/joy";

export default function AddCertificateModal({
  open,
  onClose,
  onCreate,
  loading
}) {
  const [form, setForm] = useState({
    student_name: "",
    course_id: "",
    start_date: "",
    end_date: ""
  });

  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 PREVIEW HANDLER
  const handlePreview = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/certificates/preview-temp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ADMIN_JWT_TOKEN"
        },
        body: JSON.stringify(form)
      }
    );

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    setPreviewUrl(url);
    setShowPreview(true);
  };

  // 🔥 FINAL SUBMIT
  const handleSubmit = () => {
    onCreate(form);
    setShowPreview(false);
    setPreviewUrl("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 900 }}>
        <h3>Add Certificate</h3>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Input
            placeholder="Student Name"
            name="student_name"
            value={form.student_name}
            onChange={handleChange}
          />
          <Input
            placeholder="Course ID"
            name="course_id"
            type="number"
            value={form.course_id}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="soft" onClick={handlePreview}>
            Preview Certificate
          </Button>
          <Button
            color="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Confirm & Create
          </Button>
        </div>

        {/* PDF PREVIEW */}
        {showPreview && (
          <div className="mt-4 border rounded overflow-hidden">
            <iframe
              src={previewUrl}
              className="w-full h-[500px]"
            />
          </div>
        )}
      </ModalDialog>
    </Modal>
  );
}
