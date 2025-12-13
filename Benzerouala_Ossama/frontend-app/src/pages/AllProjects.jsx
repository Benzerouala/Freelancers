// src/pages/AllProjects.jsx
import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api/projectApi"; // ton fichier API
import Navbar from "../pages/Navbar";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors de la récupération des projets");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ paddingTop: "80px" }}>Chargement...</p>;
  if (error) return <p style={{ paddingTop: "80px", color: "red" }}>{error}</p>;

  return (
    <div style={{ paddingTop: "80px", textAlign: "center" }}>
      <Navbar />
      <h1>All Projects</h1>
      {projects.length === 0 ? (
        <p>Aucun projet trouvé.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {projects.map((project) => (
            <li key={project.id} style={styles.projectCard}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  projectCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px auto",
    maxWidth: "500px",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
  },
};
