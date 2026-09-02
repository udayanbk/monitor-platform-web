import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import SmsIcon from "@mui/icons-material/Sms";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { getChannelStyles, getModeStyles, getProjectStyles } from "./styles";
import { ReactElement, useState } from "react";
import SlideDialog from "../../common/SlideDialog";
import { ReportData } from "../../common/Interfaces";
import { getSentReportLog } from "../../../services/general.service";

interface ReportChannel {
  enabled: boolean;
}

type OkFunction = "UpdateMode" | "SendReport" | "GetLog";
type UpdatingMode = "MANUAL" | "SCHEDULED" | "PENDING";

interface ReportChannels {
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
  last_sent_at?: string | null;
  last_triggered_by?: "SCHEDULED" | "MANUAL" | null;
  last_channel?: string | null;
  last_status?: "SUCCESS" | "FAILED" | "IN_PROGRESS" | null;
}

type ChannelType = "EMAIL" | "CALL" | "WHATSAPP" | "SMS";

interface ReportsTableProps {
  reports: Report[];
  setApiCallReportId: (id: number | null) => void;
  onHistory?: (report: Report) => void;
  // handleModeChange: (mode: string) => void;
  openModal: boolean;
  setOpenModal: (x: boolean) => void;
  setHandleOKFunction: (x: OkFunction) => void;
  updatingMode: string;
  setUpdatingMode: (x: UpdatingMode) => void;
  handleActionFunction: (x: number) => void;
  channelType: ChannelType;
  setChannelType: (x: ChannelType) => void;
  // sentReportsData: ReportData[];
}

const getChannelIcon = (channel: ChannelType): ReactElement | undefined => {
  switch (channel) {
    case "EMAIL":
      return <EmailIcon fontSize="large" />;
    case "SMS":
      return <SmsIcon fontSize="large" />;
    case "WHATSAPP":
      return <WhatsAppIcon fontSize="large" />;
    case "CALL":
      return <CallIcon fontSize="large" />;
    default:
      return undefined;
  }
};

const getChannelActionText = (channel: ChannelType): string => {
  switch (channel) {
    case "EMAIL":
      return "Send Email";

    case "WHATSAPP":
      return "Send WhatsApp";

    case "SMS":
      return "Send SMS";

    case "CALL":
      return "Call Now";

    default:
      return "";
  }
};

