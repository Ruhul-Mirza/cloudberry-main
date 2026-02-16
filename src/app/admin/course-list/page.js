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
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import DynamicTitle from "@/components/DynamicTitle";

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, data: null });

  /* ================= FETCH ================= */
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getCourses();
      setCourses(res.data.data?.[0]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ================= TABLE CONFIG ================= */
  const columns = [
    { field: "id", label: "ID", width: 80 },
    { field: "title", label: "Title", width: 240 },
    { field: "price", label: "Price", width: 120 },
    { field: "category_name", label: "Category", width: 180 },
    {
      field: "status",
      label: "Status",
      width: 140,
      type: "chip",
      chipConfig: {
        active: { icon: <CheckRoundedIcon />, color: "success" },
        inactive: { icon: <BlockIcon />, color: "danger" },
      },
    },
  ];

  const editFields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "price", label: "Price", type: "number", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  /* ================= ACTIONS ================= */
  const handleAdd = async (data) => {
    setActionLoading(true);
    try {
      await createCourse(data);
      await fetchCourses();
      setAddOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditModal({ open: true, data: row });
  };

  const handleSaveEdit = async (data) => {
    setActionLoading(true);
    try {
      await updateCourse(editModal.data.id, data);
      await fetchCourses();
      setEditModal({ open: false, data: null });
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
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

  return (
    <>
      <Box sx={{ display: "flex", justifyContent:"space-between",alignItems:"center", mb: 2 }}>
        <DynamicTitle/>
        <Button onClick={() => setAddOpen(true)} disabled={loading || actionLoading}>
          Add Course
        </Button>
      </Box>

      <DataTable
        data={courses}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showCheckbox
        showPagination
        loading={loading}
      />

      {/* ADD */}
      <AddCourseModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
        loading={actionLoading}
      />

      {/* EDIT */}
      <EditModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, data: null })}
        onSave={handleSaveEdit}
        title="Edit Course"
        fields={editFields}
        data={editModal.data}
        loading={actionLoading}
      />

      {/* DELETE */}
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