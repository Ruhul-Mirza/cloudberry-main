// src/services/courses.service.ts

import api from "./api";

// GET all courses
export const getCourses = (params) => {
  return api.get("/courses", { params });
};

// GET course by id
export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};

// CREATE course
export const createCourse = (data) => {
  return api.post("/courses", data);
};

// UPDATE course
export const updateCourse = (id, data) => {
  return api.put(`/courses/${id}`, data);
};

// DELETE course
export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};
