import { useState, useEffect } from "react";
import { fetchNotes, addNote } from "../api/notesApi";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    client_id: "",
    project_id: "",
    title: "",
    content: "",
  });

  const getNotes = async () => {
    try {
      const res = await fetchNotes();
      setNotes(res.data);
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
    getNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await addNote(form);
      getNotes();
      setShowModal(false);
      setForm({ client_id: "", project_id: "", title: "", content: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add note");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Notes</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Note
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Client ID</th>
            <th>Project ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.user_id}</td>
              <td>{note.client_id}</td>
              <td>{note.project_id}</td>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>{new Date(note.created_at).toLocaleString()}</td>
              <td>{new Date(note.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding note */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleAddNote}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {["client_id", "project_id", "title", "content"].map((key) => (
              <Form.Group className="mb-2" key={key}>
                <Form.Label>{key.replace("_", " ")}</Form.Label>
                <Form.Control
                  type={key.includes("id") ? "number" : "text"}
                  as={key === "content" ? "textarea" : "input"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={key !== "content" ? true : false}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Note
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
