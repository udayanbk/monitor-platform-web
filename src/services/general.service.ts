import api from "../api/axios";

export const getHealth = async () => {
  const response = await api.get("/projects/status");

  return response.data;
};
