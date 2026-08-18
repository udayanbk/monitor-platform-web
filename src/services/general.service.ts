import api from "../api/axios";
import { apiRequest } from "./api-request";

export const getHealth = async () => apiRequest(api.get("/projects/status"));

export const getAllReports = async (payload: Record<string, string | number>) =>
  apiRequest(api.post("/projects/all-reports", payload));
