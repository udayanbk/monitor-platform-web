import api from "../api/axios";
import { apiRequest } from "./api-request";

export const getPaymentStatus = async () => apiRequest(api.get("/projects/renewal/payments"));

export const getYesterdayPaymentStatus = async () =>
  apiRequest(api.get("/projects/renewal/yesterday"));

export const getRenewalSuccessLogs = async () =>
  apiRequest(api.get("/projects/renewal/logs/success"));

export const getRenewalFailedLogs = async () => apiRequest(api.get("/projects/renewal/logs/fail"));

export const searchRenewalLogs = async (payload: Record<string, string>) =>
  apiRequest(api.post("/projects/renewal/logs/search", payload));

export const repushRenewalFailedPayments = async () =>
  apiRequest(api.post("/projects/renewal/failed/repush", {}, { timeout: 12000 }));
