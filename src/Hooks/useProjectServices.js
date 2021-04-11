import { useContext } from "react";
import { MainContext } from "../MainContext";
import { config } from "../config";
import { v4 as uuid } from "uuid";
import { DEMO_ACTIONS } from "../demoReducer";
const { SERVER } = config;

export function useProjectServices() {
  const {
    isDemo,
    demoData: { projects },
    demoDispatch,
  } = useContext(MainContext);

  return {
    async getProjects() {
      if (isDemo) {
        return projects;
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/project`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const APIProjects = await response.json();
      if (!response.ok) throw APIProjects?.error?.message;
      return APIProjects;
    },

    async getProjectById(projectId) {
      if (isDemo) {
        return projects.find(({ id }) => id === projectId);
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/project/${projectId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const APIProject = await response.json();
      return APIProject;
    },
    async addProject({ name, description, budget }) {

      if (isDemo) {
        const project = { name, description, budget, id: uuid() };
        demoDispatch({ type: DEMO_ACTIONS.PROJECT_ADD, payload: project });
        return project;
      }

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
    async editProject({ name, description, budget, id }) {
      if (isDemo) {
        const project = { name, description, budget, id };
        demoDispatch({
          type: DEMO_ACTIONS.PROJECT_EDIT,
          payload: project,
        });
        return project;
      }

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
      return project;

    },
    async removeProject(id) {
      
      if (isDemo) {
        demoDispatch({ type: DEMO_ACTIONS.PROJECT_REMOVE, payload: id });
        return;
      }

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
}
