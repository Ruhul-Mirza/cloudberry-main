// src/services/contacts.service.ts

import api from "./api";

// Public (Website)
export const submitContactForm = (data) => {
  return api.post("/contacts", data);
};

// Admin
export const getContacts = (params) => {
  return api.get("/contacts", { params });
};

export const getContactById = (id) => {
  return api.get(`/contacts/${id}`);
};

export const updateContactStatus = (id, status) => {
  return api.put(`/contacts/${id}/status`, { status });
};

export const deleteContact = (id) => {
  return api.delete(`/contacts/${id}`);
};
