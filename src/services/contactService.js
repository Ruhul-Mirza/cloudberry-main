import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A"}`,
});

// Public (Website)
export const submitContactForm = (data) =>
  axios.post(`${API_URL}/contacts`, data);

// Admin
export const getContacts = (params) =>
  axios.get(`${API_URL}/contacts`, {
    headers: authHeader(),
    params,
  });

export const getContactById = (id) =>
  axios.get(`${API_URL}/contacts/${id}`, {
    headers: authHeader(),
  });

export const updateContactStatus = (id, status) =>
  axios.put(
    `${API_URL}/contacts/${id}/status`,
    { status },
    { headers: authHeader() }
  );

export const deleteContact = (id) =>
  axios.delete(`${API_URL}/contacts/${id}`, {
    headers: authHeader(),
  });
