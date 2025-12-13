import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../pages/Navbar";

export default function HomePage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", paddingTop: "70px" }}>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Bienvenue sur Mon Application</h1>
        <p>Gérez vos clients, projets, tâches et notes facilement.</p>
        <div style={{ marginTop: "20px" }}>
          <Link to="/login" style={styles.button}>
            Se connecter
          </Link>
          <Link to="/register" style={styles.button}>
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    margin: "0 10px",
  },
};
