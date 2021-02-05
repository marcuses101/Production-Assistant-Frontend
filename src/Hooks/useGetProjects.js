import { useContext } from "react";
import { MainContext } from "../MainContext";

export function useGetProjects() {
  const { isDemo, demoData:{projects} } = useContext(MainContext);
  return async function () {
    if (isDemo) return projects
  };
}
