import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const AUTH_HEADER = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
};

export const getCertificates = (params) =>
  axios.get(`${API_URL}/certificates`, {
    headers: AUTH_HEADER,
    params
  });

export const createCertificate = (data) =>
  axios.post(`${API_URL}/certificates`, data, {
    headers: AUTH_HEADER
  });

export const updateCertificate = (id, data) =>
  axios.put(`${API_URL}/certificates/${id}`, data, {
    headers: AUTH_HEADER
  });

export const deleteCertificate = (id) =>
  axios.delete(`${API_URL}/certificates/${id}`, {
    headers: AUTH_HEADER
  });
