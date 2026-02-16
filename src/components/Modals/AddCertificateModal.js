"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalDialog,
  Button,
  Input,
  Select,
  Option,
  FormControl,
  FormLabel,
  FormHelperText
} from "@mui/joy";
import { getCourses } from "@/services/courseApi";

export default function AddCertificateModal({
  open,
  onClose,
  onCreate,
  loading
}) {
  const initialState = {
    student_name: "",
    course_id: "",
    start_date: "",
    end_date: ""
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  /* =================================
     FETCH COURSES
  ================================= */
  useEffect(() => {
    if (!open) return;

    const fetchCourses = async () => {
      try {
        setCourseLoading(true);

        const res = await getCourses();
        const courseArray = res?.data?.data?.[0] || [];

        const activeCourses = courseArray.filter(
          (course) => course.status === "active"
        );

        setCourses(activeCourses);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setCourseLoading(false);
      }
    };

    fetchCourses();
  }, [open]);

  /* =================================
     RESET WHEN CLOSED
  ================================= */
  useEffect(() => {
    if (!open) {
      setForm(initialState);
      setErrors({});
      setShowPreview(false);
      setPreviewUrl("");
    }
  }, [open]);

  /* =================================
     INPUT CHANGE
  ================================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  /* =================================
     COURSE SELECT CHANGE
  ================================= */
  const handleCourseChange = (_, value) => {
    setForm({ ...form, course_id: value });

    if (errors.course_id) {
      setErrors({ ...errors, course_id: "" });
    }
  };

  /* =================================
     VALIDATION
  ================================= */
  const validate = () => {
    const newErrors = {};

    if (!form.student_name.trim()) {
      newErrors.student_name = "Student name is required";
    }

    if (!form.course_id) {
      newErrors.course_id = "Please select a course";
    }

    if (!form.start_date) {
      newErrors.start_date = "Start date is required";
    }

    if (!form.end_date) {
      newErrors.end_date = "End date is required";
    }

    if (
      form.start_date &&
      form.end_date &&
      form.start_date > form.end_date
    ) {
      newErrors.end_date = "End date must be after start date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =================================
     PREVIEW HANDLER
  ================================= */
  // const handlePreview = async () => {
  //   if (!validate()) return;

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/certificates/preview-temp`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer YOUR_ADMIN_JWT_TOKEN"
  //         },
  //         body: JSON.stringify(form)
  //       }
  //     );

  //     const blob = await res.blob();
  //     const url = URL.createObjectURL(blob);

  //     setPreviewUrl(url);
  //     setShowPreview(true);
  //   } catch (err) {
  //     console.error("Preview failed", err);
  //   }
  // };

  /* =================================
     FINAL SUBMIT
  ================================= */
  const handleSubmit = () => {
    if (!validate()) return;

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

          {/* STUDENT NAME */}
          <FormControl error={!!errors.student_name}>
            <FormLabel>Student Name</FormLabel>
            <Input
              name="student_name"
              value={form.student_name}
              onChange={handleChange}
            />
            <FormHelperText>{errors.student_name}</FormHelperText>
          </FormControl>

          {/* COURSE SELECT */}
          <FormControl error={!!errors.course_id}>
            <FormLabel>Course</FormLabel>

            <Select
              placeholder={courseLoading ? "Loading courses..." : "Select Course"}
              value={form.course_id || null}
              onChange={handleCourseChange}
              disabled={courseLoading}
            >
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.title}
                </Option>
              ))}
            </Select>

            <FormHelperText>{errors.course_id}</FormHelperText>
          </FormControl>


          {/* START DATE */}
          <FormControl error={!!errors.start_date}>
            <FormLabel>Start Date</FormLabel>
            <Input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />
            <FormHelperText>{errors.start_date}</FormHelperText>
          </FormControl>

          {/* END DATE */}
          <FormControl error={!!errors.end_date}>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
            />
            <FormHelperText>{errors.end_date}</FormHelperText>
          </FormControl>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          {/* <Button variant="soft" onClick={handlePreview}>
            Preview Certificate
          </Button> */}

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
