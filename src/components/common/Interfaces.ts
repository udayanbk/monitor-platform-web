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

export interface RecentRenewalLog {
  updated_at: string;
  policy_no: string;
  renewal_quote_number: string;
  insured_name: string;
  target_core_system: string;
  product_code: string;
  amount: number;
  status_message: string;
}

export interface SearchRenewalLog {
  updated_at: string;
  policy_no: string;
  renewal_quote_number: string;
  insured_name: string;
  target_core_system: string;
  product_code: string;
  amount: number;
  status_message: string;
  renewals_id: string;
  policy_type: string;
  payment_flag: number;
  con: string;
  billdesk_recon_msg: string;
  renewal_notice_status: string;
}
