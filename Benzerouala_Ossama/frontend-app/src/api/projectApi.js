import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const API = "http://localhost:5000/api/projects";

export const fetchProjects = () => axios.get(API, getAuthHeader());
export const addProject = (data) => axios.post(API, data, getAuthHeader());
