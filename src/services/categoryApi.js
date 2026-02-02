import api from "./api";

// GET categories
export const getCategories = (params) => {
  return api.get("/categories", { params });
};

// CREATE category
export const createCategory = (data) => {
  return api.post("/categories", data);
};

// UPDATE category
export const updateCategory = (id, data) => {
  return api.put(`/categories/${id}`, data);
};

// DELETE category
export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};
