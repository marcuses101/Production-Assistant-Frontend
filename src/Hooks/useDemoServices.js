import { useContext } from "react";
import { DEMO_ACTIONS } from "../demoReducer";
import { MainContext } from "../MainContext";

export function useDemoServices() {
  const { demoDispatch } = useContext(MainContext);

  return {
    addProject(project) {
      demoDispatch({ type: DEMO_ACTIONS.PROJECT_ADD, payload: project });
    },
  };
}
