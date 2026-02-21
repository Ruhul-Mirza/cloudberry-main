"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import EditModal from "@/components/Modals/EditModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import AddCourseModal from "@/components/Modals/AddCourseModal";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/services/courseApi";

import { Box, Button } from "@mui/joy";
import DynamicTitle from "@/components/DynamicTitle";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { DoNotDisturb } from "@mui/icons-material";
import { getCategories } from "@/services/categoryApi";

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, data: null });
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

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

  /* ================= FETCH ================= */
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      setCourses(res.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ================= FORMAT HELPERS ================= */

  const formatDataBeforeSave = (data) => ({
    ...data,
    feature_bullet_points:
      typeof data.feature_bullet_points === "string"
        ? data.feature_bullet_points
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        : data.feature_bullet_points,
  });

  const formatDataForEdit = (row) => ({
    ...row,
    feature_bullet_points: Array.isArray(row.feature_bullet_points)
      ? row.feature_bullet_points.join("\n")
      : "",
  });

  /* ================= TABLE CONFIG ================= */
  const columns = [
    // { field: "id", label: "ID", width: 80 },
    { field: "title", label: "Title", width: 200 },

    {
      field: "description",
      label: "Description",
      width: 250,
      render: (value) => (
        <div
          style={{
            maxWidth: 230,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={value}
        >
          {value}
        </div>
      ),
    },

    {
      field: "duration",
      label: "Duration",
      width: 140,
      render: (value) => value || "-",
    },

    {
      field: "feature_bullet_points",
      label: "Features",
      width: 250,
      render: (value) => {
        if (!value || !value.length) return "-";
        return (
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            {value.slice(0, 3).map((point, index) => (
              <li key={index} style={{ fontSize: 13 }}>
                {point}
              </li>
            ))}
            {value.length > 3 && <li>...</li>}
          </ul>
        );
      },
    },

    {
      field: "price",
      label: "Price",
      width: 180,
      render: (value, row) => {
        if (row?.discount_available && row?.new_price) {
          return (
            <>
              <span style={{ textDecoration: "line-through", marginRight: 8 }}>
                ₹{row.old_price}
              </span>
              <strong>₹{row.new_price}</strong>
            </>
          );
        }
        return <>₹{value}</>;
      },
    },

    { field: "category_name", label: "Category", width: 160 },

    {
      field: "discount_available",
      label: "Discount",
      width: 130,
      type: "chip",
      chipConfig: {
        true: { icon: <LocalOfferIcon />, color: "warning" },
        false: { icon: <DoNotDisturb />, color: "neutral" },
      },
    },

    {
      field: "status",
      label: "Status",
      width: 130,
      type: "chip",
      chipConfig: {
        active: { icon: <CheckRoundedIcon />, color: "success" },
        inactive: { icon: <BlockIcon />, color: "danger" },
      },
    },
  ];

   const filters = [
    {
      field: "status",
      label: "Status",
      placeholder: "Filter by status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      field: "discount_available",
      label: "Discount",
      placeholder: "Filter by discount",
      options: [
        { value: true, label: "Available" },
        { value: false, label: "Not Available" },
      ],
    },
  ];

  /* ================= EDIT FIELDS ================= */
  const editFields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "price", label: "Price", type: "number", required: true },
    {
      name: "duration",
      label: "Duration",
      type: "text",
      placeholder: "e.g. 6 Weeks / 40 Hours",
    },
    {
      name: "feature_bullet_points",
      label: "Feature Bullet Points",
      type: "textarea",
      placeholder: "Enter each feature on a new line",
    },
    {
      name: "category_id",
      label: "Category",
      type: "select",
      required: true,
      loading: categoryLoading,
      options: categories.map((cat) => ({
        value: String(cat.id),
        label: cat.name,
      })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    { name: "discount_available", label: "Discount Available", type: "boolean" },
    { name: "discount_amount", label: "Discount Amount", type: "number" },
  ];

  /* ================= ACTIONS ================= */

  const handleAdd = async (data) => {
    setActionLoading(true);
    try {
      await createCourse(formatDataBeforeSave(data));
      await fetchCourses();
      setAddOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditModal({
      open: true,
      data: formatDataForEdit(row),
    });
  };

  const handleSaveEdit = async (data) => {
    setActionLoading(true);
    setLoading(true);
    try {
      await updateCourse(
        editModal.data.id,
        formatDataBeforeSave(data)
      );
      await fetchCourses();
      setEditModal({ open: false, data: null });
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
      setActionLoading(false);
    }
  };

  const handleDelete = (row) => {
    setDeleteModal({ open: true, data: row });
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteCourse(deleteModal.data.id);
      await fetchCourses();
      setDeleteModal({ open: false, data: null });
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <DynamicTitle />
        <Button
          onClick={() => setAddOpen(true)}
          disabled={loading || actionLoading}
        >
          Add Course
        </Button>
      </Box>

      <DataTable
        data={courses}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showCheckbox
        filters={filters}
        showPagination
        loading={loading}
      />

      <AddCourseModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
        loading={actionLoading}
      />

      <EditModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, data: null })}
        onSave={handleSaveEdit}
        title="Edit Course"
        fields={editFields}
        data={editModal.data}
      />

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, data: null })}
        onDelete={handleConfirmDelete}
        title="Delete Course"
        message="This action cannot be undone"
        itemName={deleteModal.data?.title}
        loading={actionLoading}
      />
    </>
  );
}