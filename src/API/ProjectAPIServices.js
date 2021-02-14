import { config } from "../config";
const { SERVER } = config;

export const ProjectAPIServices = {
  async getProjects() {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/project`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const projects = await response.json();
    return projects;
  },
  async getProjectById(projectId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/project/${projectId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const project = await response.json();
    return project;
  },
  async addProject({ name, budget, description }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/project`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, budget, description }),
    });
    const project = await response.json();
    return project;
  },
  async editProject({ id, name, budget, description }) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${SERVER}/project/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, budget, description }),
    });
    const project = await response.json();
    console.log(project)
    return project;
  },
  async deleteProject({ id }) {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${SERVER}/project/${id}`, {
      method: "DELETE",
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('server error')
  },
};
