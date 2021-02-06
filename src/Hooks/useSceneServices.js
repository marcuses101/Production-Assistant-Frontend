import { useContext } from "react";
import { SceneAPIServices } from "../API/SceneAPIServices";
import { MainContext } from "../MainContext";
import { useSceneDemoServices } from "./useSceneDemoServices";

export function useSceneServices() {
  const { isDemo } = useContext(MainContext);
  const SceneDemoServices = useSceneDemoServices();
  if (isDemo) return SceneDemoServices;
  return SceneAPIServices;
}
