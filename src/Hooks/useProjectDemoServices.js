import { v4 as uuid } from "uuid";
import { DEMO_ACTIONS } from "../demoReducer";
import { useContext } from "react";
import { MainContext } from "../MainContext";

export function useProjectDemoServices() {
  const {
    demoData: { projects },
    demoDispatch,
  } = useContext(MainContext);

  return {
    async getProjects() {
      return projects
    },
    async getProjectById(projectId){
      return projects.find(({id})=>id===projectId)
    },
    async addProject({ name, description, budget }) {
      const project = { name, description, budget, id: uuid() };
      demoDispatch({ type: DEMO_ACTIONS.PROJECT_ADD, payload: project });
      return project;
    },
    async editProject({ name, description, budget, id }) {
      const project = { name, description, budget, id };
      demoDispatch({
        type: DEMO_ACTIONS.PROJECT_EDIT,
        payload: project,
      });
      return project;
    },
    async removeProject(id) {
      demoDispatch({ type: DEMO_ACTIONS.PROJECT_REMOVE, payload: id });
    },
  };
}
