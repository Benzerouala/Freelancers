import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../pages/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
        <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >

    
      <div
        className="container-fluid px-0 d-flex justify-content-center align-items-center"
        style={{ minHeight: "calc(100vh - 70px)", marginTop: "70px" }}
      >
        <div
          className="card shadow border-0 p-5 text-center"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h1 className="fw-bold mb-3">
            Bienvenue sur Mon Application
          </h1>

          <p className="text-muted mb-4">
            Gérez vos clients, projets, tâches et notes facilement depuis une
            seule plateforme.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn btn-primary px-4">
              Se connecter
            </Link>

            <Link to="/register" className="btn btn-outline-primary px-4">
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
