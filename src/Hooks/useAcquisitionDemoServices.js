import { useContext } from "react";
import { MainContext } from "../MainContext";
import { DEMO_ACTIONS } from "../demoReducer";
import { v4 as uuid } from "uuid";

export function useAcquisitionDemoServices() {
  const {
    demoDispatch,
    demoData: { acquisitions },
  } = useContext(MainContext);
  return {
    async getProjectAcquisitions(projectId = "") {
      return acquisitions.filter(
        (entry) => entry?.projectId?.toString() === projectId.toString()
      );
    },
    async addAcquisition({ totalCost, items = [], location, projectId }) {
      const newAcquisition = {
        totalCost,
        items,
        location,
        id: uuid(),
        projectId,
      };
      demoDispatch({
        type: DEMO_ACTIONS.ACQUISITION_ADD,
        payload: newAcquisition,
      });
      return newAcquisition;
    },
    async removeAcquisition(id) {
      demoDispatch({ type: DEMO_ACTIONS.ACQUISITION_REMOVE, payload: id });
    },
    async editAcquisition({ id, totalCost, items, location }) {
      demoDispatch({
        type: DEMO_ACTIONS.ACQUISITION_EDIT,
        payload: { id, totalCost, items, location },
      });
    },
  };
}