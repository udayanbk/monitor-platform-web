import React, { useEffect, useState } from "react";
import { Box, Pagination, TextField, Typography } from "@mui/material";
import {
  getAllReports,
  getSentReportLog,
  sendReportNow,
  updateReportMode,
} from "../../../services/general.service";
import ReportsTable from "./ReportsTable";
import { useSnackbar } from "../../../context/SnackbarContext";

interface ReportChannel {
  enabled: boolean;
}

type OkFunction = "UpdateMode" | "SendReport" | "GetLog";
type UpdatingMode = "MANUAL" | "SCHEDULED" | "PENDING";

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

type ChannelType = "EMAIL" | "CALL" | "WHATSAPP" | "SMS";

const DailyReports = () => {
  const { showSnackbar } = useSnackbar();
  const limit = 7;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reports, setReports] = useState<Report[] | null>(null);
  const [apiCallReportCode, setApiCallReportCode] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [updatingMode, setUpdatingMode] = useState<UpdatingMode>("PENDING");
  const [handleOKFunction, setHandleOKFunction] = useState<OkFunction>("GetLog");
  const [channelType, setChannelType] = useState<ChannelType>("EMAIL");

  // const [sentReportsData, setSentReportsData] = useState<ReportData[]>([]);

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
    const tableData = await getSentReportLog({ reportCode: "18" });
    console.log("tableData", tableData);
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

  const handleActionFunction = async () => {
    console.log("handleActionFunction function starts");
    console.log("handleOKFunction", handleOKFunction);
    console.log("apiCallReportCode", apiCallReportCode);
    console.log("channelType", channelType);
    try {
      let responseCall;
      console.log("handleOKFunction", handleOKFunction);
      if (handleOKFunction === "UpdateMode" && apiCallReportCode && updatingMode) {
        console.log("In mode - UpdateMode");
        responseCall = await updateReportMode({
          reportCode: apiCallReportCode ?? "",
          mode: updatingMode,
        });
        if (responseCall?.success) {
          showSnackbar("success", responseCall?.message ?? "Success");
          await getReportsData();
        } else {
          showSnackbar("error", responseCall?.message ?? "Failure");
        }
      } else if (handleOKFunction === "SendReport" && apiCallReportCode && channelType) {
        console.log("In mode - SendReport");
        responseCall = await sendReportNow({
          reportCode: apiCallReportCode,
          channelType,
        });
        if (responseCall?.success) {
          showSnackbar("success", responseCall?.message ?? "Success");
          await getReportsData();
        } else {
          showSnackbar("error", responseCall?.message ?? "Failure");
        }
      }
      console.log("responseCall", responseCall);
    } catch (error) {
      console.error("Failed to update report mode:", error);
    } finally {
      setOpenModal(false);
      setApiCallReportCode(null);
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
          setApiCallReportCode={setApiCallReportCode}
          onHistory={(report) => {
            console.log("History:", report);
          }}
          updatingMode={updatingMode}
          setUpdatingMode={setUpdatingMode}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setHandleOKFunction={setHandleOKFunction}
          handleActionFunction={handleActionFunction}
          setChannelType={setChannelType}
          channelType={channelType}
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
