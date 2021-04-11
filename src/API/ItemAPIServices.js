import { config } from "../config";
const { SERVER } = config;

export const ItemAPIServices = {
  async getProjectItems(projectId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/item?project_id=${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "server error");
    }
    return data;
  },
  async getAcquisitionItems(acquisitionId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${SERVER}/item?acquisition_id=${acquisitionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "server error");
    }
    return data;
  },
  async getSceneItems(sceneId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/item?scene_id=${sceneId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "server error");
    }
    return data;
  },
  async getItemById(id) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/item/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "server error");
    }
    return data;
  },
  async addItem({
    projectId,
    name,
    description,
    highEstimate,
    lowEstimate,
    quantity,
    source,
  }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/item`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: projectId,
        name,
        description,
        high_estimate: highEstimate,
        low_estimate: lowEstimate,
        quantity,
        source,
      }),
    });
    const data = response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "server error");
    }
  },
  async editItem({
    id,
    name,
    description,
    highEstimate,
    lowEstimate,
    location,
    quantity,
  }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/item/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        high_estimate: highEstimate,
        low_estimate: lowEstimate,
        location,
        quantity,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "server error");
    }
  },
  async removeItem(id) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/item/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("server error");
  },
};
