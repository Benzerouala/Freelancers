import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    type: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    billing_address: "",
    notes: ""
  });

  useEffect(() => {
    if (id) {
      axios.get(`/clients/${id}`).then(res => setClient(res.data));
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id)
        await axios.put(`/clients/${id}`, client);
      else
        await axios.post("/clients", client);

      navigate("/dashboard/clients");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Client" : "Add Client"}</h2>

      <input
        placeholder="Name"
        value={client.name}
        onChange={e => setClient({ ...client, name: e.target.value })}
      />

      <input
        placeholder="Type"
        value={client.type}
        onChange={e => setClient({ ...client, type: e.target.value })}
      />

      <input
        placeholder="Contact Name"
        value={client.contact_name}
        onChange={e => setClient({ ...client, contact_name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={client.contact_email}
        onChange={e => setClient({ ...client, contact_email: e.target.value })}
      />

      <button type="submit">Save</button>
    </form>
  );
}
