import React, { useEffect, useState } from "react";
import { Box, Pagination, TextField, Typography } from "@mui/material";
import { getAllReports, sendReportNow, updateReportMode } from "../../../services/general.service";
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

const DailyReports = () => {
  const { showSnackbar } = useSnackbar();
  const limit = 7;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reports, setReports] = useState<Report[] | null>(null);
  const [apiCallReportId, setApiCallReportId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [updatingMode, setUpdatingMode] = useState<UpdatingMode>("PENDING");
  const [handleOKFunction, setHandleOKFunction] = useState<OkFunction>("GetLog");

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
    if (apiCallReportId) {
      try {
        let responseCall;
        if (handleOKFunction === "UpdateMode") {
          responseCall = await updateReportMode({
            reportId: apiCallReportId ?? "",
            mode: updatingMode,
          });
          if (responseCall?.success) {
            showSnackbar("success", responseCall?.message ?? "Success");
            await getReportsData();
          } else {
            showSnackbar("error", responseCall?.message ?? "Failure");
          }
        } else if (handleOKFunction === "SendReport") {
          responseCall = await sendReportNow({ reportId: apiCallReportId });
          if (responseCall?.success) {
            showSnackbar("success", responseCall?.message ?? "Success");
          } else {
            showSnackbar("error", responseCall?.message ?? "Failure");
          }
        }
        console.log("responseCall", responseCall);
      } catch (error) {
        console.error("Failed to update report mode:", error);
      } finally {
        setOpenModal(false);
        setApiCallReportId(null);
      }
    }
  };

  // const handleModeChange = async (mode: string) => {
  //   try {
  //     console.log("sending report id", apiCallReportId);
  //     if (handleOKFunction === "UpdateMode") {
  //       const respCall = await updateReportMode({
  //         reportId: apiCallReportId ?? "",
  //         mode,
  //       });
  //       console.log("respCall", respCall);
  //       if (respCall?.success) {
  //         showSnackbar("success", respCall?.message ?? "Success");
  //         await getReportsData();
  //       } else {
  //         showSnackbar("error", respCall?.message ?? "Failure");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to update report mode:", error);
  //   } finally {
  //     setOpenModal(false);
  //     setApiCallReportId(null);
  //   }
  // };

  // const handleSendReport = async () => {
  //   try {
  //     console.log("apiCallReportId", apiCallReportId);
  //     if (apiCallReportId && handleOKFunction === "SendReport") {
  //       const sendReportCall = await sendReportNow({ reportId: apiCallReportId });
  //       console.log("sendReportCall", sendReportCall);
  //       if (sendReportCall.success) {
  //         showSnackbar("success", sendReportCall?.message ?? "Success");
  //       } else {
  //         showSnackbar("error", sendReportCall?.message ?? "Failure");
  //       }
  //     }
  //   } catch (error) {
  //   } finally {
  //     setOpenModal(false);
  //   }
  // };

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
          onHistory={(report) => {
            console.log("History:", report);
          }}
          updatingMode={updatingMode}
          setUpdatingMode={setUpdatingMode}
          // handleModeChange={handleModeChange}
          // handleSendReport={handleSendReport}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setHandleOKFunction={setHandleOKFunction}
          handleActionFunction={handleActionFunction}
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
