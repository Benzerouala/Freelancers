// Sauvegarder token et user
export const saveAuth = ({ accessToken, user }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
};

// Récupérer le token pour l'API
export const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Récupérer info user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};
import axios from "axios";

export const fetchAllProjectsPublic = () => {
  const token = localStorage.getItem("token"); // or wherever you store it

  return axios.get("http://localhost:5000/api/projects/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
