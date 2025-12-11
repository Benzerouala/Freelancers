import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const API = "http://localhost:5000/api/clients";

export const fetchClients = () => axios.get(API, getAuthHeader());
export const addClient = (data) => axios.post(API, data, getAuthHeader());
