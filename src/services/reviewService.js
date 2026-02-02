import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * GET ALL REVIEWS
 * Supports filters like ?status=pending&is_published=true
 */
export const getReviews = (params) =>
  axios.get(`${API_URL}/reviews`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });

/**
 * GET REVIEW BY ID
 */
export const getReviewById = (id) =>
  axios.get(`${API_URL}/reviews/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });

/**
 * CREATE REVIEW
 */
export const createReview = (data) =>
  axios.post(`${API_URL}/reviews`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });

/**
 * UPDATE REVIEW (Approve / Reject / Publish)
 */
export const updateReview = (id, data) =>
  axios.put(`${API_URL}/reviews/${id}`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });

/**
 * DELETE REVIEW
 */
export const deleteReview = (id) =>
  axios.delete(`${API_URL}/reviews/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });
