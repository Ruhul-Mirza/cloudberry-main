"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditModal from "@/components/Modals/EditModal";
import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from "@/services/contactService";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, data: null });

  const [filters, setFilters] = useState({
    status: "",
  });

  useEffect(() => {
    loadContacts();
  }, [filters]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await getContacts(filters);
      setData(res?.data?.data?.[0] || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     TABLE COLUMNS
  ========================== */
  const columns = [
    { field: "name", label: "Name", width: 200 },
    { field: "email", label: "Email", width: 250 },
    { field: "message", label: "Message", width: 350 },
    {
      field: "status",
      label: "Status",
      width: 140,
      type: "chip",
      chipConfig: {
        new: { color: "primary" },
        read: { color: "neutral" },
        responded: { color: "success" },
      },
    },
  ];

  /* =========================
     FILTER CONFIG (NEW)
  ========================== */
  const filterConfig = [
    {
      field: "status",
      label: "Status",
      type: "select",
      placeholder: "Filter by status",
      options: [
        { value: "new", label: "New" },
        { value: "read", label: "Read" },
        { value: "responded", label: "Responded" },
      ],
    },
  ];

  /* =========================
     EDIT MODAL FIELDS
  ========================== */
  const editFields = [
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "new", label: "New" },
        { value: "read", label: "Read" },
        { value: "responded", label: "Responded" },
      ],
    },
  ];

  /* =========================
     HANDLERS
  ========================== */
  const handleSaveEdit = async (updated) => {
    await updateContactStatus(updated.id, updated.status);
    setEditModal({ open: false, data: null });
    loadContacts();
  };

  const handleDelete = async () => {
    await deleteContact(deleteModal.data.id);
    setDeleteModal({ open: false, data: null });
    loadContacts();
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================
     RENDER
  ========================== */
  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        filters={filterConfig}
        onFilterChange={handleFilterChange}
        onEdit={(row) => setEditModal({ open: true, data: row })}
        onDelete={(row) => setDeleteModal({ open: true, data: row })}
        loading={loading}
        showPagination
      />

      {/* EDIT MODAL */}
      <EditModal
        open={editModal.open}
        title="Update Contact Status"
        fields={editFields}
        data={editModal.data}
        onClose={() => setEditModal({ open: false, data: null })}
        onSave={handleSaveEdit}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        open={deleteModal.open}
        title="Delete Contact"
        itemName={deleteModal.data?.email}
        onClose={() => setDeleteModal({ open: false, data: null })}
        onDelete={handleDelete}
      />
    </>
  );
}
