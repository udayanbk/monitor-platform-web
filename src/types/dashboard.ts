export interface TicketStats {
  current: Record<string, number>;
  lastHour: Record<string, number>;
  last24Hours: Record<string, number>;
  last30Days: Record<string, number>;
}
