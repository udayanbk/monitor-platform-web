export interface Summary {
  totalPayments: number;
  totalSuccess: string;
  totalFailed: string;
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
  paSuccessPolicy: Record<string, number>;
  paFailPolicy: Record<string, number>;
  retailSuccessPolicy: Record<string, number>;
  retailFailPolicy: Record<string, number>;
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

export interface SearchLog {
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

export interface ServiceLog {
  counter: number;
  response_timestamp: string;
  request_json: Record<string, any>;
  response_json: Record<string, any>;
  apiService: string;
}

export interface SearchRenewalLog {
  logs: SearchLog;
  serviceLog: ServiceLog[];
}

export interface ReportData {
  started_at: string;
  trigger_type: string;
  status: string;
  channel: string;
}

interface ReportChannel {
  enabled: boolean;
}

export interface ReportChannels {
  EMAIL?: ReportChannel | boolean;
  WHATSAPP?: ReportChannel | boolean;
  SMS?: ReportChannel | boolean;
  CALL?: ReportChannel | boolean;
}

export interface Report {
  id: number;
  report_code: string;
  report_name: string;
  project: string;
  description?: string;
  mode: "SCHEDULED" | "MANUAL" | "PENDING";
  schedule?: string | null;
  channels: ReportChannels;
  enabled: number;
  update_setting: number;
  last_sent_at?: string | null;
  last_triggered_by?: "SCHEDULED" | "MANUAL" | null;
  last_channel?: string | null;
  last_status?: "SUCCESS" | "FAILED" | "IN_PROGRESS" | null;
  receiver_to?: string[];
  receiver_cc?: string[];
}

export interface SettingPayload {
  id: number;
  report_code: string;
  mode: "SCHEDULED" | "MANUAL" | "PENDING";
  schedule: string | undefined;
  subject: string;
  receiverTo: string[];
  receiverCc: string[];
}
