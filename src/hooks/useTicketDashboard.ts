import { useQuery } from "@tanstack/react-query";
import { getTicketStatistics } from "../services/nivaran.service";

export const useTicketDashboard = () => {
  return useQuery({
    queryKey: ["ticket-dashboard"],
    queryFn: getTicketStatistics,
    staleTime: 60 * 1000,
  });
};
