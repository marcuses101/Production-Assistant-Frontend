import { useContext } from "react";
import { MainContext } from "../MainContext";
import { DEMO_ACTIONS } from "../demoReducer";
import { randomIntId } from "../utils";
import { config } from "../config";
const { SERVER } = config;

export function useAcquisitionServices() {
  const {
    isDemo,
    demoDispatch,
    demoData: { acquisitions },
  } = useContext(MainContext);
  return {
    async getProjectAcquisitions(projectId = "") {
      if (isDemo) {
        return acquisitions.filter(
          (entry) => entry?.projectId?.toString() === projectId.toString()
        );
      }
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${SERVER}/acquisition?project_id=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const serverAcquisitions = await response.json();
      if (!response.ok) {
        throw new Error(serverAcquisitions?.error?.message || "server error");
      }
      return serverAcquisitions;
    },
    async addAcquisition({ total, projectId, acquisitionType }) {
      if (isDemo) {
        const newAcquisition = {
          total,
          acquisitionType,
          id: randomIntId(),
          projectId,
        };
        demoDispatch({
          type: DEMO_ACTIONS.ACQUISITION_ADD,
          payload: newAcquisition,
        });
        return newAcquisition;
      }
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/acquisition`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          total,
          project_id: projectId,
          acquisition_type: acquisitionType,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.error?.message || "server error");

      return data;
    },
    async removeAcquisition(id) {
      if (isDemo) {
        demoDispatch({ type: DEMO_ACTIONS.ACQUISITION_REMOVE, payload: id });
        return;
      }
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/acquisition/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error?.message || 'server error');
      }
    },
    async editAcquisition({ id, total, acquisitionType }) {
      if (isDemo) {
        demoDispatch({
          type: DEMO_ACTIONS.ACQUISITION_EDIT,
          payload: { id, total, acquisitionType },
        });
        return;
      }
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SERVER}/acquisition/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          total_cost: total,
          acquisition_type: acquisitionType,
        }),
      });
      const acquisition = await response.json();

      if (!response.ok) throw new Error(acquisition?.error?.message || 'server Error')

      return acquisition;
    },
  };
}
