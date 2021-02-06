import { v4 as uuid } from "uuid";
import { DEMO_ACTIONS } from "../demoReducer";
import { useContext } from "react";
import { MainContext } from "../MainContext";
import { useDemoServices } from "./useDemoServices";

export function useSceneDemoServices() {
  const {
    demoData: { scenes },
    demoDispatch,
  } = useContext(MainContext);

  return {
    async getProjectScenes(projectId) {
      return scenes.filter((scene) => scene.projectId === projectId);
    },
    async addScene({ projectId, name, description }) {
      const scene = { projectId, name, description, id: uuid(), items:[] };
      demoDispatch({ type: DEMO_ACTIONS.SCENE_ADD, payload: scene });
      return scene;
    },

    async editScene({ projectId, name, description, id }) {
      const scene = { projectId, name, description, id };
      demoDispatch({ type: DEMO_ACTIONS.SCENE_EDIT, payload: scene });
      return scene;
    },
    async removeScene(id) {
      demoDispatch({ type: DEMO_ACTIONS.SCENE_REMOVE, payload: id });
    },

    async addItemToScene({itemId,sceneId}){
      demoDispatch({type:DEMO_ACTIONS.SCENE_ADD_ITEM, payload:{itemId,sceneId}})
    },

    async removeItemFromScene({itemId,sceneId}){
      demoDispatch({type:DEMO_ACTIONS.SCENE_REMOVE_ITEM, payload:{itemId,sceneId}})
    }
  };
}
