import api from "../api/axios";

export const getProjectStatus = async () => {
  const response = await api.get("/dashboard/summary");
  return response.data;
};