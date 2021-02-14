import { config } from "../config";
const { SERVER } = config;

export const SceneAPIServices = {
  async getProjectScenes(projectId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene?project_id=${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const scenes = await response.json();
    return scenes;
  },
  async getSceneById(sceneId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene/${sceneId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const scene = await response.json();
    console.log(scene)
    return scene;
  },
  async addScene({ projectId, name, description }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async editScene({ projectId, name, description }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async removeScene(id) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async addItemToScene({ itemId, sceneId }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async removeItemFromScene({ itemId, sceneId }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
