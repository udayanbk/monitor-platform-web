import { Alert, AlertColor, Snackbar } from "@mui/material";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

const AppSnackbar = ({ open, message, severity, onClose }: AppSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{
          minWidth: "350px",
          fontWeight: 600,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
