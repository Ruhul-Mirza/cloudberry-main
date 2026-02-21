"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  ModalDialog,
  Button,
  Input,
  Select,
  Option,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  Typography,
  Divider,
  Sheet
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
    end_date: "",
    description_line1: "In recognition of successfully completing the",
    description_line2: ""
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);

  /* =================================
     FETCH COURSES
  ================================= */
  useEffect(() => {
    if (!open) return;

    const fetchCourses = async () => {
      try {
        setCourseLoading(true);
        const res = await getCourses();
        const courseArray = res?.data?.data || [];

        const activeCourses = courseArray?.filter(
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
     RESET
  ================================= */
  useEffect(() => {
    if (!open) {
      setForm(initialState);
      setErrors({});
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
     PREVIEW DATA
  ================================= */
  const selectedCourseTitle = useMemo(() => {
    const found = courses.find(
      (c) => String(c.id) === String(form.course_id)
    );
    return found?.title || "Course Title";
  }, [form.course_id, courses]);

  const fullDescriptionPreview = useMemo(() => {
    return `In recognition of successfully completing the "${selectedCourseTitle}" ${
      form.description_line1 || ""
    } ${form.description_line2 || ""}`.trim();
  }, [selectedCourseTitle, form.description_line1, form.description_line2]);

  /* =================================
     SUBMIT
  ================================= */
  const handleSubmit = () => {
    if (!validate()) return;

    onCreate(form);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 1000 }}>
        <Typography level="h4">Add Certificate</Typography>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4 mt-4">

          <FormControl error={!!errors.student_name}>
            <FormLabel>Student Name</FormLabel>
            <Input
              name="student_name"
              value={form.student_name}
              onChange={handleChange}
            />
            <FormHelperText>{errors.student_name}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.course_id}>
            <FormLabel>Course</FormLabel>
            <Select
              placeholder={courseLoading ? "Loading..." : "Select Course"}
              value={form.course_id || null}
              onChange={handleCourseChange}
              disabled={courseLoading}
            >
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {console.log("Course in dropdown:", course)}
                  {course.title}
                </Option>
              ))}
            </Select>
            <FormHelperText>{errors.course_id}</FormHelperText>
          </FormControl>

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

          <FormControl error={!!errors.end_date}>
            <FormLabel>End Date</FormLabel>
            <Input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              slotProps={{ input: { min: form.start_date || "", max: new Date().toISOString().split("T")[0], }, }}
            />
            <FormHelperText>{errors.end_date}</FormHelperText>
          </FormControl>

          {/* DESCRIPTION LINE 1 */}
          <FormControl>
            <FormLabel>Description Line 1</FormLabel>
            <Textarea
              name="description_line1"
              value={form.description_line1}
              onChange={handleChange}
              minRows={2}
            />
          </FormControl>

          {/* DESCRIPTION LINE 2 */}
          <FormControl>
            <FormLabel>Description Line 2</FormLabel>
            <Textarea
              name="description_line2"
              value={form.description_line2}
              onChange={handleChange}
              minRows={2}
            />
          </FormControl>
        </div>

        <Divider sx={{ my: 4 }} />

        {/* LIVE DESCRIPTION PREVIEW */}
        <Typography level="h5" mb={2}>
          Description Preview
        </Typography>

        <Sheet
          variant="soft"
          sx={{
            p: 3,
            borderRadius: "md",
            backgroundColor: "#f8f9fb"
          }}
        >
          <Typography level="body-lg" sx={{ fontStyle: "italic" }}>
          {form.description_line1 && (
            <Typography mt={1}>
              {form.description_line1}
            </Typography>
          )}
            <b>"{selectedCourseTitle}"</b>
          {form.description_line2 && (
            <Typography mt={1}>
              {form.description_line2}
            </Typography>
          )}
          </Typography>


        </Sheet>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            color="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Confirm & Create
          </Button>
        </div>
      </ModalDialog>
    </Modal>
  );
}
