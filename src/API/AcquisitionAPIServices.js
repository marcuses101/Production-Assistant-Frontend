import { config } from "../config";
const { SERVER } = config;

export const AcquisitionAPIServices = {
  async getProjectAcquisitions(projectId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${SERVER}/acquisition?project_id=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const acquisitions = await response.json();
    if (!response.ok) {
      console.log(acquisitions)
    }
    return acquisitions;
  },
  async addAcquisition({ total, items = [], location }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/acquisition`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ total, items, location }),
    });
    const acquisition = await response.json();
    return acquisition;
  },
  async removeAcquisition(id) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/acquisition/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw "server error";
    }
  },
  async editAcquisition({ id, total, items, location }) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${SERVER}/acquisition`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ total, items, location }),
    });
    const acquisition = await response.json();
    return acquisition;
  },
};
