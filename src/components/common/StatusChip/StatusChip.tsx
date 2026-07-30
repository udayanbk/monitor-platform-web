import Chip from "@mui/material/Chip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export type Status = "UP" | "DOWN" | "WARNING" | "UNKNOWN";

interface StatusChipProps {
  status: Status;
}

const statusConfig = {
  UP: {
    label: "UP",
    color: "success" as const,
    icon: <CheckCircleOutlineIcon fontSize="small" />,
  },
  DOWN: {
    label: "DOWN",
    color: "error" as const,
    icon: <ErrorOutlineIcon fontSize="small" />,
  },
  WARNING: {
    label: "WARNING",
    color: "warning" as const,
    icon: <WarningAmberIcon fontSize="small" />,
  },
  UNKNOWN: {
    label: "UNKNOWN",
    color: "default" as const,
    icon: <HelpOutlineIcon fontSize="small" />,
  },
};

const StatusChip = ({ status }: StatusChipProps) => {
  const config = statusConfig[status];

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      color={config.color}
      size="small"
      variant="filled"
    />
  );
};

export default StatusChip;
