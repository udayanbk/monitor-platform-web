import api from "../api/axios";

export const getTicketStatistics = async () => {
  const response = await api.get("/projects/nivaran/ticket-statistics");
  console.log("response-ticket", response);
  return response.data;
};
