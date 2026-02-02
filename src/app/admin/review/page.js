"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import EditModal from "@/components/Modals/EditModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import AddReviewModal from "@/components/Modals/AddReviewModal";

import {
  getReviews,
  updateReview,
  deleteReview,
  createReview,
} from "@/services/reviewService";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { Box, Button } from "@mui/joy";

export default function Page() {
  // ================= STATES =================
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, data: null });
  const [addModal, setAddModal] = useState(false);

  // ================= FETCH REVIEWS =================
  const fetchReviews = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getReviews(params);

      let rows = [];
      if (Array.isArray(res?.data?.data)) {
        rows = Array.isArray(res.data.data[0])
          ? res.data.data[0]
          : res.data.data;
      }

      setReviews(rows);
    } catch (error) {
      console.error("Failed to load reviews", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ================= COLUMNS =================
  const columns = [
    { field: "student_name", label: "Student", width: 220 },
    { field: "rating", label: "Rating", width: 100 },
    {
      field: "status",
      label: "Status",
      width: 160,
      type: "chip",
      chipConfig: {
        approved: { icon: <CheckRoundedIcon />, color: "success" },
        pending: { icon: <AutorenewRoundedIcon />, color: "neutral" },
        rejected: { icon: <BlockIcon />, color: "danger" },
      },
    },
    {
      field: "is_published",
      label: "Published",
      width: 130,
      type: "chip",
      chipConfig: {
        true: { icon: <CheckRoundedIcon />, color: "success" },
        false: { icon: <BlockIcon />, color: "danger" },
      },
    },
    { field: "youtube_embed", label: "YouTube Link", width: 220 },
  ];

  // ================= EDIT FIELDS =================
  const editFields = [
    { name: "student_name", label: "Student Name", type: "text", disabled: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "approved", label: "Approved" },
        { value: "pending", label: "Pending" },
        { value: "rejected", label: "Rejected" },
      ],
    },
    { name: "is_published", label: "Publish", type: "boolean" },
    { name: "youtube_embed", label: "YouTube Link", type: "text" },
  ];

  // ================= FILTERS =================
  const filters = [
    {
      field: "status",
      label: "Status",
      placeholder: "Filter by status",
      options: [
        { value: "approved", label: "Approved" },
        { value: "pending", label: "Pending" },
        { value: "rejected", label: "Rejected" },
      ],
    },
    {
      field: "is_published",
      label: "Published",
      placeholder: "Filter by publish",
      options: [
        { value: true, label: "Published" },
        { value: false, label: "Unpublished" },
      ],
    },
  ];
  const handleFilterChange = (filterValues) => {
    fetchReviews(filterValues);
  };


  // ================= HANDLERS =================
  const handleSaveEdit = async (updatedData) => {
    try {
      setLoading(true);
      await updateReview(updatedData.id, updatedData);
      setEditModal({ open: false, data: null });
      fetchReviews();
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (data) => {
    try {
      setLoading(true);
      await createReview(data);
      setAddModal(false);
      fetchReviews();
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteReview(deleteModal.data.id);
      setDeleteModal({ open: false, data: null });
      fetchReviews();
    } finally {
      setLoading(false);
    }
  };

  // ================= RENDER =================
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button onClick={() => setAddModal(true)} disabled={loading}>
          Add Review
        </Button>
      </Box>

      <DataTable
        data={reviews}
        filters={filters}          
        onFilterChange={handleFilterChange} 
        columns={columns}
        onEdit={(row) => setEditModal({ open: true, data: row })}
        onDelete={(row) => setDeleteModal({ open: true, data: row })}
        loading={loading}
        showPagination
        itemsPerPage={10}
      />

      <EditModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, data: null })}
        onSave={handleSaveEdit}
        title="Moderate Review"
        fields={editFields}
        data={editModal.data}
      />

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, data: null })}
        onDelete={handleConfirmDelete}
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        itemName={deleteModal.data?.student_name}
      />

      <AddReviewModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleAddReview}
        loading={loading}
      />
    </>
  );
}
