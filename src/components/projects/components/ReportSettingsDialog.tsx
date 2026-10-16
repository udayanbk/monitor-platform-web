import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Paper,
  Box,
  Alert,
  Chip,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Report, SettingPayload } from "../../common/Interfaces";
import { saveReportSetting } from "../../../services/nivaran.service";

type ReportMode = "SCHEDULED" | "MANUAL" | "PENDING";
type RecipientType = "TO" | "CC";

interface Props {
  open: boolean;
  handleClose: () => void;
  report: Report;
  onSaved: () => void | Promise<void>;
}

const getTimeFromCron = (cron: string | null | undefined): string => {
  const parts = cron?.trim().split(/\s+/) ?? [];

  if (parts.length < 5) return "09:00";

  const minute = Number(parts[0]);
  const hour = Number(parts[1]);

  if (
    !Number.isInteger(minute) ||
    !Number.isInteger(hour) ||
    minute < 0 ||
    minute > 59 ||
    hour < 0 ||
    hour > 23
  ) {
    return "09:00";
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

// const parseEmails = (value: string): string[] =>
//   value
//     .split(/[;,]/)
//     .map((email) => email.trim())
//     .filter(Boolean);

const isValidEmail = (email: string): boolean => /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(email);

export default function ReportSettingsDialog({ open, handleClose, report, onSaved }: Props) {
  console.log("report", report);
  const [mode, setMode] = useState<ReportMode>(report.mode);
  const [subject, setSubject] = useState(report.report_name ?? "");
  const [receiverTo, setReceiverTo] = useState<string[]>([]);
  const [receiverCc, setReceiverCc] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<Dayjs | null>(null);

  const [subjectError, setSubjectError] = useState("");
  const [toError, setToError] = useState("");
  const [ccError, setCcError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const [recipientDialogOpen, setRecipientDialogOpen] = useState(false);
  const [recipientType, setRecipientType] = useState<RecipientType>("TO");
  const [newEmail, setNewEmail] = useState("");
  const [recipientError, setRecipientError] = useState("");

  useEffect(() => {
    if (!open) return;

    setMode(report.mode);
    setSubject(report.report_name ?? "");
    setReceiverTo(report.receiver_to ?? []);
    setReceiverCc(report.receiver_cc ?? []);
    setSchedule(dayjs(`2026-01-01T${getTimeFromCron(report.schedule)}`));

    setSubjectError("");
    setToError("");
    setCcError("");
    setSaveError("");
    setRecipientDialogOpen(false);
    setNewEmail("");
    setRecipientError("");
  }, [open, report]);

  const handleModeChange = (value: string) => {
    setMode(value as ReportMode);
    setSaveError("");
  };

  const openAddRecipient = (type: RecipientType) => {
    setRecipientType(type);
    setNewEmail("");
    setRecipientError("");
    setRecipientDialogOpen(true);
  };

  const handleAddRecipient = () => {
    const email = newEmail.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      setRecipientError("Please enter a valid email address.");
      return;
    }

    const existingRecipients = recipientType === "TO" ? receiverTo : receiverCc;

    if (existingRecipients.some((existingEmail) => existingEmail.toLowerCase() === email)) {
      setRecipientError("This recipient already exists in this list.");
      return;
    }

    if (
      (recipientType === "TO" ? receiverCc : receiverTo).some(
        (existingEmail) => existingEmail.toLowerCase() === email,
      )
    ) {
      setRecipientError("This email already exists in the other recipient list.");
      return;
    }

    if (recipientType === "TO") {
      setReceiverTo((previous) => [...previous, email]);
      setToError("");
    } else {
      setReceiverCc((previous) => [...previous, email]);
      setCcError("");
    }

    setRecipientDialogOpen(false);
    setNewEmail("");
    setRecipientError("");
  };

  const handleRemoveRecipient = (type: RecipientType, emailToRemove: string) => {
    if (type === "TO") {
      setReceiverTo((previous) => previous.filter((email) => email !== emailToRemove));
    } else {
      setReceiverCc((previous) => previous.filter((email) => email !== emailToRemove));
    }

    setSaveError("");
  };

  const renderRecipients = (type: RecipientType, recipients: string[]) => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <FormLabel
          sx={{
            color: "text.primary",
            fontWeight: 600,
            "&.Mui-focused": { color: "text.primary" },
          }}
        >
          {type === "TO" ? "Receiver To" : "Receiver CC"}
          {type === "TO" && (
            <Box component="span" sx={{ color: "error.main", ml: 0.5 }}>
              *
            </Box>
          )}
        </FormLabel>

        {report.update_setting === 1 ? (
          <Button size="small" startIcon={<AddIcon />} onClick={() => openAddRecipient(type)}>
            Add recipient
          </Button>
        ) : null}
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          minHeight: 58,
          borderRadius: 2,
          backgroundColor: "background.default",
        }}
      >
        {recipients.length > 0 ? (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {recipients.map((email) => (
              <Chip
                key={email}
                label={email}
                {...(report.update_setting === 1 && {
                  onDelete: () => handleRemoveRecipient(type, email),
                })}
                variant="outlined"
                color={type === "TO" ? "primary" : "default"}
                sx={{ maxWidth: "100%" }}
              />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            {type === "TO"
              ? "No recipients added. At least one is required."
              : "No CC recipients added (optional)."}
          </Typography>
        )}
      </Paper>

      {type === "TO" && toError && (
        <Typography variant="body2" color="error">
          {toError}
        </Typography>
      )}

      {type === "CC" && ccError && (
        <Typography variant="body2" color="error">
          {ccError}
        </Typography>
      )}
    </Box>
  );

  const handleSave = async () => {
    const trimmedSubject = subject.trim();

    setSubjectError(trimmedSubject ? "" : "Email subject is required.");
    setToError(receiverTo.length > 0 ? "" : "Please add at least one To recipient.");
    setCcError("");
    setSaveError("");

    if (!trimmedSubject || receiverTo.length === 0) return;

    if (mode === "SCHEDULED" && (!schedule || !schedule.isValid())) {
      setSaveError("Please select a valid report time.");
      return;
    }

    const time = schedule?.format("HH:mm");

    const payload = {
      id: report.id,
      report_code: report.report_code,
      mode,
      schedule: mode === "SCHEDULED" ? time : undefined,
      subject: trimmedSubject,
      receiverTo,
      receiverCc,
    };

    setSaving(true);

    try {
      const saveResponse = await saveReportSetting(payload as SettingPayload);

      if (saveResponse?.success) {
        await onSaved();
        handleClose();
      }
    } catch (error) {
      console.error("Report settings save error:", error);
      setSaveError("Unable to save report settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={saving ? undefined : handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3, boxShadow: 8 },
        }}
      >
        <Paper elevation={0}>
          <DialogTitle
            sx={{
              px: 3,
              py: 1,
              fontSize: 22,
              fontWeight: 600,
              textAlign: "center",
              paddingTop: "15px",
            }}
          >
            {`Report - ${report.report_name}`}
          </DialogTitle>
          <DialogTitle
            sx={{
              py: 0,
              fontSize: 22,
              fontWeight: 600,
              textAlign: "center",
              color: "orange",
            }}
          >
            {`${report.update_setting === 0 ? "-- Update not allowed --" : ""}`}
          </DialogTitle>

          <DialogContent dividers sx={{ px: 3, py: 2.5 }}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel sx={{ mb: 0.5 }}>Report Mode</FormLabel>
                <RadioGroup
                  row
                  value={mode}
                  onChange={(event) => handleModeChange(event.target.value)}
                  sx={{
                    gap: 1,
                    flexWrap: "wrap",
                    "& .MuiFormControlLabel-root.Mui-disabled": {
                      opacity: 1,
                    },
                    "& .MuiFormControlLabel-label.Mui-disabled": {
                      color: "#222 !important",
                      opacity: 1,
                    },
                    "& .MuiRadio-root.Mui-disabled": {
                      color: "#666 !important",
                      opacity: 1,
                    },
                    "& .MuiRadio-root.Mui-disabled.Mui-checked": {
                      color: "#1976d2 !important",
                    },
                  }}
                >
                  <FormControlLabel
                    disabled={report.update_setting !== 1}
                    value="SCHEDULED"
                    control={<Radio />}
                    label="Scheduled"
                  />
                  <FormControlLabel
                    disabled={report.update_setting !== 1}
                    value="MANUAL"
                    control={<Radio />}
                    label="Manual"
                  />
                  <FormControlLabel
                    disabled={report.update_setting !== 1}
                    value="PENDING"
                    control={<Radio />}
                    label="Pending"
                  />
                </RadioGroup>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Report Time"
                  value={schedule}
                  onChange={(value) => setSchedule(value)}
                  readOnly={mode !== "SCHEDULED" || report.update_setting !== 1}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: mode === "SCHEDULED" && (!schedule || !schedule.isValid()),
                      sx: {
                        "& .MuiInputBase-input": {
                          color: "text.primary",
                          WebkitTextFillColor: "currentColor",
                          opacity: 1,
                          fontWeight: 500,
                        },
                        "& .MuiInputLabel-root": {
                          color: "text.secondary",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "divider",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>

              <TextField
                label="Email Subject"
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value);
                  setSubjectError("");
                }}
                placeholder="e.g. Daily Renewal Report"
                required
                fullWidth
                error={Boolean(subjectError)}
                helperText={subjectError}
                slotProps={{
                  htmlInput: {
                    readOnly: report.update_setting !== 1,
                  },
                }}
              />

              <Divider />

              {renderRecipients("TO", receiverTo)}

              {renderRecipients("CC", receiverCc)}

              {saveError && <Alert severity="error">{saveError}</Alert>}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            {report.update_setting === 1 ? (
              <>
                <Button onClick={handleClose} disabled={saving}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={handleClose} disabled={saving} variant="contained">
                Okay
              </Button>
            )}
          </DialogActions>
        </Paper>
      </Dialog>

      <Dialog
        open={recipientDialogOpen}
        onClose={() => setRecipientDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Add {recipientType === "TO" ? "To" : "CC"} Recipient
          <IconButton
            aria-label="Close"
            onClick={() => setRecipientDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            value={newEmail}
            onChange={(event) => {
              setNewEmail(event.target.value);
              setRecipientError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddRecipient();
              }
            }}
            placeholder="name@company.com"
            fullWidth
            sx={{ mt: 1 }}
            error={Boolean(recipientError)}
            helperText={recipientError || "Enter one email address."}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setRecipientDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddRecipient}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
