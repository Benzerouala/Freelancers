import { useState, useEffect } from "react";
import { fetchProjects, addProject } from "../api/projectApi";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    client_id: "",
    name: "",
    description: "",
    billing_type: "",
    hourly_rate: "",
    fixed_amount: "",
    status: "",
    start_date: "",
    end_date_estimated: "",
  });

  const getProjects = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await addProject(form);
      getProjects();
      setShowModal(false);
      setForm({
        client_id: "",
        name: "",
        description: "",
        billing_type: "",
        hourly_rate: "",
        fixed_amount: "",
        status: "",
        start_date: "",
        end_date_estimated: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add project");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Projects</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Project
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Billing Type</th>
            <th>Hourly Rate</th>
            <th>Fixed Amount</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date Estimated</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.client_id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.billing_type}</td>
              <td>{project.hourly_rate}</td>
              <td>{project.fixed_amount}</td>
              <td>{project.status}</td>
              <td>{project.start_date}</td>
              <td>{project.end_date_estimated}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding project */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddProject}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.keys(form).map((key) => (
              <Form.Group className="mb-2" key={key}>
                <Form.Label>{key.replace("_", " ")}</Form.Label>
                <Form.Control
                  type={["hourly_rate", "fixed_amount", "client_id"].includes(key) ? "number" : key.includes("date") ? "date" : "text"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={key === "name" || key === "client_id"}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Project
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
