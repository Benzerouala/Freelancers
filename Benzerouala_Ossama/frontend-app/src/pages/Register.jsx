import { useState } from "react";
import { register } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    currency: "EUR",
    company_name: "",
    address: "",
    tax_id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Account created!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Error");
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
      <div className="card shadow p-4" style={{ width: "450px", marginTop: "40px" }}>
        <h3 className="text-center mb-3">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                className="form-control"
                placeholder="First name"
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              className="form-control"
              placeholder="Company"
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              placeholder="Address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tax ID</label>
            <input
              className="form-control"
              placeholder="Tax ID"
              onChange={(e) => setForm({ ...form, tax_id: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Currency</label>
            <select
              className="form-select"
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <button className="btn btn-success w-100 mt-2">Create Account</button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primary fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
