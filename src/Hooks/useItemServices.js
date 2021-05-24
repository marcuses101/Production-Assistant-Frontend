import { useContext } from "react";
import { MainContext } from "../MainContext";
import { DEMO_ACTIONS } from "../demoReducer";
import { randomIntId } from "../utils";
import { config } from "../config";
const { SERVER } = config;

export function useItemServices() {
  const {
    demoData: { items, sceneItem },
    demoDispatch,
    isDemo,
  } = useContext(MainContext);

  return {
    async getProjectItems(projectId) {
      if (isDemo) {
        return items.filter(
          (item) => item.projectId.toString() === projectId.toString()
        );
      }

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
    async getAcquisitionItems(acquisitionId){
      if (isDemo) {
        console.error('Demo mode of getAcquisitionItems not implemented');
      }
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
      if (isDemo) {
        const sceneItems = sceneItem.reduce(
          (itemsArray, { sceneId: scene_id, itemId }) => {
            return sceneId === scene_id
              ? [...itemsArray, items.find(({ id }) => id === itemId)]
              : itemsArray;
          },
          []
        );
        return sceneItems;
      }
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

    async getItemById(itemId) {
      if (isDemo) {
        return items.find((item) => item.id.toString() === itemId.toString());
      }
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/item/${itemId}`, {
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
      quantity,
      acquisitionId = null,
      acquired = false,
    }) {
      const item = {
        id: randomIntId(),
        projectId,
        name,
        description,
        quantity,
        acquisitionId,
        acquired,
      };
      if (isDemo) {
        demoDispatch({ type: DEMO_ACTIONS.ITEM_ADD, payload: item });
        return item;
      }
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
          quantity,
          acquisition_id: acquisitionId,
          acquired,
        }),
      });
      const data = response.json();
      if (!response.ok) {
        throw new Error(data?.error?.message || "server error");
      }
      return data;
    },

    async editItem({
      projectId,
      id,
      name,
      description,
      quantity,
      acquisitionId,
      acquired,
    }) {
      const item = {
            projectId,
            id,
            name,
            description,
            quantity,
            acquisitionId,
            acquired,
          }
      if (isDemo) {
        demoDispatch({
          type: DEMO_ACTIONS.ITEM_EDIT,
          payload: item,
        });
        return;
      }
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
          acquisition_id: acquisitionId,
          acquired,
          quantity
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error?.message || "server error");
      }
    },
    async removeItem(id) {
      if (isDemo) {
        demoDispatch({ type: DEMO_ACTIONS.ITEM_REMOVE, payload: id });
        return;
      }
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
}
