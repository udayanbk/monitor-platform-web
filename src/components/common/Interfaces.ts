export interface Summary {
  totalPayments: number;
  totalSearch: number;
  successful: Record<string, number>;
  failed: Record<string, number>;
}

export interface TicketSummary {
  TotalTickets: number;
  Closed: number;
  initiated: number;
  discrepancy: number;
  Resolved: number;
}

export interface TicketStates {
  initiated: number;
  Closed: number;
  discrepancy: number;
  discrepancy_resolved: number;
}

export interface TicketActivity {
  lastHour: Record<string, number>;
  last24Hours: Record<string, number>;
  last30Days: Record<string, number>;
}

export interface PolicySummary {
  totalSearched: number;
  totalDownloads: number;
  successPolicy: Record<string, number>;
  failPolicy: Record<string, number>;
}
