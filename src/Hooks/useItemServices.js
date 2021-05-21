import { useContext } from "react";
import { MainContext } from "../MainContext";
import { DEMO_ACTIONS } from "../demoReducer";
import { randomIntId } from "../utils";

export function useItemServices() {
  const {
    demoData: { items, sceneItem },
    demoDispatch,
  } = useContext(MainContext);

  return {
    async getProjectItems(projectId) {
      return items.filter((item) => item.projectId.toString() === projectId.toString());
    },

    async getSceneItems(sceneId) {
      console.log(sceneId)
      const sceneItems = sceneItem.reduce((itemsArray,{sceneId:scene_id,itemId})=>{
          return (sceneId===scene_id)?[...itemsArray,items.find(({id})=>id===itemId)]:itemsArray;
      },[]);
      return sceneItems
    },

    async getItemById(itemId) {
      return items.find((item) => item.id.toString() === itemId.toString());
    },

    async addItem({
      projectId,
      name,
      description,
      quantity,
      source
    }) {
      const item = {
        id: randomIntId(),
        projectId,
        name,
        description,
        quantity,
        source,
      };
      demoDispatch({ type: DEMO_ACTIONS.ITEM_ADD, payload: item });
      return item;
    },

    async editItem({
      projectId,
      id,
      name,
      description,
      acquisitionId,
      acquired
    }) {
      demoDispatch({
        type: DEMO_ACTIONS.ITEM_EDIT,
        payload: {
          projectId,
          id,
          name,
          description,
          acquisitionId,
          acquired
        },
      });
      return;
    },
    async removeItem(id) {
      demoDispatch({ type: DEMO_ACTIONS.ITEM_REMOVE, payload: id });
    },
  };
}
