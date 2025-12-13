import { useState, useEffect } from "react";
import { fetchProjects } from "../api/projectApi";
import { Card, Row, Col, Spinner, Badge } from "react-bootstrap";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    try {
      const res = await fetchProjects();
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (err.response?.status === 401) window.location.href = "/login";
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "completed":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div   >
      <h3 className="mb-4">Projects</h3>

      <Row xs={1} md={2} lg={3} className="g-4"  style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}>
        {projects.map((project) => (
          <Col key={project.id}>
            <Card className="h-100 shadow-lg border-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Card.Title className="mb-0">{project.name}</Card.Title>
                  <Badge bg={getStatusVariant(project.status)}>{project.status}</Badge>
                </div>
                <Card.Subtitle className="mb-2 text-muted">
                  Client ID: {project.client_id}
                </Card.Subtitle>
                <Card.Text>{project.description || "No description provided."}</Card.Text>
                <hr />
                <p><strong>Billing Type:</strong> {project.billing_type}</p>
                <p><strong>Hourly Rate:</strong> {project.hourly_rate || "-"}</p>
                <p><strong>Fixed Amount:</strong> {project.fixed_amount || "-"}</p>
                <p><strong>Start Date:</strong> {project.start_date || "-"}</p>
                <p><strong>End Date Estimated:</strong> {project.end_date_estimated || "-"}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
