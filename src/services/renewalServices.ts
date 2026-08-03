import api from "../api/axios";

export const getPaymentStatus = async () => {
  const response = await api.get("/projects/renewal/payments");
  return response.data;
};

export const getRenewalSuccessLogs = async () => {
  const response = await api.get("/projects/renewal/logs/success");
  return response.data;
};

export const getRenewalFailedLogs = async () => {
  const response = await api.get("/projects/renewal/logs/fail");
  return response.data;
};
