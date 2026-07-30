import api from "../api/axios";

export const getProjectStatus = async () => {
  const response = await api.get("/projects/health");
  return response.data;
};
