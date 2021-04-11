import { config } from "../config";
const { SERVER } = config;

export const ItemAcquisitionAPIServices = {
  async getProjectEntries(projectId) {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${SERVER}/item-acquisition?project_id=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "server error");
    }
    return data;
  },
};

