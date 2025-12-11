import { useState, useEffect } from "react";
import { fetchClients, addClient } from "../api/clientApi";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    billing_address: "",
    notes: "",
  });

  // Fetch clients
  const getClients = async () => {
    try {
      const res = await fetchClients();
      setClients(res.data);
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
    getClients();
  }, []);

  // Add client
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await addClient(form);
      getClients();
      setShowModal(false);
      setForm({
        name: "",
        type: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        billing_address: "",
        notes: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add client");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Clients</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Client
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Contact Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Billing Address</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.type}</td>
              <td>{client.contact_name}</td>
              <td>{client.contact_email}</td>
              <td>{client.contact_phone}</td>
              <td>{client.billing_address}</td>
              <td>{client.notes}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddClient}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.keys(form).map((key) => (
              <Form.Group className="mb-2" key={key}>
                <Form.Label>{key.replace("_", " ")}</Form.Label>
                <Form.Control
                  type={key === "contact_email" ? "email" : "text"}
                  as={key === "notes" ? "textarea" : undefined}
                  rows={key === "notes" ? 2 : undefined}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={key === "name"}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Client
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
