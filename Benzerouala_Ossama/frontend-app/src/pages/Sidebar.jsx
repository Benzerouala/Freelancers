import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", height: "100vh" }}
    >
      <h4 className="text-center mb-4">Dashboard</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/clients">Clients</Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/projects">Projects</Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/tasks">Tasks</Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/notes">Notes</Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard/profile">Profile</Link>
        </li>

        <hr className="text-white" />

        <li className="nav-item mt-2">
          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="btn btn-danger w-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
