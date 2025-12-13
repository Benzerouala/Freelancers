import { useEffect, useState } from "react"
import { fetchProjects } from "../api/projectApi"
import {
  fetchTasksByProject,
  addTask,
  deleteTask,
  updateTaskStatus
} from "../api/taskApi"

export default function Tasks() {
  const [projects, setProjects] = useState([])
  const [projectId, setProjectId] = useState("")
  const [tasks, setTasks] = useState([])

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    due_date: "",
    estimated_hours: ""
  })

  /* ================= PROJECTS ================= */
  useEffect(() => {
    fetchProjects().then(res => setProjects(res.data))
  }, [])

  /* ================= TASKS ================= */
  useEffect(() => {
    if (!projectId) return
    loadTasks()
  }, [projectId])

  const loadTasks = async () => {
    const res = await fetchTasksByProject(projectId)
    setTasks(res.data)
  }

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!projectId) return alert("Select a project")

    await addTask(projectId, form)
    setForm({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      due_date: "",
      estimated_hours: ""
    })
    loadTasks()
  }

  /* ================= ACTIONS ================= */
  const handleDelete = async (id) => {
    await deleteTask(id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status)
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status } : t
    ))
  }

  /* ================= UI ================= */
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tasks</h2>

      {/* PROJECT SELECT */}
      <div className="mb-4">
        <select
          className="form-select"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">-- Select project --</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* ADD TASK */}
      {projectId && (
        <form onSubmit={handleSubmit} className="mb-4">
          <h3 className="mb-3">Add Task</h3>

          <div className="mb-3">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3 row">
            <div className="col">
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="col">
              <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col">
              <input
                type="number"
                name="estimated_hours"
                placeholder="Hours"
                value={form.estimated_hours}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">➕ Add</button>
        </form>
      )}

      {/* TASK LIST */}
      <div className="row">
        {tasks.map(task => (
          <div key={task.id} className="col-12 mb-3">
            <div className="card">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title mb-1">{task.title}</h5>
                  <p className="card-text mb-1">Priority: {task.priority}</p>
                  <div className="mb-1">
                    Status:{" "}
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="form-select d-inline-block w-auto"
                    >
                      <option value="todo">Todo</option>
                      <option value="in_progress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task.id)}
                >
                  ❌
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
