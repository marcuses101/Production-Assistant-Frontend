import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { MainContext } from "../MainContext";
import { DEMO_ACTIONS } from "../demoReducer";

export function useItemDemoServices() {
  const {
    demoData: { items, scenes },
    demoDispatch,
  } = useContext(MainContext);

  return {
    async getProjectItems(projectId) {
      return items.filter((item) => item.projectId === projectId);
    },

    async getSceneItems(sceneId) {
      const scene = scenes.find(({ id }) => sceneId === id);
      return items.filter(({ id }) => scene.items.includes(id));
    },

    async getItemById(itemId) {
      return items.find((item) => item.id.toString() === itemId.toString());
    },

    async addItem({
      projectId,
      name,
      description,
      highEstimate,
      lowEstimate,
      quantity,
    }) {
      const item = {
        id: uuid(),
        projectId,
        name,
        description,
        highEstimate,
        lowEstimate,
        quantity,
        acquired: false,
        actualCost: null,
      };
      demoDispatch({ type: DEMO_ACTIONS.ITEM_ADD, payload: item });
      return item;
    },

    async editItem({ projectId, id, name, description }) {
      demoDispatch({
        type: DEMO_ACTIONS.ITEM_EDIT,
        payload: { projectId, id, name, description },
      });
      return;
    },

    async removeItem(id) {
      demoDispatch({ type: DEMO_ACTIONS.ITEM_REMOVE, payload: id });
    },
  };
}
