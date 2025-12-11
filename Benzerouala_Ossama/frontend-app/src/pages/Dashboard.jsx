import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getUser } from "../utils/auth";

export default function Dashboard() {
  const user = getUser();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#f1f3f5",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          className="p-4"
          style={{
            borderBottom: "1px solid #dee2e6",
            backgroundColor: "#fff",
          }}
        >
          <h2 className="fw-bold mb-0">Welcome, {user?.first_name} 👋</h2>
        </div>

        {/* Page content */}
        <div className="p-4" style={{ flex: 1 }}>
          <div
            className="bg-white shadow-sm rounded p-4"
            style={{ minHeight: "80vh" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
