const Project = require("../models/project.model")

class ProjectService {
  static async createProject(userId, projectData) {
    return await Project.create({ user_id: userId, ...projectData })
  }

  static async getProject(projectId, userId) {
    const project = await Project.findById(projectId, userId)
    if (!project) {
      throw new Error("Project not found")
    }
    return project
  }

  static async getProjectsByUser(userId, limit = 10, offset = 0) {
    return await Project.findByUserId(userId, limit, offset)
  }

  static async updateProject(projectId, userId, projectData) {
    await Project.update(projectId, userId, projectData)
  }

  static async deleteProject(projectId, userId) {
    await Project.delete(projectId, userId)
  }
}

module.exports = ProjectService
