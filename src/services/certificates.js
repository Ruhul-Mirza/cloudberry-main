// src/services/certificates.service.ts

import api from "./api";

// GET certificates
export const getCertificates = (params) => {
  return api.get("/certificates", { params });
};

// CREATE certificate
export const createCertificate = (data) => {
  return api.post("/certificates", data);
};

// UPDATE certificate
export const updateCertificate = (id, data) => {
  return api.put(`/certificates/${id}`, data);
};

// DELETE certificate
export const deleteCertificate = (id) => {
  return api.delete(`/certificates/${id}`);
};
