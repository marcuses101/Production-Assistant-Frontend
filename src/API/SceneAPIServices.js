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
    return scene;
  },
  async addScene({ projectId, name, description, shootDate }) {
    const token = localStorage.getItem("accessToken");
    console.log({ projectId, name, description });
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
        shoot_date: shootDate,
      }),
    });
    const scene = await response.json();
    console.log(scene);
    return scene;
  },
  async editScene({ id, name, description, shootDate }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/scene/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, shootDate }),
    });
    const scene = await response.json();
    return scene;
  },
  async removeScene(id) {
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
