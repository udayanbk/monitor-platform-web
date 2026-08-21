import React, { useEffect, useState } from "react";
import { Box, Pagination, TextField, Typography } from "@mui/material";
import { getAllReports, updateReportMode } from "../../../services/general.service";
import ReportsTable from "./ReportsTable";

interface ReportChannel {
  enabled: boolean;
}

interface ReportChannels {
  EMAIL?: ReportChannel;
  WHATSAPP?: ReportChannel;
  SMS?: ReportChannel;
  CALL?: ReportChannel;
}

interface Report {
  id: number;
  report_code: string;
  report_name: string;
  project: string;
  description?: string;
  mode: "SCHEDULED" | "MANUAL";
  schedule?: string | null;
  channels: ReportChannels;
  enabled: number;
  last_sent_at?: string | null;
  last_triggered_by?: "SCHEDULED" | "MANUAL" | null;
  last_channel?: string | null;
  last_status?: "SUCCESS" | "FAILED" | "IN_PROGRESS" | null;
}

const DailyReports = () => {
  const limit = 7;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reports, setReports] = useState<Report[] | null>(null);
  const [apiCallReportId, setApiCallReportId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getReportsData();
  }, []);

  useEffect(() => {
    getReportsData();
  }, [searchText, page, limit]);

  const getReportsData = async () => {
    const reports = await getAllReports({
      searchText,
      page,
      limit,
    });
    console.log("reports", reports);
    if (reports?.data) {
      setReports(reports.data);
      setTotalPages(reports.pagination.totalPages);
    }
  };

  const handleSendReport = async (reportId: number) => {
    setApiCallReportId(reportId);
    console.log("Sending report:", reportId);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setApiCallReportId(null);
    console.log("Report sent:", reportId);
  };

  const onSearchTextChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const v = e?.target?.value;
    if (v.length > 2) {
      setSearchText(v);
      setPage(1);
    } else {
      setSearchText("");
      setPage(1);
    }
  };

  const handleModeChange = async (mode: string) => {
    try {
      console.log("sending report id", apiCallReportId);
      const respCall = await updateReportMode({
        reportId: apiCallReportId ?? "",
        mode,
      });
      console.log("respCall", respCall);
      await getReportsData();
    } catch (error) {
      console.error("Failed to update report mode:", error);
    } finally {
      setApiCallReportId(null);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3}>
          Reports & Notifications
        </Typography>
        <TextField
          size="small"
          placeholder="Search..."
          sx={{ width: "400px", paddingBottom: "20PX" }}
          onChange={onSearchTextChange}
        />
      </Box>

      {reports && (
        <ReportsTable
          reports={reports}
          setApiCallReportId={setApiCallReportId}
          onSend={handleSendReport}
          onHistory={(report) => {
            console.log("History:", report);
          }}
          handleModeChange={handleModeChange}
        />
      )}
      <Pagination
        size="large"
        count={totalPages}
        page={page}
        color="primary"
        sx={{ padding: "10px", display: "flex", justifyContent: "center" }}
        onChange={(_, value) => setPage(value)}
      />
    </Box>
  );
};

export default DailyReports;
