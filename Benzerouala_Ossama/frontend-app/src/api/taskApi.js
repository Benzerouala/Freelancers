import axios from "axios"
import { getAuthHeader } from "../utils/auth"

const API = "http://localhost:5000/api/tasks"  // ou /api/projects selon ton choix

export const fetchTasksByProject = (projectId, limit = 10, offset = 0) =>
  axios.get(`${API}/${projectId}/tasks?limit=${limit}&offset=${offset}`, getAuthHeader())

export const addTask = (projectId, data) =>
  axios.post(`${API}/${projectId}/tasks`, data, getAuthHeader())

export const updateTaskStatus = (id, status) =>
  axios.patch(`${API}/tasks/${id}/status`, { status }, getAuthHeader())

export const deleteTask = (id) =>
  axios.delete(`${API}/tasks/${id}`, getAuthHeader())  // ✅ assure-toi que cette fonction existe
