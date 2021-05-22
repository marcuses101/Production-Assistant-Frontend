import { config } from "../config";
import { useContext } from "react";
import { DEMO_ACTIONS } from "../demoReducer";
import { MainContext } from "../MainContext";
import { randomIntId } from "../utils";
const { SERVER } = config;

export function useSceneServices() {
  const {
    demoData: { scenes },
    demoDispatch,
    isDemo,
  } = useContext(MainContext);

  return {
    async getProjectScenes(projectId) {
      if (isDemo) {
        return scenes.filter((scene) => parseInt(scene.projectId) === parseInt(projectId));
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/scene?project_id=${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const APIScenes = await response.json();
      return APIScenes;
    },

    async getSceneById(sceneId) {
      if (isDemo) {
        return scenes.find(({ id }) => {
          return id.toString() === sceneId.toString();
        });
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/scene/${sceneId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const APIScene = await response.json();
      return APIScene;
    },

    async addScene({ projectId, name, description, date }) {
      if (isDemo) {
        const scene = { projectId, name, description, id: randomIntId(), date};
        demoDispatch({ type: DEMO_ACTIONS.SCENE_ADD, payload: scene });
        return scene;
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/scene`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: projectId,
          name,
          description,
          date: date,
        }),
      });
      const scene = await response.json();
      return scene;
    },

    async editScene({ name, description, id, date }) {
      if (isDemo) {
        const scene = { name, description, id, date };
        demoDispatch({ type: DEMO_ACTIONS.SCENE_EDIT, payload: scene });
        return scene;
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/scene/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, date }),
      });

      const scene = await response.json();
      return scene;
    },

    async removeScene(id) {
      if (isDemo) {
        demoDispatch({ type: DEMO_ACTIONS.SCENE_REMOVE, payload: id });
        return;
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/scene/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("server error");
      }
    },

    async addItemToScene({ itemId, sceneId }) {
      if (isDemo) {
        demoDispatch({
          type: DEMO_ACTIONS.SCENE_ADD_ITEM,
          payload: { itemId, sceneId },
        });
        return;
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/scene`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    async removeItemFromScene({ itemId, sceneId }) {
      if (isDemo) {
        demoDispatch({
          type: DEMO_ACTIONS.SCENE_REMOVE_ITEM,
          payload: { itemId, sceneId },
        });
        return;
      }

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/scene`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  };
}
