// src/services/reviews.service.ts

import api from "./api";

/**
 * GET ALL REVIEWS
 * Supports filters like ?status=pending&is_published=true
 */
export const getReviews = (params) => {
  return api.get("/reviews", { params });
};

/**
 * GET REVIEW BY ID
 */
export const getReviewById = (id) => {
  return api.get(`/reviews/${id}`);
};

/**
 * CREATE REVIEW
 */
export const createReview = (data) => {
  return api.post("/reviews", data);
};

/**
 * UPDATE REVIEW (Approve / Reject / Publish)
 */
export const updateReview = (id, data) => {
  return api.put(`/reviews/${id}`, data);
};

/**
 * DELETE REVIEW
 */
export const deleteReview = (id) => {
  return api.delete(`/reviews/${id}`);
};
