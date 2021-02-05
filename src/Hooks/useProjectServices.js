import { useContext } from "react";
import { MainContext } from "../MainContext";
import { useDemoServices } from "./useDemoServices";

export function useProjectServices() {
  const demoServices = useDemoServices();

  const {
    isDemo,
    demoData: { projects: demoProjects },
  } = useContext(MainContext);


  return {
    async getProjects() {
      if (isDemo) return demoProjects;
    },
    async addProject({name,description,budget}){
      if (isDemo) {
        demoServices.addProject({name,description,budget});
        return;
      }
    },
    async editProject({name,description,budget}){

    }
  };
}
