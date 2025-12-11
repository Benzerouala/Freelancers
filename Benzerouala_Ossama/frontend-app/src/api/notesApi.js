import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const API = "http://localhost:5000/api/notes";

// Récupérer toutes les notes
export const fetchNotes = (limit = 10, offset = 0) => 
  axios.get(`${API}?limit=${limit}&offset=${offset}`, getAuthHeader());

// Récupérer une note par ID
export const fetchNoteById = (id) => 
  axios.get(`${API}/${id}`, getAuthHeader());

// Ajouter une nouvelle note
export const addNote = (data) => 
  axios.post(API, data, getAuthHeader());

// Mettre à jour une note
export const updateNote = (id, data) => 
  axios.put(`${API}/${id}`, data, getAuthHeader());

// Supprimer une note
export const deleteNote = (id) => 
  axios.delete(`${API}/${id}`, getAuthHeader());
