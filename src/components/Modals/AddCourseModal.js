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
  FormHelperText,
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Checkbox,
  Stack,
  Box,
} from "@mui/joy";

import { getCategories } from "@/services/categoryApi";

export default function AddCourseModal({
  open,
  onClose,
  onSave,
  loading,
}) {
  const initialState = {
    title: "",
    description: "",
    price: "",
    duration: "",
    feature_bullet_points: "",
    category_id: "",
    status: "active",
    discount_available: false,
    discount_amount: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!open) return;

    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const res = await getCategories();
        const categoryArray =
          res?.data?.data?.[0] || res?.data?.data || [];

        const activeCategories = categoryArray.filter(
          (cat) => cat.status === "active"
        );

        setCategories(activeCategories);
      } catch (err) {
        console.error(err);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, [open]);

  /* ================= RESET ================= */
  useEffect(() => {
    if (!open) {
      setForm(initialState);
      setErrors({});
    }
  }, [open]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleCategoryChange = (_, value) => {
    setForm({ ...form, category_id: value });
    if (errors.category_id) {
      setErrors({ ...errors, category_id: "" });
    }
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title required";
    if (!form.price) newErrors.price = "Price required";
    if (!form.category_id) newErrors.category_id = "Select category";

    if (form.discount_available) {
      if (!form.discount_amount)
        newErrors.discount_amount = "Discount required";
      else if (Number(form.discount_amount) >= Number(form.price))
        newErrors.discount_amount =
          "Discount must be less than price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      ...form,
      price: Number(form.price),
      category_id: Number(form.category_id),
      discount_amount: form.discount_available
        ? Number(form.discount_amount)
        : 0,
      feature_bullet_points: form.feature_bullet_points
        ? form.feature_bullet_points
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: 720,
          maxWidth: 720,
          minWidth: 720,
          maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        <DialogTitle>Add Course</DialogTitle>

        <DialogContent
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            pr: 1,
          }}
        >
          <Stack spacing={2}>
            {/* TITLE */}
            <FormControl error={!!errors.title} required>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
              />
              <FormHelperText>{errors.title}</FormHelperText>
            </FormControl>

            {/* DESCRIPTION */}
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                minRows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </FormControl>

            {/* PRICE */}
            <FormControl error={!!errors.price} required>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
              <FormHelperText>{errors.price}</FormHelperText>
            </FormControl>

            {/* DURATION */}
            <FormControl>
              <FormLabel>Duration</FormLabel>
              <Input
                name="duration"
                placeholder="e.g. 6 Weeks / 40 Hours"
                value={form.duration}
                onChange={handleChange}
              />
            </FormControl>

            {/* FEATURE BULLET POINTS */}
            <FormControl>
              <FormLabel>Feature Bullet Points</FormLabel>
              <Textarea
                minRows={4}
                name="feature_bullet_points"
                placeholder="Enter each feature on a new line"
                value={form.feature_bullet_points}
                onChange={handleChange}
              />
            </FormControl>

            {/* CATEGORY */}
            <FormControl error={!!errors.category_id} required>
              <FormLabel>Category</FormLabel>
              <Box sx={{ width: "100%" }}>
                <Select
                  placeholder={
                    categoryLoading
                      ? "Loading categories..."
                      : "Select category"
                  }
                  value={form.category_id || null}
                  onChange={handleCategoryChange}
                  disabled={categoryLoading}
                  sx={{ width: "100%" }}
                >
                  {categories.map((cat) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Box>
              <FormHelperText>
                {errors.category_id}
              </FormHelperText>
            </FormControl>

            {/* STATUS */}
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                value={form.status}
                onChange={(_, value) =>
                  setForm({ ...form, status: value })
                }
                sx={{ width: "100%" }}
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </FormControl>

            {/* DISCOUNT */}
            <Checkbox
              label="Discount Available"
              name="discount_available"
              checked={form.discount_available}
              onChange={handleChange}
            />

            {form.discount_available && (
              <FormControl error={!!errors.discount_amount}>
                <FormLabel>Discount Amount</FormLabel>
                <Input
                  type="number"
                  name="discount_amount"
                  value={form.discount_amount}
                  onChange={handleChange}
                />
                <FormHelperText>
                  {errors.discount_amount}
                </FormHelperText>
              </FormControl>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={loading} onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}