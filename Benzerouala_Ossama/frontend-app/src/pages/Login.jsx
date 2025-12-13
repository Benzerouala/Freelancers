import { useState } from "react";
import { login } from "../api/authApi";
import { saveAuth } from "../utils/auth";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      saveAuth(res.data);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Navbar/>
      <div className="card shadow p-4" style={{ width: "400px", marginTop: "80px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="btn btn-primary w-100 mt-2">Login</button>
        </form>

        {/* Register link */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary fw-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
