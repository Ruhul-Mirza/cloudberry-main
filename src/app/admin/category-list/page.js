"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import EditModal from "@/components/Modals/EditModal";
import RenameModal from "@/components/Modals/RenameModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import AddCategoryModal from "@/components/Modals/AddCategoryModal";

import {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} from "@/services/categoryApi";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import { Button, Box } from "@mui/joy";
import DynamicTitle from "@/components/DynamicTitle";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [renameModal, setRenameModal] = useState({ open: false, data: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, data: null });

  /* ================= FETCH DATA ================= */
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      console.log(res, "res");
      setCategories(res.data?.data?.[0]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= TABLE CONFIG ================= */
  const columns = [
    { field: "id", label: "ID", width: 80 },
    { field: "name", label: "Category Name", width: 240 },
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
  ];

  const editFields = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  /* ================= ACTIONS ================= */
  const handleAddCategory = async (data) => {
    setActionLoading(true);
    try {
      await createCategory(data);
      await fetchCategories();
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (row) => {
    setEditModal({ open: true, data: row });
  };

  const handleSaveEdit = async (updatedData) => {
    setActionLoading(true);
    setLoading(true);
    try {
      await updateCategory(editModal.data.id, updatedData);
      await fetchCategories();
      setEditModal({ open: false, data: null });
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
      setActionLoading(false);
    }
  };
  
  const handleRename = (row) => {
    setRenameModal({ open: true, data: row });
  };
  
  const handleSaveRename = async (newName) => {
    setLoading(true);
    setActionLoading(true);
    try {
      await updateCategory(renameModal.data.id, {
        name: newName,
        status: renameModal.data.status,
      });
      await fetchCategories();
      setRenameModal({ open: false, data: null });
    } catch (error) {
      console.error("Error renaming category:", error);
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
      await deleteCategory(deleteModal.data.id);
      await fetchCategories();
      setDeleteModal({ open: false, data: null });
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      {/* ===== Header Add Button ===== */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignContent: "center", mb: 2 }}>
        <DynamicTitle />
        <Button
          startDecorator="+"
          color="primary"
          onClick={() => setAddModalOpen(true)}
          disabled={loading || actionLoading}
        >
          Add Category
        </Button>
      </Box>

      <DataTable
        data={categories}
        columns={columns}
        filters={filters}
        onEdit={handleEdit}
        onRename={handleRename}
        onDelete={handleDelete}
        showCheckbox
        showPagination
        itemsPerPage={10}
        loading={loading}
      />

      {/* ===== Add Modal ===== */}
      <AddCategoryModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddCategory}
        title="Add Category"
        loading={actionLoading}
      />

      {/* ===== Edit Modal ===== */}
      <EditModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, data: null })}
        onSave={handleSaveEdit}
        title="Edit Category"
        fields={editFields}
        data={editModal.data}
        loading={actionLoading}
      />

      {/* ===== Rename Modal ===== */}
      <RenameModal
        open={renameModal.open}
        onClose={() => setRenameModal({ open: false, data: null })}
        onRename={handleSaveRename}
        currentName={renameModal.data?.name || ""}
        title="Rename Category"
        fieldLabel="Category Name"
        loading={actionLoading}
      />

      {/* ===== Delete Modal ===== */}
      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, data: null })}
        onDelete={handleConfirmDelete}
        title="Delete Category"
        message="This action cannot be undone."
        itemName={deleteModal.data?.name}
        loading={actionLoading}
      />
    </>
  );
}