import { useContext } from "react";
import { ProjectAPIServices } from "../API/ProjectAPIServices";
import { MainContext } from "../MainContext";
import { useProjectDemoServices } from "./useProjectDemoServices";

export function useProjectServices() {
  const ProjectDemoServices = useProjectDemoServices();
  const { isDemo } = useContext(MainContext);

  if (isDemo) return ProjectDemoServices;
  return ProjectAPIServices;
}
