import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getCategories = (params) =>
  axios.get(`${API_URL}/categories`, { params });

export const createCategory = (data) =>
  axios.post(`${API_URL}/categories`, data,{
    headers :{
        Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });

export const updateCategory = (id, data) =>
  axios.put(`${API_URL}/categories/${id}`, data,{
      headers :{
        Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  
  });

export const deleteCategory = (id) =>
  axios.delete(`${API_URL}/categories/${id}`,{
     headers :{
        Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });
