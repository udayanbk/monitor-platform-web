import api from "../api/axios";
import { apiRequest } from "./api-request";

export const getPaymentStatus = async (payload: Record<string, string>) =>
  apiRequest(api.post("/projects/renewal/payments", payload));

// export const get24HrPaymentStatus = async () =>
//   apiRequest(api.get("/projects/renewal/24HrPayments"));

export const getYesterdayPaymentStatus = async () =>
  apiRequest(api.get("/projects/renewal/yesterday"));

export const getRenewalSuccessLogs = async (payload: Record<string, string>) =>
  apiRequest(api.post("/projects/renewal/logs/success", payload));

export const getRenewalFailedLogs = async (payload: Record<string, string>) =>
  apiRequest(api.post("/projects/renewal/logs/fail", payload));

export const searchRenewalLogs = async (payload: Record<string, string>) =>
  apiRequest(api.post("/projects/renewal/logs/search", payload));

export const repushRenewalFailedPayments = async () =>
  apiRequest(api.post("/projects/renewal/failed/repush", {}, { timeout: 12000 }));
