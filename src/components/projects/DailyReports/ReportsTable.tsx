import {
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
import { getChannelStyles, getModeStyles, getProjectStyles } from "./styles";

interface ReportChannel {
  enabled: boolean;
}

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
  mode: "SCHEDULED" | "MANUAL";
  schedule?: string | null;
  channels: ReportChannels;
  enabled: number;
  last_sent_at?: string | null;
  last_triggered_by?: "SCHEDULED" | "MANUAL" | null;
  last_channel?: string | null;
  last_status?: "SUCCESS" | "FAILED" | "IN_PROGRESS" | null;
}

interface ReportsTableProps {
  reports: Report[];
  sendingReportId: number | null;
  onSend: (reportId: number) => void;
  onHistory?: (report: Report) => void;
}

const ReportsTable = ({ reports, sendingReportId, onSend, onHistory }: ReportsTableProps) => {
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

  return (
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
      <Table sx={{ minWidth: 1250 }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "action.hover",
            }}
          >
            <TableCell sx={{ fontWeight: 700 }}>Report</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Project</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Mode</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Schedule</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Channels</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Last Sent</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Triggered By</TableCell>

            <TableCell
              align="center"
              sx={{
                fontWeight: 700,
                minWidth: 190,
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

              const loading = sendingReportId === report.id;

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
                  <TableCell sx={{ minWidth: 240 }}>
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
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={report.mode === "SCHEDULED" ? "Scheduled" : "Manual"}
                      size="small"
                      variant="outlined"
                      sx={{
                        ...getModeStyles(report.mode),
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {formatSchedule(report.schedule)}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ minWidth: 160 }}>
                    <Stack
                      direction="column"
                      spacing={0.5}
                      useFlexGap
                      flexWrap="wrap"
                      alignItems="flex-start"
                    >
                      {channels.length > 0 ? (
                        channels.map((channel) => (
                          <Chip
                            key={channel}
                            label={channel}
                            size="small"
                            variant="outlined"
                            sx={{
                              ...getChannelStyles(channel),
                              fontWeight: 600,
                            }}
                          />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={getStatusLabel(report.last_status)}
                      color={getStatusColor(report.last_status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell sx={{ minWidth: 165 }}>
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
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={loading || report.enabled !== 1}
                        onClick={() => onSend(report.id)}
                        sx={{
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {loading ? "Sending..." : "Send"}
                      </Button>

                      <Button
                        variant="text"
                        size="small"
                        onClick={() => onHistory?.(report)}
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        History
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportsTable;
