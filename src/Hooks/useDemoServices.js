import { useContext } from "react";
import { DEMO_ACTIONS } from "../demoReducer";
import { MainContext } from "../MainContext";
import { v4 as uuid } from "uuid";

export function useDemoServices() {
  const { demoDispatch } = useContext(MainContext);

  return {

    removeItemFromScene({ sceneId, itemId }) {
      demoDispatch({
        type: DEMO_ACTIONS.SCENE_ITEM_REMOVE,
        payload: { sceneId, itemId },
      });
    },
  };
}
