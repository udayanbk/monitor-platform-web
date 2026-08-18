import { AxiosResponse } from "axios";

export const apiRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};
