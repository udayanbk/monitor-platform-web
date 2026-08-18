import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";

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

interface ReportCardProps {
  report: Report;
  loading: boolean;
  onSend: (reportId: number) => void;
}

const ReportCard = ({ report, loading, onSend }: ReportCardProps) => {
  const enabledChannels = Object.entries(report.channels ?? {})
    .filter(([, config]) => {
      return typeof config === "boolean" ? config : config?.enabled === true;
    })
    .map(([channel]) => channel);

  const getStatusLabel = () => {
    switch (report.last_status) {
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

  const getStatusColor = () => {
    switch (report.last_status) {
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

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        border: 2,
        borderColor: "warning.main",
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              {report.report_name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {report.project}
            </Typography>
          </Box>

          <Divider />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Mode
            </Typography>

            <Chip
              size="small"
              label={report.mode === "SCHEDULED" ? "Scheduled" : "Manual"}
              variant="outlined"
            />
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Schedule
            </Typography>

            <Typography variant="body2">{report.schedule ?? "—"}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Channels
            </Typography>

            <Typography variant="body2">
              {enabledChannels.length > 0 ? enabledChannels.join(" + ") : "—"}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Status
            </Typography>

            <Chip size="small" label={getStatusLabel()} color={getStatusColor()} />
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Last Sent
            </Typography>

            <Typography variant="body2">{report.last_sent_at ?? "—"}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" fontWeight={600}>
              Triggered By
            </Typography>

            <Typography variant="body2">
              {report.last_triggered_by
                ? report.last_triggered_by === "SCHEDULED"
                  ? "Scheduled"
                  : "Manual"
                : "—"}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                fontWeight: "bold",
                borderWidth: 2,
              }}
              disabled={loading || report.enabled !== 1}
              onClick={() => onSend(report.id)}
            >
              {loading ? "Sending..." : "Send Report"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                fontWeight: "bold",
                borderWidth: 2,
              }}
            >
              History
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
