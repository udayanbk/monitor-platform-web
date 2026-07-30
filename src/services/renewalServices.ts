import api from "../api/axios";

export const getPaymentStatus = async () => {
  const response = await api.get("/projects/renewal/payments");
  console.log("response-renewal", response);
  return response.data;
};
