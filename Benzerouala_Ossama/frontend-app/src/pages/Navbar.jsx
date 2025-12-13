// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          MyApp
        </Link>
      </div>

      <div style={styles.menu}>
        <Link to="/" style={styles.link}>
          Accueil
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>

        {/* Lien vers le composant AllProjects */}
         <Link to="/all-projects" style={styles.link}>
          All Projects
        </Link> 
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "white",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
};
