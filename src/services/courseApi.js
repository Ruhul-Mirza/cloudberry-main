import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getCourses = (params) =>
  axios.get(`${API_URL}/courses`, { params });

export const getCourseById = (id) =>
  axios.get(`${API_URL}/courses/${id}`);

export const createCourse = (data) =>
  axios.post(`${API_URL}/courses`, data,{
      headers :{
        Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  
  });

export const updateCourse = (id, data) =>
  axios.put(`${API_URL}/courses/${id}`, data,{
     headers :{
        Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });

export const deleteCourse = (id) =>
  axios.delete(`${API_URL}/courses/${id}`,{
     headers :{
        Authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsImlhdCI6MTc2OTk2NjAyOCwiZXhwIjoxNzcwNTcwODI4fQ.DyVxiKIuxDzbXH0aoi3JSwgG66mQHe4F8kStnClY20A`
    }
  });