const ReportsTable = ({
  reports,
  setApiCallReportId,
  // handleModeChange,
  openModal,
  setOpenModal,
  setHandleOKFunction,
  setUpdatingMode,
  handleActionFunction,
  channelType,
  setChannelType,
  // sentReportsData,
}: ReportsTableProps) => {
  const [modeAnchorEl, setModeAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  // const [updateMode, setUpdateMode] = useState<string>("");
  const [modeMenuOpen, setmodeMenuOpen] = useState<boolean>(false);
  const [headerText, setHeaderText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [sentReportsData, setSentReportsData] = useState<ReportData[]>([]);

  const getEnabledChannels = (channels: ReportChannels) => {
    return Object.entries(channels ?? {})
      .filter(([, config]) => {
        if (typeof config === "boolean") {
          return config;
        }

        return config?.enabled === true;
      })
      .map(([channel]) => channel);
  };

  const getStatusLabel = (status?: Report["last_status"]) => {
    switch (status) {
      case "SUCCESS":
        return "Success";

      case "FAILED":
        return "Failed";

      case "IN_PROGRESS":
        return "In Progress";

      default:
        return "Not Sent";
    }
  };

  const getStatusColor = (status?: Report["last_status"]) => {
    switch (status) {
      case "SUCCESS":
        return "success";

      case "FAILED":
        return "error";

      case "IN_PROGRESS":
        return "warning";

      default:
        return "default";
    }
  };

  const formatSchedule = (schedule?: string | null) => {
    if (!schedule) {
      return "—";
    }

    const parts = schedule.trim().split(/\s+/);

    if (parts.length !== 5) {
      return schedule;
    }

    const minute = Number(parts[0]);
    const hour = Number(parts[1]);

    if (
      Number.isNaN(minute) ||
      Number.isNaN(hour) ||
      minute < 0 ||
      minute > 59 ||
      hour < 0 ||
      hour > 23
    ) {
      return schedule;
    }

    const date = new Date();
    date.setHours(hour, minute, 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateTime = (date?: string | null) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleModeClick = (event: React.MouseEvent<HTMLElement>, report: Report) => {
    setSentReportsData([]);
    console.log("repot", report);
    setApiCallReportId(report?.id);
    setModeAnchorEl(event.currentTarget);
    setSelectedReport(report);
    setmodeMenuOpen(true);
  };

  const handleSendReportClick = (report: Report, channel: ChannelType) => {
    setSentReportsData([]);
    setChannelType(channel);
    setSelectedReport(report);
    console.log("reportId", report.id);
    setApiCallReportId(report?.id);
    setHeaderText(`Send ${channel} on ${report?.report_name}`);
    setDescriptionText(`Are you sure to send ${channel} report now ?`);
    setHandleOKFunction("SendReport");
    setOpenModal(true);
  };

  const handleViewHistory = async (report: Report) => {
    setHandleOKFunction("GetLog");
    console.log("history clicked------------", report);
    setSelectedReport(report);
    setHeaderText(`History: Report Sent - ${report?.report_name}`);
    setDescriptionText(``);

    try {
      const responseCall = await getSentReportLog({
        reportId: report.id,
      });

      console.log("responseCall --", responseCall);

      if (responseCall?.success) {
        setSentReportsData(responseCall.data);
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Failed to get report history:", error);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          overflow: "auto",
        }}
      >
        <Table sx={{ minWidth: 1250, tableLayout: "fixed" }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "action.hover",
              }}
            >
              <TableCell sx={{ width: "20%", fontWeight: 700 }}>Report</TableCell>

              <TableCell sx={{ width: "9%", fontWeight: 700 }}>Project</TableCell>

              <TableCell sx={{ width: "10%", fontWeight: 700 }}>Mode</TableCell>

              <TableCell sx={{ width: "9%", fontWeight: 700 }}>Schedule</TableCell>

              <TableCell sx={{ width: "15%", fontWeight: 700 }}>Channels</TableCell>

              <TableCell sx={{ width: "9%", fontWeight: 700 }}>Status</TableCell>

              <TableCell sx={{ width: "9%", fontWeight: 700 }}>Last Sent</TableCell>

              <TableCell sx={{ width: "9%", fontWeight: 700 }}>Triggered By</TableCell>

              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  width: "10%",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No reports found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => {
                const channels = getEnabledChannels(report.channels);

                // const loading = sendingReportId === report.id;

                return (
                  <TableRow
                    key={report.report_code}
                    hover
                    sx={{
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell>
                      <Tooltip title={report.description ?? ""} placement="top-start">
                        <Box>
                          <Typography variant="body2" fontWeight={700}>
                            {report.report_name}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {report.report_code}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={report.project}
                        size="small"
                        variant="outlined"
                        sx={{
                          ...getProjectStyles(report.project),
                          fontWeight: 600,
                          width: "100%",
                          height: 30,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          report.mode === "SCHEDULED"
                            ? "Scheduled"
                            : report.mode === "MANUAL"
                              ? "Manual"
                              : "Pending"
                        }
                        size="small"
                        variant="outlined"
                        deleteIcon={<KeyboardArrowDownIcon />}
                        onClick={(event) => handleModeClick(event, report)}
                        onDelete={() => {}}
                        sx={{
                          ...getModeStyles(report.mode),
                          width: "100%",
                          height: 30,
                          fontWeight: 600,
                          cursor: "pointer",
                          "& .MuiChip-deleteIcon": {
                            color: "inherit",
                            marginLeft: "2px",
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {formatSchedule(report.schedule)}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ minWidth: 120 }}>
                      {channels.length > 0 ? (
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 50px)",
                            columnGap: 1, // horizontal gap
                            rowGap: 1, // vertical gap
                            justifyContent: "center",
                          }}
                        >
                          {channels.map((channel) => {
                            const channelType = channel as ChannelType;

                            return (
                              <Tooltip
                                key={channel}
                                title={getChannelActionText(channelType)}
                                arrow
                              >
                                <Avatar
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    cursor: "pointer",
                                    border: "1px solid",
                                    ...getChannelStyles(channelType),
                                  }}
                                  onClick={() => handleSendReportClick(report, channelType)}
                                >
                                  {getChannelIcon(channelType)}
                                </Avatar>
                              </Tooltip>
                            );
                          })}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          width: "100%",
                          height: 30,
                          justifyContent: "center",
                        }}
                        label={getStatusLabel(report.last_status)}
                        color={getStatusColor(report.last_status)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{formatDateTime(report.last_sent_at)}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {report.last_triggered_by
                          ? report.last_triggered_by === "SCHEDULED"
                            ? "Scheduled"
                            : "Manual"
                          : "—"}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        {/* <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            handleSendReportClick(report);
                          }}
                          sx={{
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {"Send"}
                        </Button> */}

                        {/* <Button
                          variant="text"
                          size="small"
                          // onClick={() => onHistory?.(report)}
                          onClick={() => {
                            setApiCallReportId(report?.id);
                            handleViewHistory(report);
                          }}
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          History
                        </Button> */}
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            bgcolor: "primary.main",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setApiCallReportId(report?.id);
                            handleViewHistory(report);
                          }}
                        >
                          <HistoryIcon sx={{ fontSize: 38 }} />
                        </Avatar>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={modeAnchorEl}
        open={modeMenuOpen}
        onClose={() => {
          setmodeMenuOpen(false);
          setModeAnchorEl(null);
          setSelectedReport(null);
        }}
      >
        {["SCHEDULED", "MANUAL", "PENDING"].map((mode) => (
          <MenuItem
            key={mode}
            selected={selectedReport?.mode === mode}
            onClick={() => {
              console.log("mode", mode);
              setUpdatingMode(mode as UpdatingMode);
              setmodeMenuOpen(false);
              setHeaderText(`Report - ${selectedReport?.report_name} - Mode Change`);
              setDescriptionText(`Are you sure to change report sending mode to '${mode}'?`);
              setHandleOKFunction("UpdateMode");
              setOpenModal(true);
            }}
          >
            <Box
              sx={{
                width: 24,
                display: "flex",
                alignItems: "center",
              }}
            >
              {selectedReport?.mode === mode && <CheckIcon fontSize="small" />}
            </Box>
            {mode === "SCHEDULED" ? "Scheduled" : mode === "MANUAL" ? "Manual" : "Pending"}
          </MenuItem>
        ))}
      </Menu>
      <SlideDialog
        openModal={openModal}
        handleOKButton={handleActionFunction}
        setOpenModal={setOpenModal}
        headerText={headerText}
        descriptionText={descriptionText}
        tableData={sentReportsData}
      />
    </>
  );
};

export default ReportsTable;
