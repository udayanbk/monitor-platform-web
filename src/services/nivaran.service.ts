import api from "../api/axios";
import { SettingPayload } from "../components/common/Interfaces";

export const getTicketStatistics = async () => {
  const response = await api.get("/projects/nivaran/ticket-statistics");
  console.log("response-ticket", response);
  return response.data;
};

export const getPolicyStatistics = async () => {
  const response = await api.get("/projects/nivaran/policy-statistics");
  console.log("response-ticket", response);
  return response.data;
};

export const saveReportSetting = async (payload: SettingPayload) => {
  const response = await api.post("/projects/reports/update-setting", payload);
  console.log("response-ticket", response);
  return response.data;
};
