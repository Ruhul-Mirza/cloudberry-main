"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import EditModal from "@/components/Modals/EditModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import AddCertificateModal from "@/components/Modals/AddCertificateModal";

import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "@/services/certificates";

import { Box, Button } from "@mui/joy";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DynamicTitle from "@/components/DynamicTitle";

export default function Page() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editModal, setEditModal] = useState({ open: false, data: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, data: null });
  const [addModal, setAddModal] = useState(false);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await getCertificates();

      let rows = [];
      if (Array.isArray(res?.data?.data)) {
        rows = Array.isArray(res.data.data[0])
          ? res.data.data[0]
          : res.data.data;
      }

      setCertificates(rows);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const columns = [
    { field: "student_name", label: "Student Name", width: 220 },
    { field: "course_title", label: "Course", width: 220 },
    {
      field: "start_date",
      label: "Start Date",
      width: 140,
      render: (row) => new Date(row).toLocaleDateString()
    },
    {
      field: "end_date",
      label: "End Date",
      width: 140,
      render: (row) => new Date(row).toLocaleDateString()
    },
    {
      field: "certificate_url",
      label: "Actions",
      width: 180,
      render: (row) => (
        <Button
          size="sm"
          variant="soft"
          startDecorator={<VisibilityRoundedIcon />}
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_API_URL}/certificates/preview/${row}`,
              "_blank"
            )
          }
        >
          Preview
        </Button>
      )
    }
  ];

  const handleAddCertificate = async (data) => {
    try {
      setLoading(true);
      await createCertificate(data);
      setAddModal(false);
      fetchCertificates();
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      setLoading(true);
      await updateCertificate(updatedData.id, updatedData);
      setEditModal({ open: false, data: null });
      fetchCertificates();
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteCertificate(deleteModal.data.id);
      setDeleteModal({ open: false, data: null });
      fetchCertificates();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Box sx={{ display: "flex", justifyContent:"space-between",alignItems:"center", mb: 2 }}>
      <DynamicTitle/>
        <Button onClick={() => setAddModal(true)} disabled={loading}>
          Add Certificate
        </Button>
      </Box>

      <DataTable
        data={certificates}
        columns={columns}
        loading={loading}
        showPagination
        itemsPerPage={10}
        // onEdit={(row) => setEditModal({ open: true, data: row })}
        onDelete={(row) => setDeleteModal({ open: true, data: row })}
      />

      <AddCertificateModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onCreate={handleAddCertificate}
        loading={loading}
      />

      {/* <EditModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, data: null })}
        onSave={handleSaveEdit}
        title="Edit Certificate"
        fields={[
          { name: "student_name", label: "Student Name", type: "text" },
          { name: "course_id", label: "Course ID", type: "number" },
          { name: "start_date", label: "Start Date", type: "date" },
          { name: "end_date", label: "End Date", type: "date" }
        ]}
        data={editModal.data}
      /> */}

      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, data: null })}
        onDelete={handleConfirmDelete}
        title="Delete Certificate"
        message="Are you sure you want to delete this certificate?"
        itemName={deleteModal.data?.student_name}
      />
    </>
  );
}
